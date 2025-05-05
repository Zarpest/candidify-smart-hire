
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import JobCard from '@/components/jobs/JobCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Briefcase, Search } from 'lucide-react';
import { mockJobs } from '@/data/mockData';
import { Link } from 'react-router-dom';

const JobsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ofertas de Empleo</h1>
          <p className="text-muted-foreground">
            Gestiona tus ofertas y visualiza las aplicaciones
          </p>
        </div>
        <Button asChild>
          <Link to="/jobs/new">
            <Briefcase className="mr-2 h-4 w-4" />
            Nueva oferta
          </Link>
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar ofertas..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="published">Publicados</SelectItem>
              <SelectItem value="draft">Borradores</SelectItem>
              <SelectItem value="closed">Cerrados</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No se encontraron ofertas</h3>
          <p className="text-muted-foreground mb-4">
            No hay ofertas que coincidan con tus criterios de búsqueda.
          </p>
          <Button asChild>
            <Link to="/jobs/new">Crear nueva oferta</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default JobsPage;
