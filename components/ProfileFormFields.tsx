import React from 'react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const ProfileFormFields = ({ form } : {form : any}) => (
  <>
    <div className="flex flex-col md:flex-row md:gap-4">
      <FormField
        control={form.control}
        name="clientName"
        render={({ field }) => (
          <FormItem className="flex-1 mb-4 md:mb-0">
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="age"
        render={({ field }) => (
          <FormItem className="flex-1 mb-4 md:mb-0">
            <FormLabel>Age</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem className="flex-1 mb-4 md:mb-0">
            <FormLabel>Gender</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
    <div className="flex flex-col md:flex-row md:gap-4">
      <FormField
        control={form.control}
        name="height"
        render={({ field }) => (
          <FormItem className="flex-1 mb-4 md:mb-0">
            <FormLabel>Height</FormLabel>
            <FormControl>
              <Input type="number"  {...field} />
            </FormControl>
            <FormDescription>in cm</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="weight"
        render={({ field }) => (
          <FormItem className="flex-1 mb-4 md:mb-0">
            <FormLabel>Weight</FormLabel>
            <FormControl>
              <Input type="number"  {...field} />
            </FormControl>
            <FormDescription>in pounds</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
    <div className="flex flex-col md:flex-row md:gap-6">
      <FormField
        control={form.control}
        name="goal"
        render={({ field }) => (
          <FormItem className="flex-1 mb-4 md:mb-0">
            <FormLabel>Goal</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select goal" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Strength">Strength</SelectItem>
                <SelectItem value="Hypertrophy">Hypertrophy</SelectItem>
                <SelectItem value="Athleticism">Athleticism</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Not Listed">Not Listed</SelectItem>
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
          <FormItem className="flex-1 mb-4 md:mb-0">
            <FormLabel>Experience</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select an experience level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Beginner">Beginner (0 - 1 years)</SelectItem>
                <SelectItem value="Intermediate">Intermediate (1 - 4 years)</SelectItem>
                <SelectItem value="Advanced">Advanced (4+ years)</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
    <div className="flex flex-col md:flex-row md:gap-6">
      <FormField
        control={form.control}
        name="sessions"
        render={({ field }) => (
          <FormItem className="flex-1 mb-4 md:mb-0">
            <FormLabel>Sessions Per Week</FormLabel>
            <FormControl>
              <Input type="number"  {...field} />
            </FormControl>
            <FormDescription>Number of times you want to exercise a week</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="exercises"
        render={({ field }) => (
          <FormItem className="flex-1 mb-4 md:mb-0">
            <FormLabel>Exercises Per Session</FormLabel>
            <FormControl>
              <Input type="string"  {...field} />
            </FormControl>
            <FormDescription>ideal range of exercises per excercise session</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
    <FormField
      control={form.control}
      name="notes"
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel>Additional Info</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Any extra notes? Could be anything important ex. 1 rep max weight for squat, injuries, long-term goals, preferred exercises, etc" 
              {...field} 
              className="min-h-[80px]"
            />
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
            <Textarea 
              placeholder="Any specific instructions for the program? ex. no deadlifts, front squats instead of backsquats, add in power cleans." 
              {...field} 
              className="min-h-[80px]"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);