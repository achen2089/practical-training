'use server';

import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

const prompt_format = `
    You are a personal trainer. Create a 4-week training program in the following format:
    # [Client Name]'s Training Program
    ## Week 1
    ### Session 1
    | Exercise | Sets | Reps | Weight |
    | --- | --- | --- | --- |
    ### Session 2
    | Exercise | Sets | Reps | Weight |
    ### Session 3
    | Exercise | Sets | Reps | Weight |

    (Repeat for a total of 4 weeks (strict), with each week containing 3-5 sessions, each session with 3-4 exercises. make sure there is proper indentation)`;
const prompt_return_type = `Based on these notes, create a 4-week training program (RETURN ONLY THE PROGRAM IN THE GIVEN FORMAT):`;


export async function getProgram(question: string): Promise<{ program: string, finishReason: string, usage: any }> {
  const { text, finishReason, usage } = await generateText({
    model: openai('gpt-3.5-turbo'),
    prompt: prompt_format + '\n\n' + question + '\n\n' + prompt_return_type,
  });
  const program = text;
  return { program, finishReason, usage };
}

