import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
    const body = await request.json();
    const profileNotes = Object.entries(body)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');

    console.log("Received body:", profileNotes);

    // First API call: Generate structured notes (unchanged)
    const structuredNotesCompletion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `
                    You are a personal trainer. Provide structured notes in the following format:

                    # Client Profile
                    -   Name: [Client Name]
                    -   Age: [Age]
                    -   Gender: [Gender]
                    -   Height: [Height]
                    -   Weight: [Weight]
                    -   Experience: [Experience Level]
                    -   Activity Level: [Activity Level]

                    # Training Goals
                    [List the client's goals]

                    # Key Considerations
                    -   [Point 1]
                    -   [Point 2]
                    -   [Point 3]

                    # Recommended Approach
                    [Brief description of the recommended training approach]

                    # Additional Notes
                    [Any other relevant information or recommendations]
                `,
            },
            { role: "user", content: "Generate structured notes based on this profile:" },
            { role: "user", content: profileNotes },
        ],
        model: "gpt-3.5-turbo",
    });

    // Second API call: Generate 4-week training program in specified HTML format
    const trainingProgramCompletion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `
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

                    (Repeat for a total of 4 weeks (strict), with each week containing 3-5 sessions, each session with 3-4 exercises. make sure there is proper indentation)
                `,
            },
            { role: "user", content: profileNotes },
            { role: "user", content: `Based on these notes, create a 4-week training program (RETURN ONLY THE PROGRAM IN THE GIVEN FORMAT):` },  
        ],
        model: "gpt-3.5-turbo",
    });

    const result = {
        clientNotes: structuredNotesCompletion.choices[0].message.content,
        trainingProgram: trainingProgramCompletion.choices[0].message.content,
    };

    return NextResponse.json(result);
}


