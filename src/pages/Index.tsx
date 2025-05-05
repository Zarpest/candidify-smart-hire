
import MainLayout from '@/components/layout/MainLayout';
import StatCard from '@/components/dashboard/StatCard';
import JobsTable from '@/components/dashboard/JobsTable';
import StageChart from '@/components/dashboard/StageChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart, Briefcase, Clock, FileText, Users } from 'lucide-react';
import { mockDashboardMetrics } from '@/data/mockData';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const metrics = mockDashboardMetrics;
  
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido a Candidify Smart Hire - Tu plataforma de selección inteligente
          </p>
        </div>
        <Button asChild>
          <Link to="/jobs/new">
            <Briefcase className="mr-2 h-4 w-4" />
            Nueva oferta
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Ofertas de Empleo"
          value={metrics.totalJobs}
          icon={<Briefcase className="h-4 w-4" />}
          description="Ofertas activas actualmente"
        />
        <StatCard
          title="Candidatos Totales"
          value={metrics.totalCandidates}
          icon={<Users className="h-4 w-4" />}
          trend="up"
          trendValue={`+${metrics.newCandidatesThisWeek} esta semana`}
        />
        <StatCard
          title="Pendientes de Revisión"
          value={metrics.pendingReview}
          icon={<Clock className="h-4 w-4" />}
          description="Candidatos sin procesar"
        />
        <StatCard
          title="Currículums Analizados"
          value={metrics.totalCandidates}
          icon={<FileText className="h-4 w-4" />}
          description="Procesados con IA"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7 mt-6">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Ofertas Activas</CardTitle>
            <CardDescription>
              Lista de ofertas de empleo actualmente publicadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <JobsTable jobs={metrics.jobStats} />
            <div className="mt-4 text-right">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/jobs">
                  Ver todas las ofertas
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-4">
          <StageChart data={metrics.candidatesByStage} />
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Acciones Rápidas</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <Button variant="outline" className="h-24 flex flex-col" asChild>
                <Link to="/resumes">
                  <FileText className="h-8 w-8 mb-2" />
                  <span>Cargar Currículums</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col" asChild>
                <Link to="/candidates">
                  <Users className="h-8 w-8 mb-2" />
                  <span>Revisar Candidatos</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col" asChild>
                <Link to="/jobs/new">
                  <Briefcase className="h-8 w-8 mb-2" />
                  <span>Crear Oferta</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col" asChild>
                <Link to="/reports">
                  <BarChart className="h-8 w-8 mb-2" />
                  <span>Ver Reportes</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Análisis de IA</CardTitle>
            <CardDescription>Estadísticas de la asistencia de IA</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Precisión del Análisis de CVs</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-candidify-primary rounded-full" style={{ width: "92%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Tiempo Promedio de Procesamiento</span>
                  <span className="font-medium">8s</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-candidify-accent rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Tasa de Coincidencia de Habilidades</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-candidify-secondary rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  La IA ha procesado <span className="font-medium">{metrics.totalCandidates}</span> currículums este mes, 
                  ahorrando un estimado de <span className="font-medium">42 horas</span> de trabajo manual.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
