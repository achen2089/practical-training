import { Textarea } from '@/components/ui/textarea';

interface TrainingProgramProps {
  program: string;
}

export const TrainingProgram: React.FC<TrainingProgramProps> = ({ program }) => {
  
  return (
        <Textarea
          value={program}
          className="h-96 w-full"
        />
  );
};
