'use server';

import { streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';
import { z } from 'zod';

const exerciseSchema = z.object({
    Exercise: z.string(),
    Sets: z.number(),
    Reps: z.number(),
    Weight: z.string().describe("please make this descriptive"),
    Completed: z.boolean()
  });
  
const sessionSchema = z.object({
    name: z.string().describe('Session Number (ex. Session #1)'),
    exercises: z.array(exerciseSchema).min(3).max(5)
});

const weekSchema = z.object({
    number: z.number().min(1).max(4),
    sessions: z.array(sessionSchema).min(3).max(5)
});

const trainingProgramSchema = z.object({
    clientName: z.string(),
    weeks: z.array(weekSchema).length(4)
});
  

export async function streamProgram(input: string) {  
    const stream = createStreamableValue();
    console.log(input);
  
    (async () => {
      const { partialObjectStream } = await streamObject({
        model: openai('gpt-4-turbo'),
        system: 'As a professional personal trainer. Create a complete training program based on these notes. This program needs to be balanced, standarized, effective, and personalized based on the notes',
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