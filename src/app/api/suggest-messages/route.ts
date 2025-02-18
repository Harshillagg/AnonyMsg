import { ApiRes } from '@/utils/ApiRes';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const runtime = "edge";
export const maxDuration = 30;

export async function POST() {
  try {
    const promptVariations = [
      "Create a list of three friendly, casual questions about daily life and experiences",
      "Generate three thought-provoking questions about hobbies, dreams, or aspirations",
      "Provide three engaging questions about favorite memories, places, or activities",
      "Create three fun questions about preferences, choices, or hypothetical scenarios",
      "Generate three creative questions about future goals, experiences, or interests"
    ];
    
    // Randomly select a prompt variation
    const basePrompt = promptVariations[Math.floor(Math.random() * promptVariations.length)];
    
    const prompt = `${basePrompt}. Format the response as a single string with questions separated by '||'. 
      Make questions suitable for an anonymous social platform.
      Avoid personal or sensitive topics.
      Keep responses friendly and engaging.
      Example format: 'What's your favorite way to spend a rainy day? ||What's a small goal you're working towards right now? ||What's the most interesting documentary you've watched lately?'
      Dont show Timestamp: ${Date.now()}`;
  
    const result = streamText({
      model: google('gemini-2.0-flash-001'),
      prompt,
      temperature: 0.8,
    });
  
    return result.toDataStreamResponse();
  }
  catch (error) {
    console.error("An error occurred:", error);
    return ApiRes(false, "Failed to generate message suggestions", 500);
  }
}