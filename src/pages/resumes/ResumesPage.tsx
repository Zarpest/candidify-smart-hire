
import MainLayout from '@/components/layout/MainLayout';
import ResumeUploader from '@/components/resumes/ResumeUploader';

const ResumesPage = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Currículums</h1>
        <p className="text-muted-foreground">
          Carga currículums y deja que la IA los analice para ti
        </p>
      </div>
      
      <ResumeUploader />
    </MainLayout>
  );
};

export default ResumesPage;
