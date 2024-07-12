'use client'

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Dumbbell, Brain, TrendingUp, ArrowDown } from 'lucide-react';

// Assume ProfileForm is imported from the correct location
import { ProfileForm } from "@/components/ProfileForm";

interface FeatureBlockProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const NotionStylePage: React.FC = () => {
  const programRef = useRef<HTMLElement>(null);
  const learnMoreRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Landing Section */}
      <section className="min-h-screen flex items-center p-8 md:p-16">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="text-5xl font-bold mb-4">AI for Personalized Training</h1>
            <p className="text-xl text-gray-600">Revolutionize your fitness journey with AI-powered personalized programs and coaching</p>
          </header>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <FeatureBlock 
              icon={<Dumbbell size={32} />}
              title="Customized Workouts"
              description="Tailored exercises based on your goals and fitness level"
            />
            <FeatureBlock 
              icon={<Brain size={32} />}
              title="AI-Powered"
              description="Instant workout generation with real-time adaptations"
            />
            <FeatureBlock 
              icon={<TrendingUp size={32} />}
              title="Track Progress"
              description="Real-time performance insights with automatic program adjustments"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={() => scrollToSection(programRef)}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
            >
              Create Your Program
              <ArrowDown className="ml-2" size={20} />
            </button>
            <button
              onClick={() => scrollToSection(learnMoreRef)}
              className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
            >
              Learn More
              <ArrowDown className="ml-2" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Program Creation Section */}
      <section ref={programRef} className="bg-white p-8 md:p-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Create Your Program</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <p className="text-lg mb-6">
              Fill out the form below and let our AI create a personalized training program for you.
            </p>
            <ProfileForm />
          </div>
        </div>
      </section>

      {/* Learn More Section */}
      <section ref={learnMoreRef} className="bg-gray-100 p-8 md:p-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Learn More About Zenfit</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-2xl font-semibold mb-4">The Problem</h3>
            <p className="mb-4">
              It&rsquo;s challenging to achieve fitness goals effectively and efficiently:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Generic online programs lack personalization, leading to suboptimal results.</li>
              <li className="mb-2">Creating your own program requires time and expertise most people don&rsquo;t have.</li>
              <li className="mb-2">Personal trainers are effective but expensive and time-consuming.</li>
              <li className="mb-2">Trainers struggle to scale their client base due to time constraints.</li>
            </ul>
            <p className="mb-4">
              Zenfit solves these issues by using AI to provide fast, personalized training and coaching, benefiting both fitness enthusiasts and personal trainers.
            </p>
            <Link href="/survey">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
                Wanna stay up to date?
                <ArrowRight className="ml-2" size={20} />
              </button>
            </Link>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-2xl font-semibold mb-4">Roadmap</h3>
            <p className="mb-4">
              Zenfit is still in its earliest stages! Its still a proof of concept with a lot of room for change and improvement. Here are some features in the pipeline: 
            </p>
            <h4 className="text-xl font-medium mb-3">For Fitness Enthusiasts</h4>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Instant, AI-generated personalized workout plans</li>
              <li className="mb-2">Real-time progress tracking and plan adjustments</li>
              <li className="mb-2">24/7 AI coaching support for for, technique, and workout plan</li>
            </ul>

            <h4 className="text-xl font-medium mb-3">For Personal Trainers</h4>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">AI-assisted client program creation and management</li>
              <li className="mb-2">Automated progress reports and insights for clients</li>
              <li className="mb-2">Scalable client base management tools</li>
            </ul>

            <p className="mb-4">
              Mission is to make fitness training more accessible, personalized, and effective for everyone involved.
            </p>

            <Link href="/survey">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
                Want to shape our roadmap?
                <ArrowRight className="ml-2" size={20} />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureBlock: React.FC<FeatureBlockProps> = ({ icon, title, description }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
    <div className="text-blue-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default NotionStylePage;