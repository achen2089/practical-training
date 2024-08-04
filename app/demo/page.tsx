
'use client'

import React from 'react';
import { ProfileForm } from '@/components/ProfileForm';

export const dynamic = 'force-dynamic'
export const maxDuration = 60;

export default function DemoPage() {

  return (
    <section className="bg-white p-8 md:p-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Create Your Program ✨</h2>
          <p className="text-lg mb-6">
              Fill out the form below and let AI create a personalized training program.
            </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <ProfileForm />
          </div>
        </div>
    </section>
  )
}


