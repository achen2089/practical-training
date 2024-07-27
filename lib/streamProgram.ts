'use server';

import { streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';
import { z } from 'zod';

const exerciseSchema = z.object({
    Exercise: z.string(),
    Sets: z.number(),
    Reps: z.number(),
    Weight: z.string().describe("return a numerical value based on info only (in pounds default and kg otherwise)"),
    Completed: z.boolean()
  });
  
const sessionSchema = z.object({
    name: z.string().describe('Session Number (ex. Session #1)'),
    exercises: z.array(exerciseSchema).max(12)
});

const weekSchema = z.object({
    number: z.number().min(1).max(4),
    sessions: z.array(sessionSchema).max(7)
});

const trainingProgramSchema = z.object({
    clientName: z.string(),
    weeks: z.array(weekSchema).length(1)
});
  

export async function streamProgram(input: string) {  
    const stream = createStreamableValue();
    (async () => {
      const { partialObjectStream } = await streamObject({
        model: openai('gpt-4-turbo'),
        system: 'As a professional personal trainer. Create a complete training program based on these notes. This program needs to be balanced, standarized, effective, and personalized based on the notes. Do not add core exercises unless explicitely told to. Make sure reps and sets are numbers (not string).',
        prompt: input,
        schema: trainingProgramSchema
      });
  
      for await (const partialObject of partialObjectStream) {
        stream.update(partialObject);
      }
  
      stream.done();
    })();
  
    return { object: stream.value };
  }