import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
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

const TOTAL_STEPS = 3;

const formSchema = z.object({
  clientName: z.string().min(2, { message: "Name must be at least 2 characters.", }),
  age: z.string().min(1, { message: "Age is required" }),
  gender: z.enum(["Male", "Female", "Other"]),
  height: z.string().min(1, { message: "Height is required" }),
  weight: z.string().min(1, { message: "Weight is required" }),
  experience: z.string().min(1, { message: "Experience is required" }),
  goal: z.string().min(1, { message: "Goal is required" }),
  sessions: z.string().min(1, { message: "Number of sessions is required" }),
  exercises: z.string().min(1, { message: "Number of exercises is required" }),
  notes: z.string().optional(),
  instructions: z.string().optional(),
})

export const ProfileForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [profileData, setProfileData] = useState<null | any>(null);
    const [programData, setProgramData] = useState<null | any>(null);
    const [currentView, setCurrentView] = useState<'form' | 'profile' | 'program'>('form');
    const [error, setError] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            clientName: "",
            age: "",
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
        mode: "onChange",
    })
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
      setIsGenerating(true);
      setProfileData(null);
      setProgramData(null);
      setError(null);
      setCurrentView('profile');
      
      try {
        // Generate profile
        const { clientProfile } = await createNote(JSON.stringify(values));
        setProfileData(clientProfile);

        if (Object.keys(clientProfile).length === 0) {
          throw new Error("No profile data generated");
        }

        setCurrentView('program');

        // Generate program
        const { clientProgram } = await createProgram(JSON.stringify({...clientProfile, weeks: 1}));
        setProgramData(clientProgram);

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
      setCurrentView('form');
      setCurrentStep(1);
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
    
        if (!clientNextWeek || !clientNextWeek.weeks || clientNextWeek.weeks.length === 0) {
          throw new Error("No new week data generated");
        }
        
        // Update programData with the new week
        setProgramData((prevData: any) => ({
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

    const nextStep = async () => {
      const isValid = await form.trigger(
        currentStep === 1
          ? ['clientName', 'age', 'gender']
          : currentStep === 2
          ? ['height', 'weight', 'experience']
          : ['goal', 'sessions', 'exercises']
      );

      if (isValid) {
        if (currentStep < TOTAL_STEPS) {
          setCurrentStep(prevStep => prevStep + 1);
        } else {
          await form.handleSubmit(onSubmit)();
        }
      }
    };

    const prevStep = () => {
      setCurrentStep(prevStep => Math.max(prevStep - 1, 1));
    };

  return (
    <div className="space-y-8">
      {currentView === 'form' && (
        <Form {...form}>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
            <ProfileFormFields form={form} step={currentStep} />
            <div className="flex justify-between">
              {currentStep > 1 && (
                <Button type="button" onClick={prevStep}>
                  Previous
                </Button>
              )}
              <Button type="button" onClick={nextStep}>
                {currentStep < TOTAL_STEPS ? 'Next' : 'Create Program'}
              </Button>
            </div>
          </form>
          <div >
            <Progress 
              value={((currentStep - 1) / TOTAL_STEPS) * 100} 
              className="[&>*]:bg-blue-600 w-full h-2"
            />
          </div>
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
            Generating {currentView === 'profile' ? 'profile' : 'program'}...
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