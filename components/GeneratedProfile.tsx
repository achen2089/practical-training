import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface GeneratedProfileProps {
  profileData: {
    clientProfile?: {
      Name: string;
      Age: string;
      Gender: string;
      Height: string;
      Weight: string;
      Experience: string;
      Activity_Level: string;
    };
    trainingGoals?: string[];
    keyConsiderations?: string[];
    recommendedApproaches?: string[];
    additionalNotes?: string[];
  };
}

interface ProfileSectionProps {
  title: string;
  content: React.ReactNode;
}

interface RenderProfileSectionProps {
  title: string;
  data: any;
}

function handleKeySpace(key: string): string {
  return key.replace('_', ' ');
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ title, content }) => (
  <Card className="mb-4">
  <CardHeader>
    <CardTitle>{title}</CardTitle>
  </CardHeader>
  <CardContent>
    {content}
  </CardContent>
  </Card>
);

const renderProfileSection: React.FC<RenderProfileSectionProps> = ({ title, data }) => {
  if (!data) return null;
  
  if (Array.isArray(data)) {
  return (
    <ProfileSection 
    title={title} 
    content={
      <ul className="ml-6 list-disc [&>li]:mt-2">
      {data.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
      </ul>
    }
    />
  );
  } else if (typeof data === 'object') {
  return (
    <ProfileSection 
    title={title} 
    content={
      <ul>
      {Object.entries(data).map(([key, value]) => (
        <li key={key}><strong>{handleKeySpace(key)}:</strong> {value as React.ReactNode}</li>
      ))}
      </ul>
    }
    />
  );
  } else {
  return (
    <ProfileSection 
    title={title} 
    content={data}
    />
  );
  }
};

export const GeneratedProfile: React.FC<GeneratedProfileProps> = ({ profileData }) => (
  <div>
  {renderProfileSection({ title: "Basic Information", data: profileData.clientProfile })}
  {renderProfileSection({ title: "Training Goals", data: profileData.trainingGoals })}
  {renderProfileSection({ title: "Key Considerations", data: profileData.keyConsiderations })}
  {renderProfileSection({ title: "Recommended Approaches", data: profileData.recommendedApproaches })}
  {renderProfileSection({ title: "Additional Notes", data: profileData.additionalNotes })}
  </div>
);