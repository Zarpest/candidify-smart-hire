
import { Job } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Briefcase, Calendar, Check, MapPin, Users, X } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface JobDetailProps {
  job: Job;
}

const JobDetail = ({ job }: JobDetailProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <div className="flex items-center mt-2 space-x-4">
            <div className="flex items-center text-muted-foreground">
              <Briefcase className="mr-1 h-4 w-4" />
              <span>{job.department}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Users className="mr-1 h-4 w-4" />
              <span>{job.applications} aplicaciones</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
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
          <div className="flex items-center text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{format(new Date(job.createdAt), "dd/MM/yyyy")}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Descripción del puesto</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{job.description}</p>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Requisitos</h3>
                <div className="space-y-2">
                  {job.requirements.map((req) => (
                    <div key={req.id} className="flex items-start">
                      {req.isRequired ? (
                        <Check className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                      ) : (
                        <span className="h-5 w-5 mr-2 flex items-center justify-center text-muted-foreground">•</span>
                      )}
                      <div>
                        <p>{req.description}</p>
                        {req.isRequired && (
                          <Badge variant="outline" className="mt-1">Requerido</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Habilidades</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Acciones</CardTitle>
              <CardDescription>Gestionar esta oferta de empleo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" asChild>
                <Link to={`/candidates?jobId=${job.id}`}>
                  <Users className="mr-2 h-4 w-4" />
                  Ver candidatos
                </Link>
              </Button>
              <Button variant="outline" className="w-full">
                <Briefcase className="mr-2 h-4 w-4" />
                Editar oferta
              </Button>
              <Button variant="outline" className="w-full">
                <X className="mr-2 h-4 w-4" />
                Cerrar oferta
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
              <CardDescription>Métricas de esta oferta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total de aplicaciones</span>
                <Badge variant="secondary">{job.applications}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">En revisión</span>
                <Badge variant="secondary">8</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">En entrevista</span>
                <Badge variant="secondary">4</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Rechazados</span>
                <Badge variant="secondary">12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Contratados</span>
                <Badge variant="secondary">0</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
