'use server';

import { streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';
import { z } from 'zod';

const exerciseSchema = z.object({
    Exercise: z.string(),
    Sets: z.number(),
    Reps: z.number(),
    Weight: z.string().describe("return a numerical value only in pounds based on info"),
    Completed: z.boolean()
  });
  
const sessionSchema = z.object({
    name: z.string().describe('Session Number (ex. Session #1)'),
    exercises: z.array(exerciseSchema).max(12)
});

const weekSchema = z.object({
    number: z.number().min(1).max(52),
    sessions: z.array(sessionSchema).max(7)
});

const nextWeekOutputSchema = z.object({
    weeks: z.array(weekSchema).length(1)
});

export async function streamNextWeek(input: string) {
    const stream = createStreamableValue();
    (async () => {
      const { partialObjectStream } = await streamObject({
        model: openai('gpt-4-turbo'),
        system: 'As a professional personal trainer, create the next week of a training program based on the client profile, previous weeks, and user feedback. This program needs to be balanced, standardized, effective, and personalized. Ensure progression and variety while addressing any concerns or requests mentioned in the feedback. Make sure reps and sets are numbers (not string).',
        prompt: input,
        schema: nextWeekOutputSchema
      });
  
      for await (const partialObject of partialObjectStream) {
        stream.update(partialObject);
      }
  
      stream.done();
    })();
  
    return { object: stream.value };
  }
