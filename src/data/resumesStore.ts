
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CandidateStage } from "@/types";

export interface ResumeFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploaded: boolean;
  analyzed: boolean;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
  uploadedAt: string;
  analyzedAt?: string;
  matchScore?: number;
  keywords?: string[];
  jobId?: string;
  candidateId?: string;
}

interface ResumesState {
  resumes: ResumeFile[];
  addResumes: (files: Omit<ResumeFile, "uploadedAt" | "status" | "analyzed">[]) => ResumeFile[];
  updateResumeStatus: (id: string, status: ResumeFile['status'], analyzed?: boolean, extraData?: Partial<ResumeFile>) => void;
  removeResume: (id: string) => void;
  clearResumes: () => void;
  getResumeById: (id: string) => ResumeFile | undefined;
  convertResumeToCandidates: (resumeIds: string[], jobId: string) => void;
}

export const useResumesStore = create<ResumesState>()(
  persist(
    (set, get) => ({
      resumes: [],
      
      addResumes: (newFiles) => {
        const files = newFiles.map(file => ({
          ...file,
          uploadedAt: new Date().toISOString(),
          status: 'pending' as const,
          analyzed: false
        }));
        
        set((state) => ({
          resumes: [...state.resumes, ...files],
        }));
        
        return files;
      },
      
      updateResumeStatus: (id, status, analyzed = false, extraData = {}) => {
        set((state) => ({
          resumes: state.resumes.map(resume => 
            resume.id === id 
              ? { 
                  ...resume, 
                  status, 
                  analyzed,
                  ...(analyzed ? { analyzedAt: new Date().toISOString() } : {}),
                  ...extraData
                }
              : resume
          )
        }));
      },
      
      removeResume: (id) => {
        set((state) => ({
          resumes: state.resumes.filter(resume => resume.id !== id)
        }));
      },
      
      clearResumes: () => {
        set({ resumes: [] });
      },
      
      getResumeById: (id) => {
        return get().resumes.find(resume => resume.id === id);
      },

      convertResumeToCandidates: (resumeIds, jobId) => {
        // Este método añade el jobId a los resúmenes y marca que deben convertirse en candidatos
        set((state) => ({
          resumes: state.resumes.map(resume => 
            resumeIds.includes(resume.id) 
              ? { 
                  ...resume, 
                  jobId,
                  candidateId: `candidate-${resume.id}` // Esto es para vincularlo con un candidato después
                }
              : resume
          )
        }));
      }
    }),
    {
      name: "resumes-storage",
    }
  )
);
