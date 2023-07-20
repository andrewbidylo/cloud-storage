import React from "react"
import { FileItem } from "../types/files"
import { FileActions } from "../components/FileActions"
import { FileList, FileSelectType } from "../components/FileList"
import { Empty } from "antd"

import * as Api from "../api"

interface FilesProps {
  items: FileItem[]
  withActions?: boolean
  withRemove?: boolean
}

export const Files: React.FC<FilesProps> = ({ items, withActions, withRemove }) => {
  const [files, setFiles] = React.useState(items || [])
  const [selectedIds, setSelectedIds] = React.useState<number[]>([])

  const onFileSelect = (id: number, type: FileSelectType) => {
    if (type === "select") {
      setSelectedIds((prev) => [...prev, id])
    } else {
      setSelectedIds((prev) => prev.filter((_id) => _id !== id))
    }
  }

  const onClickRemove = () => {
    setSelectedIds([])
    setFiles((prev) => prev.filter((file) => !selectedIds.includes(file.id)))
    Api.files.remove(selectedIds)
  }

  const onClickDelete = () => {
    setSelectedIds([])
    setFiles((prev) => prev.filter((file) => !selectedIds.includes(file.id)))
    Api.files.removePermanently(selectedIds)
  }

  let imageUrl = ""
  if (files[0]) {
    imageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/` + files[0].filename
  }
  const onClickShare = () => {
    if (files[0].filename) {
      navigator.clipboard.writeText(imageUrl)
    }
  }

  return (
    <div>
      {files.length ? (
        <>
          {withActions && (
            <FileActions
              onClickRemove={onClickRemove}
              onClickShare={onClickShare}
              onClickDelete={onClickDelete}
              isActiveRemove={selectedIds.length > 0}
              isActiveShare={selectedIds.length === 1}
              withRemove={withRemove}
              imageUrl={imageUrl}
            />
          )}
          <FileList items={files} onFileSelect={onFileSelect} />
        </>
      ) : (
        <Empty className="empty-block" description="No files found" />
      )}
    </div>
  )
}