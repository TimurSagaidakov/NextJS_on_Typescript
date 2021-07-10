import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import writeAvatarUrl from "../../modules/post/writeAvatarUrl";
import { TAppState } from "../../redux/redux-store";
import { updateImage } from "../../redux/userReducer";
import FileUploader from '../componentsUI/FileUploader/FileUploader';

export const Hero: React.FC<{ title: string }> = ({ title }) => {
  const [media, setMedia] = useState<FileList | []>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [responseDownload, setResponseDownload] = useState<string>('');
  const dispatch = useDispatch();
  const userId = useSelector((state: TAppState) => state.userData.id);
  const imageUpload = async () => {
    try {
      setUploading(true);
      const response = await writeAvatarUrl(media,userId);
      setResponseDownload(response.message);
      if (response.url) {
        dispatch(updateImage(response.url));
        setMedia([]);
      }
    } catch (e) {
      setResponseDownload(e.message);
    } finally {
      setUploading(false);
    }
  }
  
  return (
    <div>
      {responseDownload ? responseDownload : ''}
      <button onClick={imageUpload}>Загрузить фото</button>
      <FileUploader files={media} setFilesState={setMedia} uploadButtonText='Загрузите аватар' uploading={uploading} />
    </div>
  )
}