"use client"

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { streamNote } from '@/lib/streamNote';
import { streamProgram } from '@/lib/streamProgram';
import { readStreamableValue } from 'ai/rsc';
import { ProfileFormFields } from '@/components/ProfileFormFields';
import { GeneratedProfile } from '@/components/GeneratedProfile';
import { TrainingProgram } from '@/components/TrainingProgram';

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
  activityLevel: z.string(),
  notes: z.string().optional(),
  instructions: z.string().optional(),
})

export const ProfileForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [profileData, setProfileData] = useState<null | any>(null);
    const [programData, setProgramData] = useState<null | any>(null);
    const [currentStep, setCurrentStep] = useState<'form' | 'profile' | 'program'>('form');
    const [error, setError] = useState<string | null>(null);
    
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
            activityLevel: "",
            notes: "",
            instructions: "",
        },
    })
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
      setIsLoading(true);
      setProfileData(null);
      setProgramData(null);
      setError(null);
      setCurrentStep('profile');
      
      try {

        // Generate profile
        const { object: profileObject } = await streamNote(JSON.stringify(values));
        let accumulatedProfileData = {};
        for await (const partialObject of readStreamableValue(profileObject)) {
          if (partialObject) {
            accumulatedProfileData = { ...accumulatedProfileData, ...partialObject };
            setProfileData(accumulatedProfileData);
          }
        }

        if (Object.keys(accumulatedProfileData).length === 0) {
          throw new Error("No profile data generated");
        }

        setCurrentStep('program');

        // Generate program
        const { object: programObject } = await streamProgram(JSON.stringify(accumulatedProfileData));
        let accumulatedProgramData = {};
        for await (const partialObject of readStreamableValue(programObject)) {
          if (partialObject) {
            accumulatedProgramData = { ...accumulatedProgramData, ...partialObject };
            setProgramData(accumulatedProgramData);
          }
        }

        if (Object.keys(accumulatedProgramData).length === 0) {
          throw new Error("No program data generated");
        }

      } catch (error: any) {
        console.error("Error generating profile or program:", error);
        setError(error.message || "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    const resetForm = () => {
      setProfileData(null);
      setProgramData(null);
      setCurrentStep('form');
      setError(null);
      form.reset();
    };

  return (
    <div className="space-y-8">
      {currentStep === 'form' && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ProfileFormFields form={form} />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Create Program'}
            </Button>
          </form>
        </Form>
      )}
      
      {isLoading && (
        <div className="flex justify-center animate-pulse">
          <p className="text-xl">
            Generating {currentStep === 'profile' ? 'profile' : 'program'}...
            <span className="inline-block w-2 h-2 ml-2 animate-spin rounded-full bg-black"></span>
          </p>
        </div>
      )}

      {error && (
        <div className="text-red-500">
          <p>Error: {error}</p>
        </div>
      )}

      {profileData && <GeneratedProfile profileData={profileData} />}
      {programData && <TrainingProgram programData={programData} />}
      {(profileData || programData) && (
        <Button onClick={resetForm} className="mt-4">Create New Profile</Button>
      )}
    </div>
  )
}