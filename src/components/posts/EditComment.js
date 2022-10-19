import { useState } from 'react'
import client from '../../utils/client'

const EditComment = (props) => {
  const [newComment, setNewComment] = useState({ content: '' })
  const [showEdit, setShowEdit] = useState(false)
  const { post, comment, setPostResponse, userData } = props
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

  const deleteComment = () => {
    client.delete(`/post/${post.id}/comment/${comment.id}`).then((res) => {
      setPostResponse(res.data)
    })
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
        <>
          <span className="comment-user-name">
            {comment.profile.firstName}:{' '}
          </span>
          <span>{comment.content}</span>
        </>
      )}
      <button>Like</button>
      {comment.profile.id === userData.id || userData.role === 'TEACHER' ? (
        <>
          <button onClick={() => setShowEdit(!showEdit)}>Edit</button>
          <button onClick={() => deleteComment()}>Delete</button>
        </>
      ) : (
        <></>
      )}
    </li>
  )
}

export default EditComment
