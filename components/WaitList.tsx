import React, { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Rocket } from 'lucide-react';
import { addWaitlist } from '@/lib/addWaitlist';

interface WaitListProps {
    buttonClassName: string;
}

export function WaitList({ buttonClassName }: WaitListProps) {
    const [email, setEmail] = useState('');

    const handleSubmit = async () => {
        addWaitlist(email);
        alert("It's confirmed you're on the waitlist 🚀!");
    };

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className={buttonClassName}>
                        Sign up for Waitlist
                        <Rocket size={20} className="ml-2" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Waitlist Signup</AlertDialogTitle>
                        <AlertDialogDescription>
                            <p className='pb-4'>Join the waitlist to get early access and newest updates!</p>
                            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-blue-600" onClick={handleSubmit}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}