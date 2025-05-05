
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Job } from "@/types";
import { Link } from "react-router-dom";

interface JobsTableProps {
  jobs: {
    jobId: string;
    jobTitle: string;
    applications: number;
    hired: number;
  }[];
}

const JobsTable = ({ jobs }: JobsTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título del puesto</TableHead>
            <TableHead className="text-right">Aplicaciones</TableHead>
            <TableHead className="text-right">Contratados</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.jobId}>
              <TableCell className="font-medium">{job.jobTitle}</TableCell>
              <TableCell className="text-right">{job.applications}</TableCell>
              <TableCell className="text-right">{job.hired}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/jobs/${job.jobId}`}>Ver detalles</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobsTable;
