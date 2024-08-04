'use server';

import { streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';
import { z } from 'zod';

export async function streamNote(input: string) {
  'use server';

  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: openai('gpt-4-turbo'),
      system: 'As a personal trainer. You create a comprehensize profile and plan for this person.',
      prompt: input,
      schema: z.object({
        clientProfile: z.object({
          Name: z.string().describe('Client Name.'),
          Age: z.string().describe('Age.'),
          Gender: z.string().describe('Gender.'),
          Height: z.string().describe('Height.'),
          Weight: z.string().describe('Weight.'),
          Experience: z.string().describe('Experience Level.'),
          Sessions: z.string().describe('Number of sessions per week.'),
          Exercises: z.string().describe('Number of exercises per session.'),
        }),
        trainingGoals: z.array(z.string().describe('Client\'s goals. (1 - 3 points)')),
        keyConsiderations: z.array(z.string().describe('Key considerations.  (1 - 3 points)')),
        recommendedApproaches: z.array(z.string().describe('Recommended training approach. (1 - 3 points)')),
        additionalNotes: z.array(z.string().describe('Additional notes or recommendations. (1 - 3 points)')),
      }),
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { object: stream.value };
}

