
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import JobDetail from '@/components/jobs/JobDetail';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useJobsStore } from '@/data/jobsStore';

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const getJobById = useJobsStore((state) => state.getJobById);
  
  const job = id ? getJobById(id) : undefined;
  
  if (!job) {
    return (
      <MainLayout>
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate('/jobs')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a ofertas
          </Button>
        </div>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Oferta no encontrada</h2>
          <p className="text-muted-foreground">
            La oferta de empleo que estás buscando no existe o ha sido eliminada.
          </p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/jobs')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a ofertas
        </Button>
      </div>
      
      <JobDetail job={job} />
    </MainLayout>
  );
};

export default JobDetailPage;
