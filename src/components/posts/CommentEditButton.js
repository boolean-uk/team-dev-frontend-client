import { useState } from 'react'

export default function CommentEditButton({ comment, loggedInUser }) {
  const [showEditandDelete, setShowEditandDelete] = useState(false)

  const editButtonClicked = () => {
    console.log(`Edit button has been clicked at comment number ${comment.id}`)
    setShowEditandDelete(!showEditandDelete)
    console.log(showEditandDelete)
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
          <div className="editButton">edit</div>
          <div className="deleteButton">delete</div>
        </>
      )}
    </>
  )
}
