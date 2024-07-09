import React from 'react';
import { z } from 'zod';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const exerciseSchema = z.object({
  Exercise: z.string(),
  Sets: z.number(),
  Reps: z.number(),
  Weight: z.string(),
  Completed: z.boolean()
});

const sessionSchema = z.object({
  name: z.string(),
  exercises: z.array(exerciseSchema).min(3).max(4)
});

const weekSchema = z.object({
  number: z.number().min(1).max(4),
  sessions: z.array(sessionSchema).min(3).max(5)
});

const trainingProgramSchema = z.object({
  clientName: z.string(),
  weeks: z.array(weekSchema).length(4)
});

type TrainingProgramType = z.infer<typeof trainingProgramSchema>;

interface TrainingProgramProps {
  programData: Partial<TrainingProgramType> | null;
}

const ExerciseTable: React.FC<{ exercises: z.infer<typeof exerciseSchema>[] }> = ({ exercises }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Exercise</TableHead>
        <TableHead>Sets</TableHead>
        <TableHead>Reps</TableHead>
        <TableHead>Weight</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {exercises.map((exercise, index) => (
        <TableRow key={index}>
          <TableCell>{exercise.Exercise}</TableCell>
          <TableCell>{exercise.Sets}</TableCell>
          <TableCell>{exercise.Reps}</TableCell>
          <TableCell>{exercise.Weight}</TableCell>
          <TableCell>
          <input 
            type="checkbox" 
            defaultChecked={exercise.Completed} 
            onChange={(e) => {
              exercise.Completed = e.target.checked;
            }}
          />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const TrainingProgram: React.FC<TrainingProgramProps> = ({ programData }) => {
  if (!programData) {
    return <div>No program data available.</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{programData.clientName ?? 'Unknown Client'}&rsquo;s Program</h2>
      {programData.weeks?.map((week, weekIndex) => (
        <Card key={weekIndex} className="mb-6">
          <CardHeader>
            <CardTitle>Week {week.number ?? weekIndex + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            {week.sessions?.map((session, sessionIndex) => (
              <Card key={sessionIndex} className="mb-4">
                <CardHeader>
                  <CardTitle className="text-lg">{session.name ?? `Session ${sessionIndex + 1}`}</CardTitle>
                </CardHeader>
                <CardContent>
                  {session.exercises && session.exercises.length > 0 ? (
                    <ExerciseTable exercises={session.exercises} />
                  ) : (
                    <p>No exercises found for this session.</p>
                  )}
                </CardContent>
              </Card>
            )) ?? <p>No sessions found for this week.</p>}
          </CardContent>
        </Card>
      )) ?? <p>No weeks found in the program.</p>}
    </div>
  );
};