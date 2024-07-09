import { Textarea } from "@/components/ui/textarea"

type ClientNotesProps = {
    clientNotes: string;
  };
  
export const ClientNotes: React.FC<ClientNotesProps> = ({ clientNotes }) => {
  return (
    <Textarea
      value={clientNotes}
      className="h-96 w-full"
    />
  );
};
