'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button"
import { ProfileForm } from "@/components/profile-form"
import { ClientNotes } from "@/components/client-notes"
import { useState } from "react";
import { TrainingProgram } from "@/components/training-program"
export default function Home() {

  const [clientNotes, setClientNotes] = useState("")
  const [program, setProgram] = useState("")

  const handleNewProgram = () => {
    setProgram("")
    setClientNotes("")
  }

  return (
    <div >
      <header className="flex flex-col items-center">
      <h1 className="item-center mt-10 scroll-m-20 border-b pb-2 pt-8 text-3xl font-semibold tracking-tight transition-colors first:mt-0">AI for Personal Trainers</h1>
        <blockquote className="mt-6 border-l-2 pl-6 italic">
        AI-Powered Personal Training: Scale Your Business with Instant Support and Feedback
        </blockquote>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
        Trainer view on top of the page and client view on the bottom 
      </p>
      </header>
      
      <main className="flex min-h-screen flex-col items-center gap-12 p-12">
        <div className="top-div">
          <ProfileForm onCreatedNotes={setClientNotes} onCreatedProgram={setProgram}/>
        </div>
        <div className="flex item-scenter gap-2">
            <Button variant="ghost" onClick={handleNewProgram}>New Program</Button> 
            {/* <Button variant="ghost" >Edit Program</Button>    */}
          </div>
        
        <div className="separator w-full h-px bg-gray-300" />
        <div className="bottom-div">
          {program ? (
            <TrainingProgram program={program} />
          ) : (
            <p>Generate a program to see the results here</p>
          )}
        </div>
        
      </main>
    </div>
  );
}

