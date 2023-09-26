import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Separator } from "./components/ui/separator"
import { Airplay } from "lucide-react"
import React, { useState } from 'react';
import { ipcRenderer } from 'electron';


function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Função para lidar com a seleção de arquivos PDF
  const handleFileSelection = () => {
    ipcRenderer.send('open-file-dialog');
  };

  // Função para processar os arquivos PDF selecionados
  const convertToJPEG = () => {
    // Verifique se há arquivos selecionados
    if (selectedFiles.length === 0) {
      alert('Selecione um ou mais arquivos PDF antes de converter.');
      return;
    }

    // Agora você pode chamar a função processPDFs passando selectedFiles
    // processPDFs(selectedFiles);
  };

  // Evento para receber os arquivos selecionados do processo principal
  ipcRenderer.on('selected-files', (event, files) => {
    setSelectedFiles(files);
  });

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">Aplicação PS</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Colégio SEICE
          </span>

          <Separator orientation="vertical" className="h-6" />

          <Button variant="outline" onClick={() => { window.location.href = 'https://seice.com.br' }}>
            <Airplay className="w-4 h-4 mr-2" />
            Portal
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 flex gap-6 items-center justify-center">
        <div className="">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="files">Escolha um ou mais arquivos PDF:</Label>
            <Input
              id="files"
              type="file"
              multiple
              accept="application/pdf"
              onChange={handleFileSelection}
            />
            <Button onClick={convertToJPEG}>Converter para JPEG</Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
