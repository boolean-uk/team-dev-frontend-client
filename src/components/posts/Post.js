import { useState } from 'react'
import PostComments from './PostComments'
import PostCommentsForm from './PostCommentsForm'
import client from '../../utils/client'
//import { PopperUnstyled } from '@mui/base'

const Post = (props) => {
  const [addComment, setAddComment] = useState(false)
  const [comment, setComment] = useState({})
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

  return (
    <li className="post-item">
      <div className="post-item-user">
        {`${post.user.profile.firstName} ${post.user.profile.lastName} says:`}
      </div>
      <div className="post-item-content">{post.content}</div>
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
        {userData.role === 'TEACHER' ? (
          <>
            <button>Edit</button>
            <button>Delete</button>
          </>
        ) : (
          userData
        )}
      </div>
      <ul className="comments">
        <PostComments post={post} />
      </ul>
    </li>
  )
}

export default Post
