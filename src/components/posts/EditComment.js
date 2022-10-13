import { useState } from 'react'
import client from '../../utils/client'

const EditComment = (props) => {
  const [newComment, setNewComment] = useState({ content: '' })
  const [showEdit, setShowEdit] = useState(false)
  const { post, comment, setPostResponse } = props
  const submitEditedComment = (event) => {
    event.preventDefault()
    client
      .patch(`/post/${post.id}/comment/${comment.id}`, {
        content: newComment.content
      })
      .then((res) => {
        setPostResponse(res.data)
      })
    event.target.reset()
    setShowEdit(!showEdit)
  }
  return (
    <li key={comment.id} className="comment">
      {showEdit ? (
        <form onSubmit={(e) => submitEditedComment(e)}>
          <input
            defaultValue={comment.content}
            onChange={(e) =>
              setNewComment({ ...newComment, content: e.target.value })
            }
          />
          <button type="submit">Send</button>
        </form>
      ) : (
        <p key={comment.id}>
          {comment.profile.firstName}: {comment.content}
        </p>
      )}
      <button onClick={() => setShowEdit(!showEdit)}>Edit</button>
      <button>Delete</button>
    </li>
  )
}

export default EditComment
