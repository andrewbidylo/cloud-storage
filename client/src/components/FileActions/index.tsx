import React from "react"
import styles from "./FileActions.module.scss"
import { Button, Popconfirm } from "antd"

interface FileActionsProps {
  onClickRemove: VoidFunction
  onClickShare: VoidFunction
  onClickDelete:VoidFunction
  imageUrl:string
  isActiveRemove: boolean
  isActiveShare:boolean
  withRemove?:boolean
}

export const FileActions: React.FC<FileActionsProps> = ({
  onClickRemove,
  onClickShare,
  onClickDelete,
  isActiveRemove,
  isActiveShare,
  withRemove,
  imageUrl,
  
}) => {
  return (
    <div className={styles.root}>
      {!withRemove ? 
      <>
      <Popconfirm
        title="Copy the link to the image?"
        description={imageUrl}
        okText="Copy"
        cancelText="No"
        disabled={!isActiveShare}
        onConfirm={onClickShare}
      >
      <Button disabled={!isActiveShare}>
        Share
      </Button>
      </Popconfirm>

      <Popconfirm
        title="Remove file(s)?"
        description="All files will be moved to trash"
        okText="Yes"
        cancelText="No"
        disabled={!isActiveRemove}
        onConfirm={onClickRemove}
      >
        <Button disabled={!isActiveRemove} type="primary" danger>
          Remove
        </Button>
      </Popconfirm>
      </>
      : 
      <Popconfirm
      title="Remove the file permanently?"
      okText="Yes"
      cancelText="No"
      disabled={!isActiveShare}
      onConfirm={onClickDelete}
    >
    <Button disabled={!isActiveShare}>
      Delete
    </Button>
    </Popconfirm>
      }
      
    </div>
  )
}