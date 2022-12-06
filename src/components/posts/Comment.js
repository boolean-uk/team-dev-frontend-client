import CommentEditButton from './CommentEditButton'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import client from '../../utils/client'
import InitialsBox from '../InitialsBox/InitialsBox'
export default function Comment({
  comment,
  setComment,
  loggedInUser,
  comments,
  setComments
}) {
  const [commentEditMode, setCommentEditMode] = useState(false)
  const [commentBeingEdited, setCommentBeingEdited] = useState(comment.content)
  const [currentComment, setCurrentComment] = useState(comment)

  const displayEditButton = () => {
    if (
      loggedInUser &&
      (loggedInUser.role === 'TEACHER' || loggedInUser.id === comment.userId)
    ) {
      return (
        <CommentEditButton
          comment={comment}
          loggedInUser={loggedInUser}
          commentEditMode={commentEditMode}
          setCommentEditMode={setCommentEditMode}
          deleteCommentFunction={deleteCommentFunction}
        />
      )
    }
  }

  const deleteCommentFunction = () => {
    client.delete(`/posts/${comment.postId}/comment/${comment.id}`)
    const commentsWithoutRemoved = comments.filter((filterComment) => {
      return filterComment !== comment
    })
    setComments(commentsWithoutRemoved)
  }

  const handleChange = (event) => {
    setCommentBeingEdited(event.target.value)
  }

  const submitForm = (event) => {
    event.preventDefault()
    client.patch(`/posts/${comment.postId}/comment/${comment.id}`, {
      content: commentBeingEdited
    })
    setCommentEditMode(false)
    setCurrentComment({ ...currentComment, content: commentBeingEdited })
  }

  return (
    <section className="comments-container">
      <div className="comment-profile-img-container">
        <div className="comment-profile-img">
          <InitialsBox />
        </div>
      </div>
      {commentEditMode === false && (
        <article className="comment-text">{currentComment.content}</article>
      )}
      {commentEditMode === true && (
        <form className="comment-edit-form" onSubmit={submitForm}>
          <TextField
            className="comment-edit-input"
            type="text"
            variant="outlined"
            name="content"
            onChange={handleChange}
            value={commentBeingEdited}
          />
          <Button
            type="submit"
            variant="contained"
            className="edit-comment-form-button"
          >
            Edit
          </Button>
        </form>
      )}
      <div className="comment-edit-container">{displayEditButton()}</div>
    </section>
  )
}
