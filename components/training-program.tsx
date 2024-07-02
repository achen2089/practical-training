import React, { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TrainingProgramProps {
  program: string;
}

export const TrainingProgram: React.FC<TrainingProgramProps> = ({ program }) => {
  const parsedData = useMemo(() => {
    return program.split('\n').map(row => row.split(','));
  }, [program]);

  const headers = parsedData[0];
  const rows = parsedData.slice(1);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <TableCell key={cellIndex}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
