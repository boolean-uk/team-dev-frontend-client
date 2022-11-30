import Comment from './Comment'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import client from '../../utils/client'

export default function CommentsList({ post, loggedInUser }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    setComments(post.postComments)
  }, [post])

  const handleChange = (event) => {
    setNewComment(event.target.value)
  }

  const submitForm = (event) => {
    event.preventDefault()
    client
      .post('/posts/1/comment', { content: newComment })
      // CHANGE THE ABOVE NUMBER ACCORDING TO WHICH POST WE ARE ON WITH INTERPOLATION

      .then((result) => {
        setComments([...comments, result.data.data])
      })
    setNewComment('')
  }

  return (
    <>
      {/* Not sure how to implement see previous comments functionality yet /}
      <div className="previous-comments-container">
        <span className="previous-comments-link">See previous comments</span>
      </div>
      {/ Map through the actual comments state when we get there */}
      {comments ? (
        comments.map((comment, index) => {
          return (
            <Comment
              key={index}
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
          <div className="new-comment-user-img">
            {loggedInUser && (loggedInUser.firstName[0] || '')}
            {loggedInUser && (loggedInUser.lastName[0] || '')}
          </div>
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
