"use client";
import { useState, useEffect } from 'react';
import { GenerateUUID } from '@/scripts/GenerateUUID';

export default function FilesDownloads() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const UUID = GenerateUUID();

  useEffect(() => {
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

    fetchFiles();
  }, []);

  function deleteFileFromZip(fileData) {

  }

  function downloadFileFromZip(fileData) {
    console.log('Downloading file:', fileData);
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
            <button onClick={() => downloadFileFromZip(file.data)}> Baixar arquivo</button>
          </li>
        ))}
      </ul>
    </div>
  );
}