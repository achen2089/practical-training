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
                content: `You are a personal trainer. Provide structured notes in the following format:
                
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
[Any other relevant information or recommendations]`
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
                content: `You are a personal trainer. Create a 4-week training program in CSV format. Use the following format:           
                    Week,Session,Exercise,Sets,Reps,Weight
                    Week 1, 1,Exercise1, Sets,Reps,Weight
                    Week 1, 2,Exercise2,Sets,Reps,Weight
                    Week 1, 3, Exercise2,Sets,Reps,Weight
                    Week 2, 1,Exercise1,Sets,Reps,Weight
                    Week 2, 2,Exercise2,Sets,Reps,Weight
                    Week 2, 3,Exercise3,Sets,Reps,Weight
                    
                    top row is the labels. repeat for 4 weeks with each week with (3 - 5) sessions depending on clients with 3 - 4 exercises each session
                    `
                
            },
            { role: "user", content: `Based on these notes, create a 4-week training program (RETURN ONLY CSV NO OTHER INFO, delimeted by ,):` },
            { role: "user", content: profileNotes },
        ],
        model: "gpt-3.5-turbo",
    });

    let trainingProgramHTML;
    try {
        trainingProgramHTML = trainingProgramCompletion.choices[0].message.content;
    } catch (error) {
        console.error("Error generating HTML:", error);
        console.log("Raw content:", trainingProgramCompletion.choices[0].message.content);

        // Fallback structure in case of error
        trainingProgramHTML = `<Table>
  <TableCaption>Error generating training program. Please try again.</TableCaption>
</Table>`;
    }

    // Combine the results
    const result = {
        clientNotes: structuredNotesCompletion.choices[0].message.content,
        trainingProgram: trainingProgramHTML,
    };

    return NextResponse.json(result);
}
