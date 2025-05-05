
import { Job } from "@/types";
import { create } from "zustand";
import { mockJobs } from "./mockData";
import { persist } from "zustand/middleware";

interface JobsState {
  jobs: Job[];
  addJob: (job: Omit<Job, "id" | "applications" | "createdAt" | "updatedAt">) => void;
  getJobById: (id: string) => Job | undefined;
}

export const useJobsStore = create<JobsState>()(
  persist(
    (set, get) => ({
      jobs: mockJobs,
      
      addJob: (newJob) => {
        const job: Job = {
          ...newJob,
          id: `job-${Date.now()}`,
          applications: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set((state) => ({
          jobs: [...state.jobs, job],
        }));
      },
      
      getJobById: (id) => {
        return get().jobs.find((job) => job.id === id);
      },
    }),
    {
      name: "jobs-storage",
    }
  )
);
