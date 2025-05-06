
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import KanbanBoard from '@/components/candidates/KanbanBoard';
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
import { Search, SlidersHorizontal, Users } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCandidatesStore } from '@/data/candidatesStore';
import { useJobsStore } from '@/data/jobsStore';
import { Link } from 'react-router-dom';
import { useResumesStore } from '@/data/resumesStore';
import { toast } from '@/components/ui/use-toast';

const CandidatesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState('all');
  
  const jobs = useJobsStore((state) => state.jobs);
  const candidates = useCandidatesStore((state) => state.candidates);
  const syncCandidatesFromResumes = useCandidatesStore((state) => state.syncCandidatesFromResumes);
  const resumes = useResumesStore((state) => state.resumes);
  
  // Sincronizar candidatos al cargar la página
  useEffect(() => {
    syncCandidatesFromResumes();
  }, [syncCandidatesFromResumes]);
  
  // Contar resúmenes analizados que no son candidatos aún
  const analyzedResumesCount = resumes.filter(r => 
    r.analyzed && 
    r.status === 'completed' && 
    !candidates.some(c => c.id === `candidate-${r.id}`)
  ).length;
  
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesJob = selectedJob === 'all' || candidate.jobId === selectedJob;
    
    return matchesSearch && matchesJob;
  });

  const handleConvertResumes = () => {
    if (selectedJob === 'all') {
      toast({
        title: "Selecciona una oferta",
        description: "Debes seleccionar una oferta de empleo específica para convertir los currículums a candidatos.",
        variant: "destructive"
      });
      return;
    }
    
    // Obtener los resumenes analizados que no son candidatos aún
    const resumesToConvert = resumes.filter(r => 
      r.analyzed && 
      r.status === 'completed' && 
      !candidates.some(c => c.id === `candidate-${r.id}`)
    );
    
    if (resumesToConvert.length === 0) {
      toast({
        title: "No hay currículums para convertir",
        description: "No hay currículums analizados disponibles para convertir a candidatos.",
      });
      return;
    }
    
    // Convertir resúmenes a candidatos
    useResumesStore.getState().convertResumeToCandidates(
      resumesToConvert.map(r => r.id),
      selectedJob
    );
    
    // Sincronizar para actualizar la lista de candidatos
    syncCandidatesFromResumes();
    
    toast({
      title: "Currículums convertidos",
      description: `${resumesToConvert.length} currículums han sido convertidos a candidatos.`,
    });
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Candidatos</h1>
          <p className="text-muted-foreground">
            Gestiona y evalúa a tus candidatos en un solo lugar
          </p>
        </div>
        <div className="flex gap-2">
          {analyzedResumesCount > 0 && (
            <Button 
              variant="outline" 
              onClick={handleConvertResumes}
              disabled={selectedJob === 'all'}
            >
              <Users className="mr-2 h-4 w-4" />
              Convertir {analyzedResumesCount} CV a candidatos
            </Button>
          )}
          <Button asChild>
            <Link to="/resumes">
              <Users className="mr-2 h-4 w-4" />
              Cargar CV
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar candidatos..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Select
          value={selectedJob}
          onValueChange={setSelectedJob}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Todas las ofertas" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">Todas las ofertas</SelectItem>
              {jobs.map(job => (
                <SelectItem key={job.id} value={job.id}>
                  {job.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium">Filtros avanzados</h4>
              
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Puntuación mínima</h5>
                <Input type="number" placeholder="0" min="0" max="100" />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Habilidades</h5>
                <div className="grid grid-cols-2 gap-2">
                  {['React', 'TypeScript', 'JavaScript', 'Node.js', 'HTML', 'CSS'].map(skill => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox id={`skill-${skill}`} />
                      <Label htmlFor={`skill-${skill}`} className="text-sm">{skill}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Experiencia</h5>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Cualquiera" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Cualquiera</SelectItem>
                    <SelectItem value="0-1">0-1 años</SelectItem>
                    <SelectItem value="1-3">1-3 años</SelectItem>
                    <SelectItem value="3-5">3-5 años</SelectItem>
                    <SelectItem value="5+">5+ años</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end space-x-2 pt-2">
                <Button variant="outline" size="sm">Limpiar</Button>
                <Button size="sm">Aplicar</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      {filteredCandidates.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No se encontraron candidatos</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || selectedJob !== 'all'
              ? "No hay candidatos que coincidan con tus criterios de búsqueda."
              : "Aún no hay candidatos registrados."}
          </p>
          {analyzedResumesCount > 0 ? (
            <div className="flex flex-col gap-3 items-center">
              <p>Tienes {analyzedResumesCount} currículums analizados disponibles para convertir en candidatos.</p>
              <Button onClick={handleConvertResumes}>Convertir CV a candidatos</Button>
            </div>
          ) : (
            <Button asChild>
              <Link to="/resumes">Cargar currículums</Link>
            </Button>
          )}
        </div>
      ) : (
        <KanbanBoard candidates={filteredCandidates} />
      )}
    </MainLayout>
  );
};

export default CandidatesPage;
