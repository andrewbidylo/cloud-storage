import axios from "../core/axios"
import { FileItem } from "../types/files"

type FileType = "all" | "photos" | "trash"

export const getAll = async (type: FileType = "all"): Promise<FileItem[]> => {
  return (await axios.get("/files?type=" + type)).data
}

export const remove = (ids: number[]): Promise<void> => {
  return axios.patch("/files?ids=" + ids)
}
export const removePermanently = (ids: number[]): Promise<void> => {
  return axios.delete("/files?ids=" + ids)
}
type UploadOptions = {
  onSuccess: () => void;
  onError: (error: any) => void;
  file: File;
  onProgress: (progress: { percent: number }) => void;
};

export const uploadFile = async (options: UploadOptions): Promise<any>  => {
  const { onSuccess, onError, file, onProgress } = options

  const formData = new FormData()
  formData.append("file", file)

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
    onProgress: (event: ProgressEvent) => {
      onProgress({ percent: (event.loaded / event.total) * 100 })
    },
  }

  try {
    const { data } = await axios.post("files", formData, config)

    onSuccess()

    return data
  } catch (err) {
    onError({ err })
  }
};