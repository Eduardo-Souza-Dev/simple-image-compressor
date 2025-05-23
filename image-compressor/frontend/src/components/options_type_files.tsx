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
              <span
              onClick={() => {
                changeType('webp');
              }}
              className={`${styles.kind_file} ${typeFile === 'webp' ? styles.active : ''}`}
              id="webp"
            >
              .webp
            </span>
              <span
              onClick={() => {
                changeType('bmp');
              }}
              className={`${styles.kind_file} ${typeFile === 'bmp' ? styles.active : ''}`}
              id="bmp"
            >
              .bmp
            </span>
              <span
              onClick={() => {
                changeType('tiff');
              }}
              className={`${styles.kind_file} ${typeFile === 'tiff' ? styles.active : ''}`}
              id="tiff"
            >
              .tiff
            </span>
              <span
              onClick={() => {
                changeType('ico');
              }}
              className={`${styles.kind_file} ${typeFile === 'ico' ? styles.active : ''}`}
              id="ico"
            >
              .ico
            </span>
              <span
              onClick={() => {
                changeType('gif');
              }}
              className={`${styles.kind_file} ${typeFile === 'gif' ? styles.active : ''}`}
              id="gif"
            >
              .gif
            </span>
              <span
              onClick={() => {
                changeType('heic');
              }}
              className={`${styles.kind_file} ${typeFile === 'heic' ? styles.active : ''}`}
              id="heic"
            >
              .heic
            </span>

          </div>
    );
}