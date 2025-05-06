
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { FileUp, File, CheckCircle2, X, AlertCircle, FileText, Trash2 } from "lucide-react";
import { useResumesStore, ResumeFile } from "@/data/resumesStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ResumeUploader = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const { toast } = useToast();

  const { 
    resumes, 
    addResumes, 
    updateResumeStatus, 
    removeResume, 
    clearResumes 
  } = useResumesStore();

  const pendingResumes = resumes.filter(r => r.status === 'pending' && r.uploaded);
  const processingResumes = resumes.filter(r => r.status === 'processing');
  const completedResumes = resumes.filter(r => r.status === 'completed');
  const failedResumes = resumes.filter(r => r.status === 'failed');

  useEffect(() => {
    // Auto-start analysis if we have pending resumes and aren't already analyzing
    if (pendingResumes.length > 0 && !analyzing) {
      analyzeResumes();
    }
  }, [pendingResumes.length]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const validExtensions = ['pdf', 'docx', 'doc', 'txt'];
    
    const newFiles = Array.from(fileList)
      .filter(file => {
        const extension = file.name.split('.').pop()?.toLowerCase();
        return extension && validExtensions.includes(extension);
      })
      .map(file => ({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        uploaded: false,
        analyzed: false
      }));
    
    if (newFiles.length !== fileList.length) {
      toast({
        title: "Formato no soportado",
        description: "Solo se permiten archivos PDF, DOCX, DOC y TXT.",
        variant: "destructive"
      });
    }
    
    if (newFiles.length > 0) {
      addResumes(newFiles);
      uploadFiles(newFiles.map(f => f.id));
    }
  };

  const uploadFiles = (fileIds: string[]) => {
    if (fileIds.length === 0) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    // Simulación de carga con progreso realista según el número de archivos
    const totalSteps = Math.min(100, fileIds.length * 5); // 5 pasos por archivo, max 100
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      const progress = Math.floor((currentStep / totalSteps) * 100);
      
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setUploading(false);
        
        // Marcar archivos como cargados
        fileIds.forEach(id => {
          updateResumeStatus(id, 'pending', false, { uploaded: true });
        });
        
        toast({
          title: "Carga completada",
          description: `${fileIds.length} currículums cargados correctamente.`,
        });
      }
    }, 100 + Math.floor(Math.random() * 100)); // Añadir algo de variación
  };

  const analyzeResumes = () => {
    if (pendingResumes.length === 0 || analyzing) return;
    
    setAnalyzing(true);
    
    // Procesamiento por lotes para evitar problemas con muchos archivos
    const batchSize = 10;
    const totalBatches = Math.ceil(pendingResumes.length / batchSize);
    let currentBatch = 0;
    
    const processBatch = () => {
      if (currentBatch >= totalBatches) {
        setAnalyzing(false);
        toast({
          title: "Análisis completado",
          description: `${pendingResumes.length} currículums analizados correctamente.`,
        });
        return;
      }
      
      const start = currentBatch * batchSize;
      const end = Math.min(start + batchSize, pendingResumes.length);
      const currentBatchFiles = pendingResumes.slice(start, end);
      
      currentBatchFiles.forEach((resume, idx) => {
        // Marcar como procesando
        updateResumeStatus(resume.id, 'processing');
        
        // Simular un análisis con tiempos ligeramente diferentes para cada archivo
        const delay = 500 + Math.floor(Math.random() * 1500) + (idx * 200);
        
        setTimeout(() => {
          // Simular éxito con alta probabilidad o fallo con baja probabilidad
          const success = Math.random() > 0.05;
          
          if (success) {
            // Simulación de resultados del análisis
            updateResumeStatus(resume.id, 'completed', true, {
              matchScore: Math.floor(Math.random() * 100),
              keywords: ['JavaScript', 'TypeScript', 'React', 'Node.js'].filter(() => Math.random() > 0.5),
            });
          } else {
            updateResumeStatus(resume.id, 'failed', false, {
              error: "Error en el análisis del archivo. Formato incompatible o documento dañado."
            });
          }
          
          // Si este es el último archivo del lote, procesar el siguiente lote
          if (idx === currentBatchFiles.length - 1) {
            currentBatch++;
            setTimeout(processBatch, 500);
          }
        }, delay);
      });
    };
    
    // Iniciar procesamiento por lotes
    processBatch();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusBadge = (resume: ResumeFile) => {
    switch (resume.status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">Pendiente</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Procesando</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Completado</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Fallido</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };
  
  const handleRetryAnalysis = (id: string) => {
    updateResumeStatus(id, 'pending');
  };
  
  const handleClearConfirmation = () => {
    setConfirmClear(true);
  };
  
  const handleClearAll = () => {
    clearResumes();
    setConfirmClear(false);
    toast({
      title: "Lista limpiada",
      description: "Todos los currículums han sido eliminados."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cargar Currículums</CardTitle>
          <CardDescription>
            Arrastra y suelta archivos o selecciónalos desde tu dispositivo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              dragActive ? "border-primary bg-primary/5" : "border-border"
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <FileUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">
              Arrastra y suelta tus archivos aquí
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Se aceptan archivos PDF, DOCX, DOC y TXT
            </p>
            <div className="relative">
              <Button variant="outline" className="relative">
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleChange}
                  accept=".pdf,.docx,.doc,.txt"
                  multiple
                />
                Seleccionar archivos
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {resumes.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Currículums</CardTitle>
              <CardDescription>
                {resumes.filter(r => r.uploaded).length} archivos cargados, {completedResumes.length} analizados
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleClearConfirmation} 
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Limpiar todo
            </Button>
          </CardHeader>
          <CardContent>
            {uploading && (
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>Subiendo archivos</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
            
            {analyzing && processingResumes.length > 0 && (
              <div className="mb-6 p-4 bg-muted rounded-md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="relative w-6 h-6">
                    <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                  </div>
                  <span className="font-medium">
                    Analizando {processingResumes.length} de {pendingResumes.length + processingResumes.length} currículums...
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  El análisis de grandes volúmenes de currículums puede tomar varios minutos. No cierre esta página.
                </p>
              </div>
            )}
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Archivo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Subido</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resumes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6">
                        No hay currículums cargados
                      </TableCell>
                    </TableRow>
                  ) : (
                    resumes.map((resume) => (
                      <TableRow key={resume.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-sm line-clamp-1">{resume.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(resume.size)}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(resume)}
                          {resume.error && (
                            <p className="text-xs text-destructive mt-1">{resume.error}</p>
                          )}
                          {resume.status === 'completed' && resume.matchScore !== undefined && (
                            <p className="text-xs text-muted-foreground mt-1">Match: {resume.matchScore}%</p>
                          )}
                        </TableCell>
                        <TableCell>
                          {formatDate(resume.uploadedAt)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {resume.status === 'failed' && (
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleRetryAnalysis(resume.id)}
                                className="h-8 w-8"
                              >
                                <AlertCircle className="h-4 w-4" />
                                <span className="sr-only">Reintentar</span>
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => removeResume(resume.id)}
                              className="h-8 w-8"
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Eliminar</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
      
      <AlertDialog open={confirmClear} onOpenChange={setConfirmClear}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará todos los currículums cargados y no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearAll}>Eliminar todo</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ResumeUploader;
