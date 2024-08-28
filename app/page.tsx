'use client'

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Dumbbell, Brain, TrendingUp, ArrowDown, Pen, Book, Target, MapPin, XCircle, CheckCircle } from 'lucide-react';
import { WaitList } from '@/components/WaitList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureBlockProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const NotionStylePage: React.FC = () => {
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
            <h1 className="text-5xl font-bold mb-4">AI for Strength Training</h1>
            <p className="text-xl text-gray-600">Don&apos;t just exercise in the gym. Be among the elite who truly train.</p>
          </header>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <FeatureBlock 
              icon={<Dumbbell size={32} />}
              title="Personalized"
              description="Tailored training based on lifestyle and experience"
            />
            <FeatureBlock 
              icon={<Brain size={32} />}
              title="AI-Powered"
              description="Intelligent programs with real-time adjustments and support"
            />
            <FeatureBlock 
              icon={<TrendingUp size={32} />}
              title="Simple"
              description="Straightforward time-tested methods for getting stronger"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <WaitList buttonClassName="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center" />
            <Button
              asChild
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
            >
              <Link href="/demo">
                Create Your Program
                <Pen className="ml-2" size={20} />
              </Link>
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

      {/* Learn More Section */}
      <section ref={learnMoreRef} className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">The Practical Training Story</h2>
          
          <div className="space-y-8 max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold">
                  <Book className="mr-2" size={24} />
                  Philosophy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  There is a difference between exercising and training. Exercising is great, but if you want to make progress and achieve your goals, you need to train.
                </p>
                <p className="text-gray-700">
                  But strength training effectively is challenging. It requires personalization, expertise, consistent feedback, and ongoing support to achieve optimal results.
                </p>
                <p className="text-gray-700">
                  We want to make strength training more accessible and simple with the help of AI, empowering individuals to reach their full potential.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold">
                  <Target className="mr-2" size={24} />
                  Solutions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-6">
                  {[
                    {
                      problem: "It's easy to exercise in the gym, but hard to start effective training.",
                      solution: "We help create effective and intelligent training programs in less than a minute."
                    },
                    {
                      problem: "Training needs to be personalized with quick feedback and adjustments.",
                      solution: "We provide real-time adaptations based on your progress and feedback."
                    },
                    {
                      problem: "Not everyone needs or wants a personal trainer.",
                      solution: "We offer an affordable alternative that provides personalized guidance without human intervention."
                    },
                    {
                      problem: "Many fitness apps and solutions are complicated and cluttered.",
                      solution: "We provide a simple and clean training experience, focusing on what matters most."
                    }
                  ].map((item, index) => (
                    <li key={index} className="space-y-2">
                      <div className="flex items-start">
                        <XCircle className="text-red-500 mr-2 mt-1 flex-shrink-0" size={20} />
                        <strong className="text-gray-700">{item.problem}</strong>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={20} />
                        <span className="text-gray-700">{item.solution}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold">
                  <MapPin className="mr-2" size={24} />
                  Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Personalized intelligent training programs",
                    "Real-time progress tracking and adjustments",
                    "24/7 AI coaching support",
                    "Mobile application"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <ArrowRight className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex justify-center">
                  <Link href="/survey">
                    <Button className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center px-6 py-3">
                      Shape Our Roadmap
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
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