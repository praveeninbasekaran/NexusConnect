'use server';

import { getProfileImprovementRecommendation } from '@/ai/flows/profile-improvement-recommendation';

export async function generateProfileRecommendation(
  userProfile: string,
  networkData: string
) {
  try {
    const result = await getProfileImprovementRecommendation({
      userProfile,
      networkData,
    });
    return { success: true, recommendation: result.recommendation };
  } catch (error) {
    console.error('AI recommendation error:', error);
    return { success: false, error: 'Failed to generate recommendation.' };
  }
}
