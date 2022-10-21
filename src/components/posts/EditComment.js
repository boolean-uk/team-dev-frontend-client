import { useState, useEffect } from 'react'
import client from '../../utils/client'

const EditComment = (props) => {
  const [newComment, setNewComment] = useState({ content: '' })
  const [showEdit, setShowEdit] = useState(false)
  const { post, comment, setPostResponse, userData } = props
  const [commentLikesCount, setCommentLikesCount] = useState(0)
  const [likedCommentItem, setLikedCommentItem] = useState(null)
  const [commentLikes, setCommentLikes] = useState(comment.likes)

  useEffect(() => {
    if (commentLikes.length > 0) {
      commentLikes.forEach((item) => {
        if (item.userId === userData.id) {
          setLikedCommentItem(item)
        }
      })
    }
    likeCommentCounter()
  }, [])

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

  /*

  function likeComment() {
    const url = `/post/${post.id}/comment/${comment.id}/commentLike`
    const data = {
      active: true,
      commentLikeId: likedCommentItem.commentId
    }
    client.post(url, data).then((res) => {})
  }

  function removeLikeComment() {
    const url = `/post/${post.id}/comment/${comment.id}/commentLike`
    const data = {
      active: false,
      commentLikeId: likedCommentItem.commentId
    }
    client.post(url, data).then((res) => {
      console.log('deleted comment')
    })
  }
*/
  function firstLikeComment() {
    const url = `/post/${post.id}/comment/${comment.id}/commentLike`
    const data = {
      active: true
    }
    client.post(url, data).then((res) => {
      setCommentLikes(res.data.data)
      setCommentLikesCount(commentLikesCount + 1)
      const myLikeItem = res.data.data
      setLikedCommentItem(myLikeItem)
    })
  }

  const handleClick = () => {
    if (likedCommentItem) {
      if (likedCommentItem.active) {
        // console.log('I will delete this', likedCommentItem)
        // removeLikeComment()
        return
      } else {
        // console.log('I will add this')
        // likeComment()
        return
      }
    } else {
      firstLikeComment()
    }
  }

  function likeCommentCounter() {
    let newCounter = 0
    if (commentLikes) {
      commentLikes.forEach((item) => {
        if (item.active) {
          newCounter++
        }
      })
    }
    setCommentLikesCount(newCounter)
  }

  function likeStyleCheck() {
    if (likedCommentItem && likedCommentItem.active) {
      return 'like-blue'
    }
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
      <button className={`${likeStyleCheck()}`} onClick={handleClick}>
        <span>{`Like | ${commentLikesCount}`}</span>
      </button>
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
