
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Candidate, CandidateStage, Education, WorkExperience } from "@/types";
import { useResumesStore, ResumeFile } from "./resumesStore";
import { useJobsStore } from "./jobsStore";
import { mockCandidates } from "./mockData";

interface CandidatesState {
  candidates: Candidate[];
  getCandidateById: (id: string) => Candidate | undefined;
  getCandidatesByJobId: (jobId: string) => Candidate[];
  syncCandidatesFromResumes: () => void;
  updateCandidateStage: (id: string, stage: CandidateStage) => void;
}

// Función para generar un candidato a partir de un resumen
const generateCandidateFromResume = (resume: ResumeFile): Candidate | null => {
  if (!resume.jobId || !resume.analyzed) return null;

  const job = useJobsStore.getState().getJobById(resume.jobId);
  if (!job) return null;

  const candidateId = resume.candidateId || `candidate-${resume.id}`;
  
  // Extraer el nombre del archivo (simulando extracción de datos del CV)
  const nameParts = resume.name.split('.')[0].split('_');
  const name = nameParts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
  
  // Generar datos aleatorios para simular información extraída
  const randomEmail = `${name.toLowerCase().replace(/\s/g, '.')}@gmail.com`;
  const randomPhone = `+34 ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 900 + 100)}`;
  const locations = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao', 'Málaga'];
  const randomLocation = locations[Math.floor(Math.random() * locations.length)];
  
  // Generar habilidades basadas en palabras clave o aleatorias
  const skills = resume.keywords || job.skills.filter(() => Math.random() > 0.3);
  
  // Generar un score basado en el matchScore o aleatorio
  const score = resume.matchScore || Math.floor(Math.random() * 40 + 60);
  
  // Experiencia laboral simulada
  const workExperience: WorkExperience[] = [
    {
      id: `work-${candidateId}-1`,
      company: "Empresa Ejemplo S.L.",
      position: job.title,
      startDate: "2020-01-01",
      endDate: null,
      description: "Desempeño funciones relacionadas con el puesto actual."
    },
    {
      id: `work-${candidateId}-2`,
      company: "Otra Empresa Anterior",
      position: "Cargo Junior",
      startDate: "2018-06-01",
      endDate: "2019-12-31",
      description: "Adquirí experiencia en tareas similares a las requeridas."
    }
  ];
  
  // Educación simulada
  const education: Education[] = [
    {
      id: `edu-${candidateId}-1`,
      institution: "Universidad de España",
      degree: "Licenciatura",
      field: "Campo relacionado con el puesto",
      startDate: "2014-09-01",
      endDate: "2018-06-30"
    }
  ];
  
  return {
    id: candidateId,
    jobId: resume.jobId,
    name: name,
    email: randomEmail,
    phone: randomPhone,
    location: randomLocation,
    resumeUrl: `/resumes/${resume.id}`,
    workExperience,
    education,
    skills,
    stage: CandidateStage.APPLIED,
    score: score,
    notes: "",
    createdAt: resume.analyzedAt || resume.uploadedAt,
    updatedAt: new Date().toISOString()
  };
};

export const useCandidatesStore = create<CandidatesState>()(
  persist(
    (set, get) => ({
      candidates: mockCandidates,
      
      getCandidateById: (id) => {
        return get().candidates.find(candidate => candidate.id === id);
      },
      
      getCandidatesByJobId: (jobId) => {
        return get().candidates.filter(candidate => candidate.jobId === jobId);
      },
      
      syncCandidatesFromResumes: () => {
        const resumes = useResumesStore.getState().resumes;
        const candidatesFromResumes = resumes
          .filter(resume => resume.analyzed && resume.jobId && resume.candidateId)
          .map(generateCandidateFromResume)
          .filter((candidate): candidate is Candidate => candidate !== null);
        
        // Combinar con los candidatos existentes, reemplazando si ya existen
        const existingCandidatesIds = new Set(candidatesFromResumes.map(c => c.id));
        const remainingCandidates = get().candidates.filter(c => !existingCandidatesIds.has(c.id));
        
        set({
          candidates: [...remainingCandidates, ...candidatesFromResumes]
        });
      },
      
      updateCandidateStage: (id, stage) => {
        set((state) => ({
          candidates: state.candidates.map(candidate => 
            candidate.id === id 
              ? { ...candidate, stage, updatedAt: new Date().toISOString() } 
              : candidate
          )
        }));
      }
    }),
    {
      name: "candidates-storage",
    }
  )
);
