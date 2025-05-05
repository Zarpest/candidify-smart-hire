
import { useState } from "react";
import { Candidate, CandidateStage } from "@/types";
import CandidateCard from "./CandidateCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CandidateDetail from "./CandidateDetail";

interface KanbanBoardProps {
  candidates: Candidate[];
}

const stageNames: Record<CandidateStage, string> = {
  [CandidateStage.APPLIED]: "Aplicados",
  [CandidateStage.SCREENING]: "Revisión",
  [CandidateStage.INTERVIEW]: "Entrevista",
  [CandidateStage.TECHNICAL]: "Técnica",
  [CandidateStage.FINAL]: "Final",
  [CandidateStage.OFFER]: "Oferta",
  [CandidateStage.HIRED]: "Contratados",
  [CandidateStage.REJECTED]: "Rechazados",
};

// Define which stages to show in the kanban board
const visibleStages = [
  CandidateStage.APPLIED,
  CandidateStage.SCREENING,
  CandidateStage.INTERVIEW,
  CandidateStage.TECHNICAL,
  CandidateStage.FINAL,
  CandidateStage.OFFER,
];

const KanbanBoard = ({ candidates }: KanbanBoardProps) => {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const getCandidatesByStage = (stage: CandidateStage) => {
    return candidates.filter(candidate => candidate.stage === stage);
  };

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 min-w-[800px]">
        {visibleStages.map((stage) => (
          <div key={stage} className="kanban-column">
            <h3 className="font-semibold mb-4">
              {stageNames[stage]}
              <span className="ml-1 text-sm text-muted-foreground">
                ({getCandidatesByStage(stage).length})
              </span>
            </h3>
            <div className="space-y-3">
              {getCandidatesByStage(stage).map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  onClick={() => setSelectedCandidate(candidate)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedCandidate} onOpenChange={(open) => !open && setSelectedCandidate(null)}>
        {selectedCandidate && (
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalles del Candidato</DialogTitle>
            </DialogHeader>
            <CandidateDetail candidate={selectedCandidate} />
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default KanbanBoard;
