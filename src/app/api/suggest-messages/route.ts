import { ApiRes } from '@/utils/ApiRes';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const runtime = "edge";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST() {
  try {
    const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started? ||If you could have dinner with any historical figure, who would it be? || What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment."
  
    const result = streamText({
      model: google('gemini-2.0-flash-001'),
      prompt,
    });
  
    return result.toDataStreamResponse();
  }
  catch (error) {
    console.error("An error occurred", error);
    return ApiRes(false, "An error occurred", 500);
  }
}