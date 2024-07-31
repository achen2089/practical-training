'use client'

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Dumbbell, Brain, TrendingUp, ArrowDown, CheckCircle, Rocket} from 'lucide-react';
import { ProfileForm } from "@/components/ProfileForm";
import { WaitList } from '@/components/WaitList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const dynamic = 'force-dynamic'
export const maxDuration = 60;

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
            <p className="text-xl text-gray-600">Revolutionize your fitness journey with intelligent personalized training programs and coaching</p>
          </header>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <FeatureBlock 
              icon={<Dumbbell size={32} />}
              title="Personalized Training"
              description="Tailored training based on goals and fitness level"
            />
            <FeatureBlock 
              icon={<Brain size={32} />}
              title="AI-Powered"
              description="Intelligent training programs with real-time adaptations"
            />
            <FeatureBlock 
              icon={<TrendingUp size={32} />}
              title="Scalable"
              description="Provide personalized and intelligent training at scale"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <WaitList buttonClassName="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center" />
            <Button
              onClick={() => scrollToSection(programRef)}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
            >
              Create Your Program
              <ArrowDown className="ml-2" size={20} />
            </Button>
            <Button
              onClick={() => scrollToSection(learnMoreRef)}
              className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
            >
              Learn More
              <ArrowDown className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Program Creation Section */}
      <section ref={programRef} className="bg-white p-8 md:p-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Create Your Program ✨</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <p className="text-lg mb-6">
              Fill out the form below and let AI create a personalized training program for you.
            </p>
            <ProfileForm />
          </div>
        </div>
      </section>

      <section ref={learnMoreRef} className="min-h-screen bg-gray-50 py-16 flex items-center"> {/* Changed: Added min-h-screen and flex */}
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Learn More About Zentrainer</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>The Problem We Solve</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Generic programs lack personalization and support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Creating custom programs is time-consuming</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Hard to provide personalized support to a growing number of clients</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Difficulty in making timely adjustments to training programs</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <WaitList buttonClassName="bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"/> 
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Roadmap</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="enthusiasts">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="enthusiasts">Fitness Enthusiasts</TabsTrigger>
                    <TabsTrigger value="trainers">Fitness Professionals</TabsTrigger>
                  </TabsList>
                  <TabsContent value="enthusiasts">
                    <ul className="space-y-2 mt-4">
                      <li className="flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Personalized intelligent training programs</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Real-time progress tracking and adjustments</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                        <span>24/7 AI coaching support</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Mobile application</span>
                      </li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="trainers">
                    <ul className="space-y-2 mt-4">
                      <li className="flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Personalized intelligent training program for clients</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Configurable AI to support clients</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Easy training program creation</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Mobile application</span>
                      </li>
                    </ul>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Link href="/survey">
                  <Button className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
                    Shape Roadmap {/* Changed: Shortened button text */}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
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