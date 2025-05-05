
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BarChart, PieChart } from "lucide-react";
import { mockJobs, mockCandidates } from '@/data/mockData';
import { BarChart as RechartBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart as RechartPieChart, Pie, Legend } from 'recharts';

const COLORS = ['#4F46E5', '#3B82F6', '#7C3AED', '#EC4899', '#F43F5E', '#10B981'];

const ReportsPage = () => {
  const candidatesByJob = mockJobs.map(job => {
    const candidates = mockCandidates.filter(c => c.jobId === job.id);
    return {
      name: job.title,
      value: candidates.length
    };
  });
  
  const candidateStageData = [
    { name: "Aplicados", value: 12 },
    { name: "En revisión", value: 10 },
    { name: "Entrevista", value: 8 },
    { name: "Técnica", value: 6 },
    { name: "Final", value: 4 },
    { name: "Oferta", value: 2 }
  ];
  
  const weeklyData = [
    { name: "Lun", aplicaciones: 5 },
    { name: "Mar", aplicaciones: 8 },
    { name: "Mie", aplicaciones: 12 },
    { name: "Jue", aplicaciones: 7 },
    { name: "Vie", aplicaciones: 15 },
    { name: "Sab", aplicaciones: 3 },
    { name: "Dom", aplicaciones: 2 }
  ];
  
  const channelData = [
    { name: "LinkedIn", value: 45 },
    { name: "Web corporativa", value: 25 },
    { name: "Referencias", value: 15 },
    { name: "Indeed", value: 10 },
    { name: "Otros", value: 5 }
  ];

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reportes</h1>
          <p className="text-muted-foreground">
            Analiza y visualiza los datos de tu proceso de selección
          </p>
        </div>
        <Select defaultValue="thisMonth">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Periodo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="thisWeek">Esta semana</SelectItem>
            <SelectItem value="thisMonth">Este mes</SelectItem>
            <SelectItem value="lastMonth">Mes anterior</SelectItem>
            <SelectItem value="lastQuarter">Último trimestre</SelectItem>
            <SelectItem value="thisYear">Este año</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Vista general</TabsTrigger>
          <TabsTrigger value="jobs">Ofertas</TabsTrigger>
          <TabsTrigger value="candidates">Candidatos</TabsTrigger>
          <TabsTrigger value="ai">Análisis IA</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Candidatos por Oferta</CardTitle>
                    <CardDescription>Distribución de candidatos según la oferta</CardDescription>
                  </div>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartPieChart>
                      <Pie
                        data={candidatesByJob}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {candidatesByJob.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Candidatos por Etapa</CardTitle>
                    <CardDescription>Distribución de candidatos según su etapa</CardDescription>
                  </div>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartBarChart data={candidateStageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#4F46E5" />
                    </RechartBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Actividad Semanal</CardTitle>
                    <CardDescription>Aplicaciones por día de la semana</CardDescription>
                  </div>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartBarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="aplicaciones" fill="#7C3AED" />
                    </RechartBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Fuente de Aplicaciones</CardTitle>
                    <CardDescription>Canales de origen de los candidatos</CardDescription>
                  </div>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartPieChart>
                      <Pie
                        data={channelData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {channelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle>Métricas de Ofertas de Empleo</CardTitle>
              <CardDescription>Información detallada sobre tus ofertas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-12 text-muted-foreground">Selecciona un periodo para ver las métricas detalladas de las ofertas.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="candidates">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Candidatos</CardTitle>
              <CardDescription>Estadísticas avanzadas sobre tu pool de candidatos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-12 text-muted-foreground">Selecciona un periodo para ver el análisis detallado de candidatos.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento de la IA</CardTitle>
              <CardDescription>Métricas sobre el análisis de currículums y asistencia por IA</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-12 text-muted-foreground">Selecciona un periodo para ver las métricas de rendimiento de la IA.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default ReportsPage;
