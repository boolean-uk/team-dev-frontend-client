import { useState } from 'react'
import PostComments from './PostComments'
import PostCommentsForm from './PostCommentsForm'
import client from '../../utils/client'

const Post = (props) => {
  const [addComment, setAddComment] = useState(false)
  const [comment, setComment] = useState({})
  const [editedPost, setEditedPost] = useState({ content: '' })
  const [showEditPost, setShowEditPost] = useState(false)

  const { post, setPostResponse, index, userData } = props
  const handleChange = (event) => {
    event.preventDefault()
    const { value, name } = event.target
    setComment({
      ...comment,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    client
      .post(
        `/post/${post.id}/comment/`,
        {
          content: comment.comment
        },
        true
      )
      .then((res) => {
        setPostResponse(res.data)
      })
      .catch((data) => {
        console.log(data)
      })
    event.target.reset()
  }

  const submitEditedPost = (event) => {
    event.preventDefault()
    client
      .patch(`/post/${post.id}`, {
        content: editedPost.content
      })
      .then((res) => {
        setPostResponse(res.data)
      })
    setShowEditPost(!editedPost)
  }

  const deletePost = () => {
    if (post.user.role === 'TEACHER' && post.user.id !== userData.id) {
      return
    }
    client.delete(`/post/${post.id}`).then((res) => {
      setPostResponse(res.data)
    })
  }

  return (
    <li className="post-item">
      <div className="post-item-content">
        <p className="comment-author">
          {`${post.user.profile.firstName} ${post.user.profile.lastName} says:`}
        </p>
        {showEditPost ? (
          <form onSubmit={(e) => submitEditedPost(e)}>
            <input
              defaultValue={post.content}
              onChange={(e) =>
                setEditedPost({ ...editedPost, content: e.target.value })
              }
            />
            <button type="submit">Send</button>
          </form>
        ) : (
          <div className="post-item-description">{post.content}</div>
        )}

        <div className="post-item-buttons" key={index}>
          <button>Like</button>
          <button
            id={post.id}
            onClick={(e) =>
              Number(e.target.id) === Number(post.id)
                ? setAddComment(!addComment)
                : e
            }
          >
            Comment
          </button>
          {addComment ? (
            <PostCommentsForm
              post={post}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          ) : (
            addComment
          )}
          {userData.role === 'TEACHER' || post.user.id === userData.id ? (
            <>
              <button onClick={() => setShowEditPost(!showEditPost)}>
                Edit
              </button>
              <button onClick={() => deletePost()}>Delete</button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <PostComments
        userData={userData}
        post={post}
        setPostResponse={setPostResponse}
      />
      {/* </ul> */}
    </li>
  )
}

export default Post
