"use client";
import styles from "./../css/file_controller.module.css";

type OptionsTypeFilesProps = {
    changeType: (type: string) => void;
    typeFile: string;
}


export default function OptionsTypeFiles({ changeType, typeFile }: OptionsTypeFilesProps) {
    return (
        <div className={styles.file_type_selector}>
            <span
              onClick={() => {
                changeType('svg');
              }}
              className={`${styles.kind_file} ${typeFile === 'svg' ? styles.active : ''}`}
              id="svg"
            >
              .svg
            </span>
            <span
              onClick={() => {
                changeType('png');
              }}
              className={`${styles.kind_file} ${typeFile === 'png' ? styles.active : ''}`}
              id="png"
            >
              .png
            </span>
            <span
              onClick={() => {
                changeType('jpeg');
              }}
              className={`${styles.kind_file} ${typeFile === 'jpeg' ? styles.active : ''}`}
              id="jpeg"
            >
              .jpeg
            </span>


          </div>
    );
}