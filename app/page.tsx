'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProfileForm } from "@/components/profile-form"
import { ClientNotes } from "@/components/client-notes"
import { useState } from "react";
import { TrainingProgram } from "@/components/training-program"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
      <h1 className="item-center mt-10 scroll-m-20 border-b pb-2 pt-8 text-3xl font-semibold tracking-tight transition-colors first:mt-0">AI for Personalized Training and Support</h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Fill out the form below and let AI create your program
        </p>
        <Link href='/survey'>
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-blue-500 italic">
            Wanna learn more?
          </p>
        </Link>
        
      </header>
      
      <main className="flex min-h-screen flex-col items-center gap-12 p-12">
        <div className="flex w-full items-center justify-center">
          <Card className="w-2/3">
            <CardHeader>
              <CardTitle>{clientNotes ? "Notes" : "Profile"}</CardTitle>
            </CardHeader>
            <CardContent>
              {program ? <ClientNotes clientNotes={clientNotes} /> : <ProfileForm onCreatedNotes={setClientNotes} onCreatedProgram={setProgram}/>}
            </CardContent>
          </Card>
        </div>
        <div className="flex item-scenter gap-2">
            <Button variant="ghost" onClick={handleNewProgram}>New Program</Button> 
            {/* <Button variant="ghost" >Edit Program</Button>    */}
        </div>
        <div className="separator w-full h-px bg-gray-300" />
        <div className="flex w-full items-center justify-center">
          {program ? (
            <Card className="w-2/3">
            <CardHeader>
              <CardTitle>Training Program</CardTitle>
            </CardHeader>
            <CardContent>
              <TrainingProgram program={program} />
            </CardContent>
          </Card>
          ) : (
            <p>Generate a program to see the results here</p>
          )}
        </div>
        
      </main>
    </div>
  );
}

