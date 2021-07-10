import React, { SetStateAction, useRef, useState } from 'react';
// import classNames from 'classnames';
// import Button from 'ComponentsUI/Button';
// import useStyles from 'Hooks/useStyles';
import Preview from './Preview/Preview';
import classNames from 'classnames';
import s from './FileUploader.module.scss';

interface IFileUploader {
  files: FileList | [];
  setFilesState: any;
  uploadButtonText: string;
  uploading: boolean;
  mediaUrl?: string;
  buttonClassname?: string;
  buttonVariant?: 'primary' | 'secondary' | 'outline' | 'text' | 'green';
  buttonSize?: 'l' | 'm' | 's' | 'xs';
}

const FileUploader: React.FC<IFileUploader> = ({
  files,
  setFilesState,
  uploadButtonText,
  uploading,
  mediaUrl,
  buttonClassname,
  buttonVariant = 'primary',
  buttonSize = 'm',
}) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [media, setMedia] = useState();


  const onUploadFileClick = () => {
    if (uploading) {
      return;
    }
    const currentRef = fileRef.current;
    currentRef && currentRef.click();
  };

  const deleteFile = (fileIndex: number) => {
    const newFiles = [...Array.from(files)];

    newFiles.splice(fileIndex, 1);
    setFilesState(newFiles);
  };

  const readFiles = async (newFiles: FileList | []) => {
    if (uploading) {
      return;
    }

    if (!newFiles.length) {
      return;
    }

    setFilesState([...Array.from(files), ...Array.from(newFiles)]);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files && readFiles(e.target.files);
  };
 
  const onFileDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    readFiles(e.dataTransfer.files);
  };

  const onFileDragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        className={s.fileUploadArea}
        onDrop={onFileDrop}
        onDragOver={onFileDragOver}
      >
        <input
          className={s.hide}
          ref={fileRef}
          type="file"
          accept=".jpg, .jpeg, .png"
          multiple
          onChange={onFileChange}
        />
        <button onClick={onUploadFileClick} disabled={uploading}>
          {uploadButtonText}
        </button>
        {/* <Button
          className={classNames(s.uploadBtn, buttonClassname)}
          variant={buttonVariant}
          size={buttonSize}
          onClick={onUploadFileClick}
          disabled={uploading}
        >
          {uploadButtonText}
        </Button> */}
        <div className={s.fileUploadArea__tip}>
          Нажмите или перетащите файл,<br />чтобы загрузить его
        </div>
      </div>
      {!!files.length ? (
        <Preview
          files={files}
          deletePreview={deleteFile}
          // mediaUrl={mediaUrl}
        />
      ) : ''}
    </>
  );
};

export default FileUploader;
