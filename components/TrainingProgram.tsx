import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, Edit, Save, X, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  weeks: z.array(weekSchema)
});

type TrainingProgramType = z.infer<typeof trainingProgramSchema>;

interface TrainingProgramProps {
  programData: Partial<TrainingProgramType> | null;
}

const ExerciseTable: React.FC<{ exercises: z.infer<typeof exerciseSchema>[], onAddExercise: () => void }> = ({ exercises, onAddExercise }) => {
  const [editableExercises, setEditableExercises] = useState(exercises);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    setEditableExercises(exercises);
  }, [exercises]);

  const handleInputChange = (index: number, field: keyof z.infer<typeof exerciseSchema>, value: string | number | boolean) => {
    const updatedExercises = [...editableExercises];
    updatedExercises[index] = { ...updatedExercises[index], [field]: value };
    setEditableExercises(updatedExercises);
  };

  const handleDelete = (index: number) => {
    const updatedExercises = editableExercises.filter((_, i) => i !== index);
    setEditableExercises(updatedExercises);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleSave = () => {
    setEditingIndex(null);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditableExercises(exercises);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Exercise</TableHead>
            <TableHead>Sets</TableHead>
            <TableHead>Reps</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {editableExercises.map((exercise, index) => (
            <TableRow key={index}>
              <TableCell>
                {editingIndex === index ? (
                  <Input
                    value={exercise.Exercise}
                    onChange={(e) => handleInputChange(index, 'Exercise', e.target.value)}
                    className="border"
                  />
                ) : (
                  exercise.Exercise
                )}
              </TableCell>
              <TableCell>
                {editingIndex === index ? (
                  <Input
                    type="number"
                    value={exercise.Sets}
                    onChange={(e) => handleInputChange(index, 'Sets', parseInt(e.target.value))}
                    className="border"
                  />
                ) : (
                  exercise.Sets
                )}
              </TableCell>
              <TableCell>
                {editingIndex === index ? (
                  <Input
                    type="number"
                    value={exercise.Reps}
                    onChange={(e) => handleInputChange(index, 'Reps', parseInt(e.target.value))}
                    className="border"
                  />
                ) : (
                  exercise.Reps
                )}
              </TableCell>
              <TableCell>
                {editingIndex === index ? (
                  <Input
                    value={exercise.Weight}
                    onChange={(e) => handleInputChange(index, 'Weight', e.target.value)}
                    className="border"
                  />
                ) : (
                  exercise.Weight
                )}
              </TableCell>
              <TableCell>
                <input 
                  type="checkbox" 
                  checked={exercise.Completed} 
                  onChange={(e) => handleInputChange(index, 'Completed', e.target.checked)}
                  className="accent-blue-600 hover:accent-blue-700 transition-colors duration-200"
                />
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {editingIndex === index ? (
                      <>
                        <DropdownMenuItem onClick={handleSave}>
                          <Save className="mr-2 h-4 w-4" />
                          <span>Save</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleCancel}>
                          <X className="mr-2 h-4 w-4" />
                          <span>Cancel</span>
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem onClick={() => handleEdit(index)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(index)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={onAddExercise} className="mt-4">
        <Plus className="mr-2 h-4 w-4" />
        Add Exercise
      </Button>
    </>
  );
};

export const TrainingProgram: React.FC<TrainingProgramProps> = ({ programData }) => {
  const [editableProgramData, setEditableProgramData] = useState(programData);

  useEffect(() => {
    setEditableProgramData(programData);
  }, [programData]);

  if (!editableProgramData) {
    return <div>No program data available.</div>;
  }

  const handleAddExercise = (weekIndex: number, sessionIndex: number) => {
    const updatedProgramData = { ...editableProgramData };
    const newExercise = {
      Exercise: "New Exercise",
      Sets: 3,
      Reps: 10,
      Weight: "0",
      Completed: false
    };
    updatedProgramData.weeks![weekIndex].sessions![sessionIndex].exercises.push(newExercise);
    setEditableProgramData(updatedProgramData);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{editableProgramData.clientName ?? 'Unknown Client'}&rsquo;s Program</h2>
      {editableProgramData.weeks?.map((week, weekIndex) => (
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
                    <ExerciseTable 
                      exercises={session.exercises} 
                      onAddExercise={() => handleAddExercise(weekIndex, sessionIndex)}
                    />
                  ) : (
                    <p>No exercises found for this session.</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};