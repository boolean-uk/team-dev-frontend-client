import Comment from './Comment'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import client from '../../utils/client'

export default function CommentsList({ post, loggedInUser }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [hideComments, setHideComments] = useState(false)
  const [showMoreThanFiveComments, setShowMoreThanFiveComments] =
    useState(false)
  const [hiddenComments, setHiddenComments] = useState([])

  useEffect(() => {
    checkMoreThanFiveComments(post.postComments)
  }, [post])

  const handleChange = (event) => {
    setNewComment(event.target.value)
  }

  const submitForm = (event) => {
    event.preventDefault()
    client
      .post(`/posts/${post.id}/comment`, { content: newComment })
      .then((result) => {
        checkMoreThanFiveComments([...comments, result.data.data])
      })
    setNewComment('')
  }
  const checkMoreThanFiveComments = (arr) => {
    if (arr.length > 4) {
      const filteredComments = arr.filter(
        (comment, index) => index > arr.length - 6
      )
      setHiddenComments(arr)
      setComments(filteredComments)
      setHideComments(true)
    } else {
      setComments(arr)
    }
  }
  const showComments = () => {
    setHideComments(false)
    setComments(hiddenComments)
    setShowMoreThanFiveComments(true)
  }
  const showHiddenComments = () => {
    checkMoreThanFiveComments(hiddenComments)
    setShowMoreThanFiveComments(false)
  }

  return (
    <>
      {hideComments && (
        <div className="previous-comments-container">
          <span className="previous-comments-link" onClick={showComments}>
            See previous comments
          </span>
        </div>
      )}
      {showMoreThanFiveComments && (
        <div className="previous-comments-container">
          <span className="previous-comments-link" onClick={showHiddenComments}>
            Hide comments
          </span>
        </div>
      )}
      {comments ? (
        comments.map((comment, index) => {
          return (
            <Comment
              key={index}
              comments={comments}
              setComments={setComments}
              comment={comment}
              loggedInUser={loggedInUser}
            />
          )
        })
      ) : (
        <div>This doesn't exist</div>
      )}
      <div className="add-new-comment-container">
        <div className="new-comment-user-img-container">
          <div className="new-comment-user-img"></div>
        </div>
        <form className="post-form" onSubmit={submitForm}>
          <TextField
            className="user-form-input"
            type="text"
            label="Add a comment..."
            variant="outlined"
            name="content"
            onChange={handleChange}
            value={newComment}
          />
          <Button type="submit" variant="contained">
            Comment
          </Button>
        </form>
      </div>
    </>
  )
}
