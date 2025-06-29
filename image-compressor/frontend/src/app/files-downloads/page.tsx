"use client";
import { useState, useEffect } from 'react';
import { GenerateUUID } from '@/scripts/GenerateUUID';
import { toast } from 'sonner';

export default function FilesDownloads() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const UUID = GenerateUUID();
  let urlResponse='';

  async function fetchFiles() {
    try {

      fetch(`http://localhost:3333/files/list/${UUID}`, {
      method: 'GET',
      })
      .then((response) => {
          return response.json();
      })
      .then((data) => {
          setFiles(data);
      })
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFiles();
  }, []);

  function deleteFileFromZip(buffer: string) {
    console.log(buffer);
    fetch(`http://localhost:3333/files/delete/${UUID}`, {
        body: JSON.stringify({
          buffer: buffer,
        }),
         headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
    })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      if(data == 'Arquivo deletado com sucesso') {
        setFiles(files.filter(file => file.data !== buffer));
        toast.success('Arquivo deletado com sucesso!');
        fetchFiles();
      }
    })
  }

  function downloadFileFromZip(buffer: string, imagemName: string) {

    const teste = new Blob([buffer])
    const url = URL.createObjectURL(teste);
    const a = document.createElement('a');
    a.href = url;
    a.download = imagemName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url); 

  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Files Downloads</h1>
      <ul>
        {files.map(file => (
          <li>
            <p>{file.name}</p>
            <button onClick={() => deleteFileFromZip(file.data)}> Deletar arquivo</button>
            <button onClick={() => downloadFileFromZip(file.data, file.name)}> Baixar arquivo</button>
          </li>
        ))}
      </ul>
    </div>
  );
}