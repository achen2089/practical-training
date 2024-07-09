import Link from "next/link"
import { ProfileForm } from "@/components/ProfileForm"

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export default function Home() {
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
          <ProfileForm/>
        </div>
      </main>
    </div>
  );
}

