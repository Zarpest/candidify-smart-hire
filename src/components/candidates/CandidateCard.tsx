
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Candidate, CandidateStage } from "@/types";
import { FileText, Mail, MapPin, Phone } from "lucide-react";
import { useResumesStore } from "@/data/resumesStore";

interface CandidateCardProps {
  candidate: Candidate;
  onClick?: () => void;
}

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

const CandidateCard = ({ candidate, onClick }: CandidateCardProps) => {
  // Obtener el resumen asociado al candidato si existe
  const candidateIdParts = candidate.id.split('-');
  const resumeId = candidateIdParts.length > 1 ? candidateIdParts[1] : null;
  const resume = resumeId ? useResumesStore(state => state.getResumeById(resumeId)) : null;
  
  return (
    <Card 
      className="kanban-card hover:border-candidify-primary transition-all cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-bold">{candidate.name}</CardTitle>
          <Badge className={stageBadgeColors[candidate.stage]}>
            {stageNames[candidate.stage]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-col space-y-2 mt-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Mail className="mr-2 h-4 w-4" />
            <span>{candidate.email}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Phone className="mr-2 h-4 w-4" />
            <span>{candidate.phone}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{candidate.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <FileText className="mr-2 h-4 w-4" />
            <span>{resume ? resume.name : "Ver currículum"}</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Puntuación</span>
            <span className="text-sm font-semibold">{candidate.score}%</span>
          </div>
          <Progress value={candidate.score} className="h-2" />
        </div>
        <div className="mt-4 flex flex-wrap gap-1">
          {candidate.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="outline" className="bg-slate-50">
              {skill}
            </Badge>
          ))}
          {candidate.skills.length > 3 && (
            <Badge variant="outline" className="bg-slate-50">
              +{candidate.skills.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
