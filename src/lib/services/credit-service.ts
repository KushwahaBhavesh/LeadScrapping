import { SupabaseClient } from '@supabase/supabase-js';

export interface CreditCheckResult {
  hasEnough: boolean;
  currentBalance: number;
  required: number;
}

export class CreditService {
  /**
   * Check if user has sufficient credits
   */
  static async checkCredits(
    supabase: SupabaseClient,
    userId: string,
    required: number
  ): Promise<CreditCheckResult> {
    const { data: credits } = await supabase
      .from('credits')
      .select('balance')
      .eq('user_id', userId)
      .single();

    const currentBalance = credits?.balance || 0;

    return {
      hasEnough: currentBalance >= required,
      currentBalance,
      required,
    };
  }

  /**
   * Deduct credits in a transaction-safe manner
   */
  static async deductCredits(
    supabase: SupabaseClient,
    userId: string,
    amount: number,
    description: string,
    jobId?: string
  ): Promise<void> {
    // Get current balance
    const { data: credits } = await supabase
      .from('credits')
      .select('balance, total_used')
      .eq('user_id', userId)
      .single();

    if (!credits) {
      throw new Error('Credits record not found');
    }

    // Update balance
    const { error: updateError } = await supabase
      .from('credits')
      .update({
        balance: credits.balance - amount,
        total_used: (credits.total_used || 0) + amount,
      })
      .eq('user_id', userId);

    if (updateError) throw updateError;

    // Record transaction
    const { error: txError } = await supabase.from('credit_transactions').insert({
      user_id: userId,
      amount: -amount,
      type: 'usage',
      description,
      job_id: jobId,
    });

    if (txError) throw txError;
  }

  /**
   * Refund credits (e.g., if job fails)
   */
  static async refundCredits(
    supabase: SupabaseClient,
    userId: string,
    amount: number,
    description: string,
    jobId?: string
  ): Promise<void> {
    // Get current balance
    const { data: credits } = await supabase
      .from('credits')
      .select('balance')
      .eq('user_id', userId)
      .single();

    if (!credits) {
      throw new Error('Credits record not found');
    }

    const { error: updateError } = await supabase
      .from('credits')
      .update({ balance: credits.balance + amount })
      .eq('user_id', userId);

    if (updateError) throw updateError;

    const { error: txError } = await supabase.from('credit_transactions').insert({
      user_id: userId,
      amount,
      type: 'refund',
      description,
      job_id: jobId,
    });

    if (txError) throw txError;
  }
}
