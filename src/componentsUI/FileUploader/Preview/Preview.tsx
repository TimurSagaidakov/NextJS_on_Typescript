import React, { useEffect, useState } from 'react';
import s from './Preview.module.scss';

interface IProps {
  files: FileList | [],
  deletePreview?: (fileIndex: number) => void,
  mediaUrl?: string,
}
export default function Preview({
  files,
  deletePreview,
  mediaUrl,
}: IProps) {
  const [images, setImages] = useState<{src: string | undefined; name:string}[]>([]);
  
  if (!files?.length) {
    return null;
  }
  
  const getBase64 = async (f: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  useEffect(() => {
    (async () => {
      const contents = await Promise.all(
        Array.from(files)
          .map((file) => getBase64(file).then(src => ({src: src as string, name: file.name}))));
    setImages(contents);      
    })()
  }, [files])
  
  return (
    <div className={s.wrapper}>
      {Array.from(images).map(({src, name}, i) => (
        <div key={i} className={s.preview}>
          <div className={s.container__previewOverlay}>
            {deletePreview && (
              <div className={s.delete} onClick={() => { deletePreview(i); }}>
                ❌ Удалить
              </div>
            )}
          </div>
          <img
            className={s.previewImage}
            src={src}
            alt={name}
          />
        </div>
      ))}
    </div>
  );
}
