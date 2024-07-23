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
    <div className="flex gap-4">
      <FormField
        control={form.control}
        name="clientName"
        render={({ field }) => (
          <FormItem>
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
          <FormItem>
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
      <FormField
        control={form.control}
        name="height"
        render={({ field }) => (
          <FormItem>
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
          <FormItem>
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
                  <SelectValue placeholder="Select goal" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Muscle Gain">Gain Muscle</SelectItem>
                <SelectItem value="Lose Weight">Lose Weight</SelectItem>
                <SelectItem value="Improve Endurance">Endurance</SelectItem>
                <SelectItem value="General Health">General Health</SelectItem>
                <SelectItem value="Improve Athleticism">Improve Athleticism</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
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
      <FormField
        control={form.control}
        name="sessions"
        render={({ field }) => (
          <FormItem>
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
          <FormItem>
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
        <FormItem>
          <FormLabel>Additional Info</FormLabel>
          <FormControl>
            <Textarea placeholder="Any extra notes? Could be anything important ex. 1 rep max weight for squat, injuries, long-term goals, preferred exercises, etc" {...field} />
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
            <Textarea placeholder="Any specific instructions for the program? ex. no deadlifts, front squats instead of backsquats, add in power cleans." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);