import { useState } from 'react'

export default function CommentEditButton({
  commentEditMode,
  setCommentEditMode,
  deleteCommentFunction
}) {
  const [showEditandDelete, setShowEditandDelete] = useState(false)
  const [ShowDeleteYesOrNo, setShowDeleteYesOrNo] = useState(false)

  const editButtonClicked = () => {
    setShowEditandDelete(!showEditandDelete)
    if (ShowDeleteYesOrNo) {
      setShowDeleteYesOrNo(false)
    }
  }

  const commentEditFunction = () => {
    setCommentEditMode(!commentEditMode)
  }

  const commentDeleteFunction = () => {
    setShowEditandDelete(false)
    setShowDeleteYesOrNo(true)
  }

  return (
    <>
      <div
        className="comment-edit-button"
        onClick={() => {
          editButtonClicked()
        }}
      >
        ...
      </div>
      {showEditandDelete && (
        <>
          <div
            className="editButton"
            onClick={() => {
              commentEditFunction()
            }}
          >
            edit
          </div>
          <div
            className="deleteButton"
            onClick={() => {
              commentDeleteFunction()
            }}
          >
            delete
          </div>
        </>
      )}
      {ShowDeleteYesOrNo && (
        <>
          <div className="are-you-sure">Are you sure? </div>
          <div
            className="editButton"
            onClick={() => {
              deleteCommentFunction()
            }}
          >
            yes
          </div>
          <div
            className="deleteButton"
            onClick={() => {
              setShowEditandDelete(true)
              setShowDeleteYesOrNo(false)
            }}
          >
            no
          </div>
        </>
      )}
    </>
  )
}
