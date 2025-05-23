"use client";
import {AiOutlineDelete} from "react-icons/ai";
import styles from "./../css/file_list.module.css"

export default function FileList({ files, onDelete }: { files: string[]; onDelete: (file: string) => void }) {

    return (
        <div className={styles.file_list}>
        {files.map((file) => (
            <div key={file}>
            <span>{file}</span>
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