"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import React, { Dispatch, SetStateAction } from 'react';


interface ProfileFormProps {
  onCreatedNotes: Dispatch<SetStateAction<string>>;
  onCreatedProgram: Dispatch<SetStateAction<string>>;
}

const formSchema = z.object({
  clientName: z.string().min(2, {
    message: "client's name must be at least 2 characters.",
  }),
  age: z.string(),
  gender: z.enum(["male", "female", "other"]),
  height: z.string(),
  weight: z.string(),
  experience: z.string(),
  goal: z.string(),
  activityLevel: z.string(),
  notes: z.string().optional(),
  instructions: z.string().optional(),
})

export const ProfileForm: React.FC<ProfileFormProps> = ({ onCreatedNotes, onCreatedProgram, ...props }) => {
    
    const [isLoading, setIsLoading] = useState(false);
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            clientName: "",
            age: "0",
            gender: "male",
            height: "",
            weight: "",
            goal: "",
            experience: "",
            activityLevel: "",
            notes: "",
            instructions: "",
        },
    })
    
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
      setIsLoading(true);
      const body = {
        clientName: values.clientName,
        age: values.age,
        gender: values.gender,
        height: values.height,
        weight: values.weight,
        goal: values.goal,
        experience: values.experience,
        activityLevel: values.activityLevel,
        notes: values.notes,
        instructions: values.instructions,
      }
      fetch('/generateProgram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      .then(response => response.json())
      .then(data => {
        const profileNotesContent = data.clientNotes
        const trainingProgramContent = data.trainingProgram;
        onCreatedNotes(profileNotesContent);
        onCreatedProgram(trainingProgramContent);
      })
      .catch((error) => console.error('Error:', error))
      .finally(() => setIsLoading(false));
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Name</FormLabel>
                <FormControl>
                  <Input placeholder="Joe" {...field} />
                </FormControl>
                <FormDescription>
                  This is the name of the client 
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="25" {...field} />
                </FormControl>
                <FormDescription>
                  This is the age of the client 
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="180" {...field} />
                </FormControl>
                <FormDescription>
                  This is the height of the client in centimeters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="70" {...field} />
                </FormControl>
                <FormDescription>
                  This is the weight of the client in kilograms
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-6">
          <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select goal for client" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="muscle-gain">Gain Muscle</SelectItem>
                      <SelectItem value="lose-weight">Lose Weight</SelectItem>
                      <SelectItem value="improve-endurance">Endurance</SelectItem>
                      <SelectItem value="general-health">General Health</SelectItem>
                      <SelectItem value="improve-athleticism">Improve Athleticism</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an experience level for client" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    <SelectItem value="beginner">Beginner (0 - 1 years)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (1 - 3 years)</SelectItem>
                      <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="activityLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an activity level for client" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="lightly active">Lightly Active</SelectItem>
                      <SelectItem value="very active">Very Active</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Info</FormLabel>
                <FormControl>
                  <Textarea placeholder="Any extra notes? Could be anything important ex. pre-existing conditions, injuries, long-term goals, time availability, nutrition, preferred exercises, etc" {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea placeholder="Any specific instructions for the program? ex. rows and columns of the program, no deadlifts, periodization, program specific info, unique info accompanying the program or excercise, etc." {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
        <Button type="submit">Create Program</Button>
      </form>
      
      {isLoading && (
        <div className="flex justify-center animate-pulse">
          <p className="text-xl">
            Generating program...
            <span className="inline-block w-2 h-2 ml-2 animate-spin rounded-full bg-black"></span>
          </p>
        </div>
      )}
    </Form>
  )
}
