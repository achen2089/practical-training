'use server';

import { generateObject, streamObject } from 'ai';
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
    number: z.number().min(1).max(52),
    sessions: z.array(sessionSchema).max(7)
});

const nextWeekOutputSchema = z.object({
    weeks: z.array(weekSchema).length(1)
});

export async function createNextWeek(input: string) {
    const { object: clientNextWeek } = await generateObject({
        model: openai('gpt-4-turbo'),
        system: 'As a professional personal trainer, create the next week of a strength training program based on the client profile, previous weeks, and user feedback. Emphasize barbell training and Mark Rippetoe style training. Ensure progression and variety while addressing any concerns or requests mentioned in the feedback. Follow structure and weights of most recent week',
        prompt: input,
        schema: nextWeekOutputSchema
    });  
    return { clientNextWeek };
  }
