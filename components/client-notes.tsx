type ClientNotesProps = {
    clientNotes: string;
  };
  
export const ClientNotes: React.FC<ClientNotesProps> = ({ clientNotes }) => {
  return (
    <div>
      <p>{clientNotes}</p>
    </div>
  );
};
