import axios from 'axios';
import * as cheerio from 'cheerio';

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

  static async scrapeUrl(
    url: string
  ): Promise<ScrapedData & { score: number; signals: string[]; notes: string }> {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
        timeout: 10000,
      });

      const html = response.data;
      const $ = cheerio.load(html);

      // Extract metadata
      const title = $('title').text().trim();
      const metaDescription = $('meta[name="description"]').attr('content')?.trim();
      const companyName = $('meta[property="og:site_name"]').attr('content')?.trim() || title;

      const bodyText = $('body').text().toLowerCase();

      // Intent signals
      const signals: string[] = [];
      const keywords = {
        hiring: ['hiring', 'careers', 'jobs', 'join our team', 'open positions'],
        funding: ['funding', 'series a', 'series b', 'raised', 'investors', 'capital'],
        growth: ['expanded', 'new office', 'growing', 'scaling'],
        intent: ['contact sales', 'demo', 'pricing', 'get started'],
      };

      if (keywords.hiring.some((k) => bodyText.includes(k))) signals.push('hiring');
      if (keywords.funding.some((k) => bodyText.includes(k))) signals.push('recent_funding');
      if (keywords.growth.some((k) => bodyText.includes(k))) signals.push('growing_company');
      if (keywords.intent.some((k) => bodyText.includes(k))) signals.push('high_buying_intent');

      // Scoring
      let score = 20; // Base score
      if (signals.includes('high_buying_intent')) score += 40;
      if (signals.includes('hiring')) score += 15;
      if (signals.includes('recent_funding')) score += 15;
      if (signals.includes('growing_company')) score += 10;
      score = Math.min(score, 100);

      // Notes
      let notes = `AI Analysis: This lead was found on ${url}.`;
      if (signals.length > 0) {
        notes += ` Positive signals detected: ${signals.join(', ')}.`;
      } else {
        notes += ` No specific growth signals found on the landing page.`;
      }

      // Extract emails
      const emailsSet = new Set<string>();
      // From text content
      const textEmails = bodyText.match(this.EMAIL_REGEX) || [];
      textEmails.forEach((email) => emailsSet.add(email.toLowerCase()));
      // From mailto links
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
      };
    } catch (error: any) {
      console.error(`Error scraping ${url}:`, error.message);
      throw new Error(`Failed to scrape URL: ${error.message}`);
    }
  }
}
