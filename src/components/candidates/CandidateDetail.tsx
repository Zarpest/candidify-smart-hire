
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Briefcase, 
  Calendar, 
  FileText, 
  GraduationCap, 
  Mail, 
  MapPin, 
  Phone 
} from "lucide-react";
import { Candidate, CandidateStage } from "@/types";
import { format } from "date-fns";

interface CandidateDetailProps {
  candidate: Candidate;
}

const stageNames: Record<CandidateStage, string> = {
  [CandidateStage.APPLIED]: "Aplicado",
  [CandidateStage.SCREENING]: "Revisión",
  [CandidateStage.INTERVIEW]: "Entrevista",
  [CandidateStage.TECHNICAL]: "Técnica",
  [CandidateStage.FINAL]: "Final",
  [CandidateStage.OFFER]: "Oferta",
  [CandidateStage.HIRED]: "Contratado",
  [CandidateStage.REJECTED]: "Rechazado",
};

const stageBadgeColors: Record<CandidateStage, string> = {
  [CandidateStage.APPLIED]: "bg-blue-100 text-blue-800",
  [CandidateStage.SCREENING]: "bg-purple-100 text-purple-800",
  [CandidateStage.INTERVIEW]: "bg-amber-100 text-amber-800",
  [CandidateStage.TECHNICAL]: "bg-indigo-100 text-indigo-800",
  [CandidateStage.FINAL]: "bg-cyan-100 text-cyan-800",
  [CandidateStage.OFFER]: "bg-emerald-100 text-emerald-800",
  [CandidateStage.HIRED]: "bg-green-100 text-green-800",
  [CandidateStage.REJECTED]: "bg-red-100 text-red-800",
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return "Presente";
  return format(new Date(dateString), "MMM yyyy");
};

const CandidateDetail = ({ candidate }: CandidateDetailProps) => {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile">Perfil</TabsTrigger>
        <TabsTrigger value="resume">Currículum</TabsTrigger>
        <TabsTrigger value="evaluation">Evaluación</TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile" className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{candidate.name}</CardTitle>
                    <CardDescription>
                      {candidate.workExperience[0]?.position || "Sin posición actual"}
                    </CardDescription>
                  </div>
                  <Badge className={stageBadgeColors[candidate.stage]}>
                    {stageNames[candidate.stage]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{candidate.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{candidate.phone}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{candidate.location}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h3 className="text-lg font-semibold mb-2">Habilidades</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h3 className="text-lg font-semibold mb-2">Notas</h3>
                  <p className="text-sm text-muted-foreground">{candidate.notes || "Sin notas"}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Puntuación</CardTitle>
                <CardDescription>Basada en el matching con la oferta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="stroke-slate-200"
                        cx="50"
                        cy="50"
                        r="40"
                        strokeWidth="10"
                        fill="none"
                      />
                      <circle
                        className="stroke-candidify-primary"
                        cx="50"
                        cy="50"
                        r="40"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - candidate.score / 100)}`}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold">{candidate.score}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Experiencia</h4>
                  <Progress value={85} className="h-2 mb-1" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Requisito: 3 años</span>
                    <span>Candidato: 5 años</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Habilidades</h4>
                  <Progress value={90} className="h-2 mb-1" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Coincidencia: 9/10</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Educación</h4>
                  <Progress value={75} className="h-2 mb-1" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Grado universitario</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="resume" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Información del Currículum
            </CardTitle>
            <CardDescription>Información extraída del CV del candidato</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Experiencia Laboral
                </h3>
                {candidate.workExperience.map((exp) => (
                  <div key={exp.id} className="mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{exp.position}</h4>
                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>
                          {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Educación
                </h3>
                {candidate.education.map((edu) => (
                  <div key={edu.id} className="mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{edu.degree}</h4>
                        <p className="text-sm text-muted-foreground">{edu.institution}</p>
                        <p className="text-sm">{edu.field}</p>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="evaluation" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Evaluación del Candidato</CardTitle>
            <CardDescription>Análisis detallado del perfil del candidato</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Resumen de IA</h3>
                <p className="text-sm text-muted-foreground">
                  El perfil de {candidate.name} muestra una sólida experiencia en {candidate.skills.slice(0, 3).join(", ")}. 
                  Su experiencia en {candidate.workExperience[0]?.company || "empresas anteriores"} demuestra habilidades relevantes 
                  para la posición. La puntuación de {candidate.score}% indica un buen match con los requisitos del puesto.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Fortalezas</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Experiencia relevante en {candidate.skills[0]} de {candidate.workExperience.length} años</li>
                  <li>Formación académica adecuada en {candidate.education[0]?.field}</li>
                  <li>Conjunto completo de habilidades técnicas requeridas</li>
                  <li>Trayectoria profesional progresiva</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Áreas de mejora</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Podría tener más experiencia en proyectos específicos del sector</li>
                  <li>Sin certificaciones adicionales en {candidate.skills[1]}</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Preguntas recomendadas</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>¿Puede describir un proyecto desafiante en el que haya trabajado con {candidate.skills[0]}?</li>
                  <li>¿Cómo ha implementado soluciones utilizando {candidate.skills[2]} en su trabajo anterior?</li>
                  <li>¿Qué experiencia tiene trabajando en equipos distribuidos?</li>
                  <li>¿Cuál ha sido su mayor logro profesional hasta la fecha?</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default CandidateDetail;
