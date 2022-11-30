import Comment from './Comment'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function CommentsList({ post }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    console.log('post in CommentsList is:', post)
    setComments(post.postComments)
  }, [post])

  const handleChange = (event) => {
    event.preventDefault()
  }

  // console.log('comments in CommentsList is after setting stuff:', comments)

  return (
    <>
      {/* Not sure how to implement see previous comments functionality yet /}
      <div className="previous-comments-container">
        <span className="previous-comments-link">See previous comments</span>
      </div>
      {/ Map through the actual comments state when we get there */}
      {/* {comments ? getCommentsComponent() : <div>Hello</div>} */}
      {comments ? (
        comments.map((comment, index) => {
          console.log('Comment inside map is', comment)
          return <Comment key={index} comment={comment} />
        })
      ) : (
        <div>This doesn't exist</div>
      )}
      <div className="add-new-comment-container">
        <div className="new-comment-user-img-container">
          <div className="new-comment-user-img">FA</div>
        </div>
        <form className="post-form">
          <TextField
            className="user-form-input"
            type="text"
            label="Add a comment..."
            variant="outlined"
            name="content"
            onChange={handleChange}
          />
          <Button type="submit" variant="contained">
            Comment
          </Button>
        </form>
      </div>
    </>
  )
}
