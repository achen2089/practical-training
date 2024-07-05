'use server';

import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

const prompt = `
    You are a personal trainer. Provide structured notes in the following format:

    # Client Profile
    - Name: [Client Name]
    - Age: [Age]
    - Gender: [Gender]
    - Height: [Height]
    - Weight: [Weight]
    - Experience: [Experience Level]
    - Activity Level: [Activity Level]

    # Training Goals
    [List the client's goals]

    # Key Considerations
    - [Point 1]
    - [Point 2]
    - [Point 3]

    # Recommended Approach
    [Brief description of the recommended training approach]

    # Additional Notes
    [Any other relevant information or recommendations]`;

export async function getNote(question: string) {
  const { text, finishReason, usage } = await generateText({
    model: openai('gpt-3.5-turbo'),
    prompt: prompt + '\n\n' + question,
  });

  return { text, finishReason, usage };
}