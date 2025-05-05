
// Enumeración para las etapas del proceso de selección
export enum CandidateStage {
  APPLIED = "applied",
  SCREENING = "screening",
  INTERVIEW = "interview",
  TECHNICAL = "technical",
  FINAL = "final",
  OFFER = "offer",
  HIRED = "hired",
  REJECTED = "rejected"
}

// Interfaz para los requisitos de un trabajo
export interface JobRequirement {
  id: string;
  description: string;
  isRequired: boolean;
}

// Interfaz para la información de experiencia laboral
export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

// Interfaz para la información educativa
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | null;
}

// Interfaz para la información de los trabajos/ofertas
export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string; // full-time, part-time, contract, etc.
  description: string;
  requirements: JobRequirement[];
  skills: string[];
  status: 'draft' | 'published' | 'closed';
  createdAt: string;
  updatedAt: string;
  applications: number;
}

// Interfaz para la información de los candidatos
export interface Candidate {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  resumeUrl: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  stage: CandidateStage;
  score: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// Interfaz para las métricas del dashboard
export interface DashboardMetrics {
  totalJobs: number;
  totalCandidates: number;
  newCandidatesThisWeek: number;
  pendingReview: number;
  jobStats: {
    jobId: string;
    jobTitle: string;
    applications: number;
    hired: number;
  }[];
  candidatesByStage: {
    stage: CandidateStage;
    count: number;
  }[];
}
