'use server';

import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const exerciseSchema = z.object({
    Exercise: z.string(),
    Sets: z.number(),
    Reps: z.number(),
    Weight: z.string().describe("return ONLY a numerical value based on info (in pounds default ex. 315 lb and kg otherwise 200 kg)"),
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
  

export async function createProgram(input: string) { 
    'use server'
    
    const { object: clientProgram } = await generateObject({
        model: openai('gpt-4-turbo'),
        system: 'As a professional personal trainer. Create a complete strength training program based on these notes. This program needs to be balanced, standarized, effective, and personalized based on the notes. Do not add core exercises unless explicitely told to. Make sure reps and sets are numbers (not string).',
        prompt: input,
        schema: trainingProgramSchema
    });
  
    return { clientProgram };
}