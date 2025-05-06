
import MainLayout from '@/components/layout/MainLayout';
import ResumeUploader from '@/components/resumes/ResumeUploader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CheckSquare, ListChecks } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useResumesStore } from '@/data/resumesStore';

const ResumesPage = () => {
  const resumes = useResumesStore((state) => state.resumes);
  const analyzedCount = resumes.filter(r => r.analyzed).length;
  const failedCount = resumes.filter(r => r.status === 'failed').length;
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Currículums</h1>
        <p className="text-muted-foreground">
          Carga currículums y deja que la IA los analice para ti
        </p>
        
        {resumes.length > 0 && (
          <div className="mt-4 flex gap-3">
            <Badge variant="outline" className="bg-muted/50 px-3 py-1">
              <FileText className="h-4 w-4 mr-1" /> 
              {resumes.length} currículums cargados
            </Badge>
            {analyzedCount > 0 && (
              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 px-3 py-1">
                <CheckSquare className="h-4 w-4 mr-1" /> 
                {analyzedCount} analizados
              </Badge>
            )}
            {failedCount > 0 && (
              <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 px-3 py-1">
                {failedCount} fallidos
              </Badge>
            )}
          </div>
        )}
      </div>
      
      <div className="grid gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Análisis de Currículums
            </CardTitle>
            <CardDescription>
              Entendiendo cómo la IA procesa y evalúa los currículums
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">¿Cómo funciona el análisis?</h3>
              <p className="text-muted-foreground">
                Nuestro sistema utiliza inteligencia artificial avanzada para procesar los currículums y extraer información 
                relevante de manera estructurada. El análisis incluye:
              </p>
              <ul className="mt-2 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Extracción automática de datos como experiencia laboral, educación, habilidades y datos de contacto</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Identificación de palabras clave relevantes para el puesto</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Correspondencia entre perfil del candidato y requisitos del puesto</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Puntuación (scoring) basada en la relevancia y ajuste al perfil buscado</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Formatos admitidos</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-muted/50">
                  PDF <span className="text-primary ml-1">(.pdf)</span>
                </Badge>
                <Badge variant="outline" className="bg-muted/50">
                  Word <span className="text-primary ml-1">(.docx, .doc)</span>
                </Badge>
                <Badge variant="outline" className="bg-muted/50">
                  Texto <span className="text-primary ml-1">(.txt)</span>
                </Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Para mejores resultados, recomendamos utilizar currículums en formato PDF bien estructurados.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Recomendaciones para volúmenes grandes</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <ListChecks className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Carga por lotes</p>
                    <p className="text-sm text-muted-foreground">Para procesamiento óptimo, cargue los currículums en lotes de 20-30 archivos</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ListChecks className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Mantenga la página abierta</p>
                    <p className="text-sm text-muted-foreground">No cierre la página durante el análisis para evitar interrupciones</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ListChecks className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Revise regularmente</p>
                    <p className="text-sm text-muted-foreground">Supervise el progreso y verifique si hay archivos que requieran reprocesamiento</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ListChecks className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Asegure buena conexión</p>
                    <p className="text-sm text-muted-foreground">Una conexión estable a internet evitará interrupciones durante la carga</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <ResumeUploader />
    </MainLayout>
  );
};

export default ResumesPage;
