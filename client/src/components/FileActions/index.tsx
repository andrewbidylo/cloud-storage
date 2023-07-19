import React from "react"
import styles from "./FileActions.module.scss"
import { Button, Popconfirm } from "antd"

interface FileActionsProps {
  onClickRemove: VoidFunction
  onClickShare: VoidFunction
  imageUrl:string
  isActive: boolean
}

export const FileActions: React.FC<FileActionsProps> = ({
  onClickRemove,
  onClickShare,
  isActive,
  imageUrl,
}) => {
  return (
    <div className={styles.root}>

      <Popconfirm
        title="Copy the link to the image?"
        description={imageUrl}
        okText="Copy"
        cancelText="No"
        disabled={!isActive}
        onConfirm={onClickShare}
      >
      <Button disabled={!isActive}>
        Share
      </Button>
      </Popconfirm>

      <Popconfirm
        title="Remove file(s)?"
        description="All files will be moved to trash"
        okText="Yes"
        cancelText="No"
        disabled={!isActive}
        onConfirm={onClickRemove}
      >
        <Button disabled={!isActive} type="primary" danger>
          Remove
        </Button>
      </Popconfirm>
    </div>
  )
}