"use client";
import {AiOutlineDelete} from "react-icons/ai";
import styles from "./../css/file_list.module.css"

export default function FileList({ files, onDelete }: { files: string[]; onDelete: (file: string) => void }) {

    return (
        <div className="flex flex-col gap-4">
        {files.map((file) => (
            <div key={file} className="flex items-center justify-between p-4 bg-gray-100 rounded-md shadow-md">
            <span className="text-lg font-semibold">{file}</span>
            <button
                onClick={() => onDelete(file)}
                className={styles.delete_button}
            >
                <AiOutlineDelete size={20} color="#ff4500" />
            </button>
            </div>
        ))}
        </div>
    );
}