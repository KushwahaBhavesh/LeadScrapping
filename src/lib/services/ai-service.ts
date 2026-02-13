
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

interface AIAnalysisResult {
    score: number;
    signals: string[];
    notes: string;
    industry?: string;
    summary?: string;
}

export class AIService {
    private static anthropic = process.env.ANTHROPIC_API_KEY
        ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
        : null;

    private static openai = process.env.OPENAI_API_KEY
        ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
        : null;

    static async analyzeContent(
        content: string,
        url: string
    ): Promise<AIAnalysisResult | null> {
        if (!this.anthropic && !this.openai) {
            console.warn('No AI API keys configured for qualification');
            return null;
        }

        try {
            const prompt = `
        Analyze the following scraped website content from ${url} to qualify it as a sales lead.
        
        Content:
        ${content.slice(0, 10000)} // Limit content length
        
        Return a JSON object with the following fields:
        - score: A number between 0-100 indicating lead quality (high intent/fit = high score).
        - signals: Array of strings indicating buying signals (e.g., "hiring", "funding", "pricing_page", "contact_info").
        - notes: A brief specific explanation of why this score was given.
        - industry: The likely industry of the company.
        - summary: A 1-sentence summary of what the company does.
      `;

            let responseText: string | null = null;

            if (this.anthropic) {
                const msg = await this.anthropic.messages.create({
                    model: 'claude-3-haiku-20240307',
                    max_tokens: 1000,
                    temperature: 0,
                    system: "You are a lead qualification expert. concise JSON response only.",
                    messages: [{ role: 'user', content: prompt }],
                });

                if (msg.content[0].type === 'text') {
                    responseText = msg.content[0].text;
                }
            } else if (this.openai) {
                const completion = await this.openai.chat.completions.create({
                    model: 'gpt-4o-mini',
                    messages: [
                        { role: 'system', content: "You are a lead qualification expert. Return valid JSON only." },
                        { role: 'user', content: prompt }
                    ],
                    response_format: { type: "json_object" },
                });
                responseText = completion.choices[0].message.content;
            }

            if (!responseText) {
                throw new Error('Empty response from AI');
            }

            // Parse JSON from response
            const jsonStart = responseText.indexOf('{');
            const jsonEnd = responseText.lastIndexOf('}');
            if (jsonStart === -1 || jsonEnd === -1) {
                throw new Error('Invalid JSON response');
            }

            const jsonStr = responseText.substring(jsonStart, jsonEnd + 1);
            const result = JSON.parse(jsonStr);

            return {
                score: result.score || 50,
                signals: result.signals || [],
                notes: result.notes || 'No notes provided',
                industry: result.industry,
                summary: result.summary,
            };

        } catch (error) {
            console.error('AI Analysis failed:', error);
            return null;
        }
    }
}
