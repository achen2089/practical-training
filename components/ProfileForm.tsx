"use client"

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { createNote } from '@/lib/createNote';
import { createProgram } from '@/lib/createProgram';
import { createNextWeek } from '@/lib/createNextWeek';
import { ProfileFormFields } from '@/components/ProfileFormFields';
import { GeneratedProfile } from '@/components/GeneratedProfile';
import { TrainingProgram } from '@/components/TrainingProgram';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const formSchema = z.object({
  clientName: z.string().min(2, {
    message: "client's name must be at least 2 characters.",
  }),
  age: z.string(),
  gender: z.enum(["Male", "Female", "Other"]),
  height: z.string(),
  weight: z.string(),
  experience: z.string(),
  goal: z.string(),
  sessions: z.string(),
  exercises: z.string(),
  notes: z.string().optional(),
  instructions: z.string().optional(),
})

export const ProfileForm: React.FC = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [profileData, setProfileData] = useState<null | any>(null);
    const [programData, setProgramData] = useState<null | any>(null);
    const [currentStep, setCurrentStep] = useState<'form' | 'profile' | 'program'>('form');
    const [error, setError] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            clientName: "",
            age: "0",
            gender: "Male",
            height: "",
            weight: "",
            goal: "",
            experience: "",
            sessions: "",
            exercises: "",
            notes: "",
            instructions: "",
        },
    })
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
      setIsGenerating(true);
      setProfileData(null);
      setProgramData(null);
      setError(null);
      setCurrentStep('profile');
      
      try {

        // Generate profile
        const { clientProfile } = await createNote(JSON.stringify(values));
        setProfileData(clientProfile);

        if (Object.keys(clientProfile).length === 0) {
          throw new Error("No profile data generated");
        }

        setCurrentStep('program');

        // Generate program
        const { clientProgram } = await createProgram(JSON.stringify({...clientProfile, weeks: 1}));
        setProgramData( clientProgram );

        if (Object.keys(clientProgram).length === 0) {
          throw new Error("No program data generated");
        }

      } catch (error: any) {
        console.error("Error generating profile or program:", error);
        setError(error.message || "An unknown error occurred");
      } finally {
        setIsGenerating(false);
      }
    }

    const resetForm = () => {
      setProfileData(null);
      setProgramData(null);
      setCurrentStep('form');
      setError(null);
      form.reset();
    };

    const generateNextWeek = async () => {
      setIsGenerating(true);
      setError(null);
    
      try {
        if (!programData) throw new Error("No existing program data");
    
        const currentWeeks = programData.weeks || [];
        const nextWeekNumber = currentWeeks.length + 1;
    
        const { clientNextWeek } = await createNextWeek(JSON.stringify({
          clientProfile: profileData,
          previousWeeks: currentWeeks,
          feedback,
          weekNumber: nextWeekNumber
        }));
    
        if (Object.keys(clientNextWeek).length === 0) {
          throw new Error("No new week data generated");
        }
        setProgramData((prevData: { weeks: any; }) => ({
          ...prevData,
          weeks: [...(prevData.weeks || []), ...clientNextWeek.weeks]
        }));
        setFeedback('');
      } catch (error: any) {
        console.error("Error generating new week:", error);
        setError(error.message || "An unknown error occurred while generating new week");
      } finally {
        setIsGenerating(false);
      }
    };

  return (
    <div className="space-y-8">
      {currentStep === 'form' && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ProfileFormFields form={form} />
            <Button type="submit" disabled={isGenerating} className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              {isGenerating ? 'Generating...' : 'Create Program'}
            </Button>
          </form>
        </Form>
      )}
      
      {error && (
        <div className="text-red-500">
          <p>Error: {error}</p>
        </div>
      )}

      {profileData && <GeneratedProfile profileData={profileData} />}
      {programData && <TrainingProgram programData={programData} />}

      {isGenerating && (
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <span className="inline-block text-4xl animate-pulse">
              <span className="inline-block animate-bounce">✨</span>
            </span>
            <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
            </div>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Generating {currentStep === 'profile' ? 'profile' : 'program'}...
          </p>
        </div>
      )}

      {(profileData || programData) && (
        <div className='flex flex-col md:flex-row gap-4'>
          <Popover>
            <PopoverTrigger>
              <Button disabled={isGenerating} className="mt-4 bg-white border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100 transition-colors duration-200">Add New Week</Button> 
            </PopoverTrigger>
            <PopoverContent className='flex flex-col gap-4'>
              <p className="text-sm text-muted-foreground">Add any feedback or changes to program</p>
              <Textarea 
                placeholder="Type your feedback here."
                value={feedback ?? ""}
                onChange={(e) => setFeedback(e.target.value)} 
              />
              <Button className="mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200" onClick={generateNextWeek} disabled={isGenerating}>{isGenerating ? 'Generating...' : 'Generate'}</Button>
            </PopoverContent>
          </Popover>
          <Button disabled={isGenerating} onClick={resetForm} className="mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">Create New Profile</Button> 
        </div>
      )}
    </div>
  )
}