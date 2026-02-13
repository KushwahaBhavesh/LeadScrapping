import axios from 'axios';
import * as cheerio from 'cheerio';
import robotsParser from 'robots-parser';

export interface ScrapedData {
  emails: string[];
  phones: string[];
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  companyName?: string;
  title?: string;
  metaDescription?: string;
}

export class ScrapingService {
  private static EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  private static PHONE_REGEX =
    /(\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/g;
  private static DEFAULT_USER_AGENT = 'LeadScraperBot/1.0';

  /**
   * Checks if a URL is allowed to be scraped according to robots.txt
   */
  static async isAllowedByRobots(url: string, userAgent: string = this.DEFAULT_USER_AGENT): Promise<{ allowed: boolean; reason?: string }> {
    try {
      const parsedUrl = new URL(url);
      const robotsUrl = `${parsedUrl.origin}/robots.txt`;

      const response = await axios.get(robotsUrl, {
        headers: { 'User-Agent': userAgent },
        timeout: 5000,
      }).catch(() => null);

      if (!response || response.status !== 200) {
        // If robots.txt doesn't exist, assume allowed
        return { allowed: true };
      }

      const robots = robotsParser(robotsUrl, response.data);
      const isAllowed = robots.isAllowed(url, userAgent);

      return {
        allowed: !!isAllowed,
        reason: isAllowed ? undefined : 'Restricted by robots.txt policy',
      };
    } catch (error) {
      // In case of error (like invalid URL), fail safe or assume allowed? 
      // Usually, if we can't fetch robots.txt, we proceed, but here let's be safe.
      return { allowed: true };
    }
  }

  static async scrapeUrl(
    url: string,
    options?: {
      qualify_leads?: boolean;
      keywords?: string[];
    }
  ): Promise<(ScrapedData & { score: number; signals: string[]; notes: string; industry?: string; summary?: string }) | null> {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
        timeout: 15000,
      });

      const html = response.data;
      const $ = cheerio.load(html);

      const bodyText = $('body').text().toLowerCase();
      const cleanBodyText = $('body').text().replace(/\s+/g, ' ').trim();

      // Keyword filtering logic
      if (options?.keywords && options.keywords.length > 0) {
        const matchesKeyword = options.keywords.some(keyword =>
          bodyText.includes(keyword.toLowerCase())
        );

        if (!matchesKeyword) {
          console.log(`URL ${url} does not match any keywords: ${options.keywords.join(', ')}`);
          return null; // Skip this URL
        }
      }

      // Extract metadata
      const title = $('title').text().trim();
      const metaDescription = $('meta[name="description"]').attr('content')?.trim();
      const companyName = $('meta[property="og:site_name"]').attr('content')?.trim() || title;

      // Intent signals (Heuristic fallback)
      let signals: string[] = [];
      const intentKeywords = {
        hiring: ['hiring', 'careers', 'jobs', 'join our team', 'open positions'],
        funding: ['funding', 'series a', 'series b', 'raised', 'investors', 'capital'],
        growth: ['expanded', 'new office', 'growing', 'scaling'],
        intent: ['contact sales', 'demo', 'pricing', 'get started'],
      };

      if (intentKeywords.hiring.some((k) => bodyText.includes(k))) signals.push('hiring');
      if (intentKeywords.funding.some((k) => bodyText.includes(k))) signals.push('recent_funding');
      if (intentKeywords.growth.some((k) => bodyText.includes(k))) signals.push('growing_company');
      if (intentKeywords.intent.some((k) => bodyText.includes(k))) signals.push('high_buying_intent');

      // Scoring (Heuristic fallback)
      let score = 20; // Base score
      if (signals.includes('high_buying_intent')) score += 40;
      if (signals.includes('hiring')) score += 15;
      if (signals.includes('recent_funding')) score += 15;
      if (signals.includes('growing_company')) score += 10;
      score = Math.min(score, 100);

      // Notes (Heuristic fallback)
      let notes = `Extraction context for ${url}.`;
      if (signals.length > 0) {
        notes += ` Signals: ${signals.join(', ')}.`;
      }

      let industry: string | undefined;
      let summary: string | undefined;

      // AI Qualification
      if (options?.qualify_leads) {
        try {
          const { AIService } = await import('./ai-service');
          const aiResult = await AIService.analyzeContent(cleanBodyText, url);

          if (aiResult) {
            score = aiResult.score;
            signals = aiResult.signals;
            notes = aiResult.notes;
            industry = aiResult.industry;
            summary = aiResult.summary;
          }
        } catch (e) {
          console.error('AI Service enrichment bypassed due to error', e);
        }
      }

      // Extract emails
      const emailsSet = new Set<string>();
      const textEmails = bodyText.match(this.EMAIL_REGEX) || [];
      textEmails.forEach((email) => emailsSet.add(email.toLowerCase()));
      $('a[href^="mailto:"]').each((_, el) => {
        const email = $(el).attr('href')?.replace('mailto:', '').split('?')[0];
        if (email) emailsSet.add(email.toLowerCase());
      });

      // Extract phones
      const phonesSet = new Set<string>();
      const textPhones = bodyText.match(this.PHONE_REGEX) || [];
      textPhones.forEach((phone) => {
        const cleaned = phone.trim();
        if (cleaned.length >= 7) phonesSet.add(cleaned);
      });
      $('a[href^="tel:"]').each((_, el) => {
        const phone = $(el).attr('href')?.replace('tel:', '');
        if (phone) phonesSet.add(phone.trim());
      });

      // Extract social links
      const socialLinks: ScrapedData['socialLinks'] = {};
      $('a[href*="linkedin.com"]').each((_, el) => {
        socialLinks.linkedin = $(el).attr('href');
      });
      $('a[href*="twitter.com"], a[href*="x.com"]').each((_, el) => {
        socialLinks.twitter = $(el).attr('href');
      });
      $('a[href*="facebook.com"]').each((_, el) => {
        socialLinks.facebook = $(el).attr('href');
      });

      return {
        emails: Array.from(emailsSet),
        phones: Array.from(phonesSet),
        socialLinks,
        companyName,
        title,
        metaDescription,
        score,
        signals,
        notes,
        industry,
        summary,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Scrape failure for ${url}:`, message);
      throw new Error(`Failed to scrape URL: ${message}`);
    }
  }

  static async parseSitemap(url: string): Promise<string[]> {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': this.DEFAULT_USER_AGENT,
        },
        timeout: 10000,
      });

      const $ = cheerio.load(response.data, { xmlMode: true });
      const urls: string[] = [];

      $('loc').each((_, el) => {
        const loc = $(el).text().trim();
        if (loc) urls.push(loc);
      });

      return urls;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Sitemap parsing failed for ${url}:`, message);
      throw new Error(`Failed to parse sitemap: ${message}`);
    }
  }
}

