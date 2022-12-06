import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Edit from './images/edit.svg'
import Delete from './images/delete.svg'
import { useState } from 'react'
import { format, parseISO, isYesterday } from 'date-fns'
import CommentsList from './CommentsList'
import PostLikes from './PostLikes'

const Post = ({ post, loggedInUser, client, setPosts, posts, setErr }) => {
  const [beingEdited, setBeingEdited] = useState(null)
  const [editValue, setEditValue] = useState(post.content)
  if (!post.user) {
    return <></>
  }
  const firstName = post.user.profile.firstName
  const lastName = post.user.profile.lastName
  const canEditOrDelete =
    (loggedInUser !== null && loggedInUser.role === 'TEACHER') ||
    loggedInUser.id === post.user.id

  const deletePost = async (event) => {
    event.preventDefault()
    client.delete(`/posts/${post.id}`).then((res) => {
      setPosts(posts.filter((storedPost) => storedPost.id !== post.id))
    })
  }
  const editPost = async (event) => {
    event.preventDefault()
    setBeingEdited(!beingEdited)
  }
  const handleChange = (event) => {
    event.preventDefault()
    setEditValue(event.target.value)
  }
  const submitEdit = async (event) => {
    event.preventDefault()
    client
      .patch(`/posts/${post.id}`, { content: editValue })
      .then((res) => {
        post.content = res.data.data.content
        setBeingEdited(!beingEdited)
      })
      .catch((err) => {
        console.error(err.message)
        setErr(err.message)
      })
  }
  const computePostDateAndTimeString = () => {
    const today = format(new Date(), 'MMMM d')
    const postDay = format(parseISO(post.createdAt), 'MMMM d')
    const createdYesterday = isYesterday(today)
    const postTime = format(parseISO(post.createdAt), 'h:mm a')
    let date = format(parseISO(post.createdAt), 'MMMM d, yyyy h:mm a')
    if (today === postDay) {
      date = `today @ ${postTime}`
    }
    if (createdYesterday === true) {
      date = `yesterday @ ${postTime}`
    }
    return date
  }

  return (
    <>
      <section className="single-post">
        <div className="single-post-header">
          <div className="single-post-author-img-container">
            <div className="single-post-author-img">
              <img
                src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&color=fff&rounded=true`}
                alt="avatar"
                height="50px"
              ></img>
            </div>
          </div>
          <div className="name-and-date-container">
            <div className="single-post-name">
              {firstName} {lastName}
            </div>
            <div className="single-post-date">
              {computePostDateAndTimeString()}
            </div>
          </div>
          <div className="single-post-edit-container">
            {canEditOrDelete && (
              <div className="single-post-edit">
                <img
                  onClick={editPost}
                  className="edit-delete-buttons"
                  src={Edit}
                  height="30px"
                  alt="edit button"
                />
                <img
                  onClick={deletePost}
                  className="edit-delete-buttons"
                  src={Delete}
                  height="30px"
                  alt="delete-button"
                />
              </div>
            )}
          </div>
        </div>
        {!beingEdited ? (
          <article className="single-post-content">{post.content}</article>
        ) : (
          <form className="post-form" onSubmit={submitEdit}>
            <TextField
              className="user-form-input"
              type="text"
              value={editValue}
              onChange={handleChange}
              multiline
              variant="outlined"
              name="content"
            />
            <Button type="submit" variant="contained">
              Submit Changes
            </Button>
          </form>
        )}
        <div>
          <PostLikes loggedInUser={loggedInUser} postId={post.id} />
          <div className="comment-container">
            <div className="comment-icon"></div>
            <div className="comment">Comment</div>
          </div>
          <div className="placeholder"></div>
          <div className="numberOfLikes">Be the first to like this</div>
        </div>
        {post && <CommentsList post={post} loggedInUser={loggedInUser} />}
      </section>
    </>
  )
}

export default Post
