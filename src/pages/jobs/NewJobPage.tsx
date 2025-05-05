
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Plus, Trash } from 'lucide-react';
import { toast } from 'sonner';

const NewJobPage = () => {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('full-time');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState([
    { id: '1', description: '', isRequired: true }
  ]);
  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState<string[]>([]);

  const handleAddRequirement = () => {
    setRequirements([
      ...requirements,
      {
        id: Date.now().toString(),
        description: '',
        isRequired: true
      }
    ]);
  };

  const handleRemoveRequirement = (id: string) => {
    setRequirements(requirements.filter(req => req.id !== id));
  };

  const handleRequirementChange = (id: string, value: string) => {
    setRequirements(requirements.map(req => 
      req.id === id ? { ...req, description: value } : req
    ));
  };

  const handleRequirementTypeChange = (id: string, isRequired: boolean) => {
    setRequirements(requirements.map(req => 
      req.id === id ? { ...req, isRequired } : req
    ));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== '' && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!jobTitle || !department || !location || !description) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }

    // Here you would typically send the data to an API
    // For now, we'll just show a success message and redirect
    toast.success("Oferta de empleo creada correctamente");
    navigate('/jobs');
  };

  return (
    <MainLayout>
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/jobs')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a ofertas
        </Button>
      </div>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nueva Oferta de Empleo</h1>
          <p className="text-muted-foreground">
            Crea una nueva oferta y comienza a recibir aplicaciones
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="jobTitle" className="text-sm font-medium">
                Título del Puesto <span className="text-destructive">*</span>
              </label>
              <Input
                id="jobTitle"
                placeholder="Ej. Desarrollador Frontend"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="department" className="text-sm font-medium">
                Departamento <span className="text-destructive">*</span>
              </label>
              <Input
                id="department"
                placeholder="Ej. Tecnología"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                Ubicación <span className="text-destructive">*</span>
              </label>
              <Input
                id="location"
                placeholder="Ej. Madrid, España"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="jobType" className="text-sm font-medium">
                Tipo de Contrato <span className="text-destructive">*</span>
              </label>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Tiempo Completo</SelectItem>
                  <SelectItem value="part-time">Medio Tiempo</SelectItem>
                  <SelectItem value="contract">Contrato</SelectItem>
                  <SelectItem value="internship">Prácticas</SelectItem>
                  <SelectItem value="remote">Remoto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Descripción del Puesto <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="description"
              placeholder="Describe las responsabilidades y oportunidades del puesto..."
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Requisitos</label>
              <Button type="button" size="sm" variant="outline" onClick={handleAddRequirement}>
                <Plus className="h-4 w-4 mr-1" />
                Añadir requisito
              </Button>
            </div>
            
            <div className="space-y-3">
              {requirements.map((req, index) => (
                <div key={req.id} className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder={`Requisito ${index + 1}`}
                      value={req.description}
                      onChange={(e) => handleRequirementChange(req.id, e.target.value)}
                    />
                  </div>
                  <Select
                    value={req.isRequired ? "required" : "optional"}
                    onValueChange={(val) => handleRequirementTypeChange(req.id, val === "required")}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="required">Obligatorio</SelectItem>
                      <SelectItem value="optional">Deseable</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveRequirement(req.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="text-sm font-medium">Habilidades Requeridas</label>
            <div className="flex gap-2">
              <Input
                placeholder="Añadir una habilidad..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
              />
              <Button type="button" onClick={handleAddSkill}>Añadir</Button>
            </div>
            
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-muted px-3 py-1 rounded-full flex items-center gap-1 text-sm"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      <Trash className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => navigate('/jobs')}>
              Cancelar
            </Button>
            <Button type="submit">Crear Oferta</Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default NewJobPage;
