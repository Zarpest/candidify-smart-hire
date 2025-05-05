
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { FileUp, File, CheckCircle2, X } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploaded: boolean;
  error?: string;
}

const ResumeUploader = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

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
    const newFiles = Array.from(fileList)
      .filter(file => {
        const extension = file.name.split('.').pop()?.toLowerCase();
        return extension === 'pdf' || extension === 'docx' || extension === 'doc' || extension === 'txt';
      })
      .map(file => ({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        uploaded: false
      }));
    
    if (newFiles.length !== fileList.length) {
      toast({
        title: "Formato no soportado",
        description: "Solo se permiten archivos PDF, DOCX, DOC y TXT.",
        variant: "destructive"
      });
    }
    
    if (newFiles.length > 0) {
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const uploadFiles = () => {
    if (files.length === 0 || files.every(file => file.uploaded)) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    // Simulación de carga
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          
          // Marcar archivos como cargados
          setFiles(prev => prev.map(file => ({
            ...file,
            uploaded: true
          })));
          
          toast({
            title: "Carga completada",
            description: `${files.filter(f => !f.uploaded).length} currículums cargados correctamente.`,
          });
          
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
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
              dragActive ? "border-candidify-primary bg-candidify-light" : "border-border"
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

      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Archivos a cargar</CardTitle>
            <CardDescription>
              {files.filter(f => f.uploaded).length} de {files.length} archivos cargados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {files.map((file) => (
                <div key={file.id} className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-md mr-3 ${file.uploaded ? "bg-green-100" : "bg-slate-100"}`}>
                      {file.uploaded ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <File className="h-5 w-5 text-slate-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm line-clamp-1">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)} • {file.type.split("/")[1]}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFile(file.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              {uploading && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progreso de carga</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={() => setFiles([])}>
                  Limpiar todo
                </Button>
                <Button 
                  onClick={uploadFiles}
                  disabled={uploading || files.length === 0 || files.every(f => f.uploaded)}
                >
                  {uploading ? "Cargando..." : "Cargar archivos"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {files.some(f => f.uploaded) && (
        <Card>
          <CardHeader>
            <CardTitle>Análisis de Currículums</CardTitle>
            <CardDescription>
              Procesando contenido con IA para extraer información
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-6 text-center space-y-4">
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-candidify-light"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-candidify-primary animate-spin"></div>
              </div>
              <h3 className="text-lg font-medium">Análisis en progreso</h3>
              <p className="text-sm text-muted-foreground">
                La IA está analizando y extrayendo información de {files.filter(f => f.uploaded).length} currículums. 
                Esto puede tomar unos minutos.
              </p>
              <div className="w-full max-w-md mx-auto bg-muted rounded-full h-2.5 mt-2">
                <div className="bg-gradient-to-r from-candidify-primary to-candidify-accent h-2.5 rounded-full w-3/4 animate-pulse-slow"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResumeUploader;
