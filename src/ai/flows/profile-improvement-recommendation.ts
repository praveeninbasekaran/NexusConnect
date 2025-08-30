'use server';

/**
 * @fileOverview A profile improvement recommendation AI agent.
 * 
 * - getProfileImprovementRecommendation - A function that generates profile improvement recommendations.
 * - ProfileImprovementRecommendationInput - The input type for the getProfileImprovementRecommendation function.
 * - ProfileImprovementRecommendationOutput - The return type for the getProfileImprovementRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProfileImprovementRecommendationInputSchema = z.object({
  userProfile: z.string().describe('The current user profile information.'),
  networkData: z.string().describe('Data about the user\u2019s network connections.'),
});
export type ProfileImprovementRecommendationInput = z.infer<typeof ProfileImprovementRecommendationInputSchema>;

const ProfileImprovementRecommendationOutputSchema = z.object({
  recommendation: z.string().describe('A brief recommendation for improving the user profile.'),
});
export type ProfileImprovementRecommendationOutput = z.infer<typeof ProfileImprovementRecommendationOutputSchema>;

export async function getProfileImprovementRecommendation(
  input: ProfileImprovementRecommendationInput
): Promise<ProfileImprovementRecommendationOutput> {
  return profileImprovementRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'profileImprovementRecommendationPrompt',
  input: {schema: ProfileImprovementRecommendationInputSchema},
  output: {schema: ProfileImprovementRecommendationOutputSchema},
  prompt: `You are a professional profile improvement assistant.

  Based on the following user profile and network data, provide a brief recommendation for improving the user's profile to attract more relevant connections and job opportunities.

  User Profile: {{{userProfile}}}
  Network Data: {{{networkData}}}

  Recommendation:`,
});

const profileImprovementRecommendationFlow = ai.defineFlow(
  {
    name: 'profileImprovementRecommendationFlow',
    inputSchema: ProfileImprovementRecommendationInputSchema,
    outputSchema: ProfileImprovementRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
