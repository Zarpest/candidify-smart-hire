
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Job } from "@/types";
import { Briefcase, Calendar, FileText, MapPin, Users } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{job.title}</CardTitle>
          <Badge
            className={
              job.status === "published"
                ? "bg-green-100 text-green-800"
                : job.status === "draft"
                ? "bg-amber-100 text-amber-800"
                : "bg-slate-100 text-slate-800"
            }
          >
            {job.status === "published"
              ? "Publicada"
              : job.status === "draft"
              ? "Borrador"
              : "Cerrada"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Briefcase className="mr-2 h-4 w-4" />
            <span>{job.department}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Publicada el {format(new Date(job.createdAt), "dd/MM/yyyy")}</span>
          </div>
          <div className="flex items-center text-sm font-medium">
            <Users className="mr-2 h-4 w-4" />
            <span>{job.applications} aplicaciones</span>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm line-clamp-3">{job.description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-1">
          {job.skills.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="outline" className="bg-slate-50">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 4 && (
            <Badge variant="outline" className="bg-slate-50">
              +{job.skills.length - 4}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <Button className="w-full" asChild>
          <Link to={`/jobs/${job.id}`}>
            <FileText className="mr-2 h-4 w-4" />
            Ver detalles
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
