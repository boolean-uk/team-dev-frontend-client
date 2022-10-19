import { useState } from 'react'
import PostComments from './PostComments'
import PostCommentsForm from './PostCommentsForm'
import client from '../../utils/client'
import { useEffect } from 'react'

const Post = (props) => {
  const { post, setPostResponse, index, userData } = props
  const [addComment, setAddComment] = useState(false)
  const [comment, setComment] = useState({})
  const [likes, setLikes] = useState(post.postLikes)
  const [likesCount, setLikesCount] = useState(0)
  const [likedItem, setLikedItem] = useState(null)

  // console.log('post is', post)
  // console.log('post.postLikes is', post.postLikes)
  // console.log('likes is', likes)
  // console.log('post.postLikes.length is', post.postLikes.length)

  useEffect(() => {
    if (likes.length > 0) {
      likes.forEach((item) => {
        if (item.userId === userData.id) {
          setLikedItem(item)
        }
        // console.log('useEffect was called', likesCount)
      })
    }
    likeCounter()
  }, [])

  function likePost() {
    const url = `/post/${post.id}/postLike`
    const data = {
      active: true,
      postLikeId: likedItem.id
    }
    client.post(url, data).then((res) => {
      setLikes(res.data.data)
      setLikesCount(likesCount + 1)
      const myLikeItem = { ...likedItem, active: true }
      setLikedItem(myLikeItem)
    })
  }

  function firstLikePost() {
    const url = `/post/${post.id}/postLike`
    const data = {
      active: true
    }
    client.post(url, data).then((res) => {
      setLikes(res.data.data)
      setLikesCount(likesCount + 1)
      console.log('res.data.data is:', res.data.data)
      const myLikeItem = res.data.data
      setLikedItem(myLikeItem)
    })
  }

  function removeLike() {
    const url = `/post/${post.id}/postLike`
    console.log('likedItem.id is:', likedItem.id)
    const data = {
      active: false,
      postLikeId: likedItem.id
    }
    client.post(url, data).then((res) => {
      setLikes(res.data.data)
      setLikesCount(likesCount - 1)
      const myLikeItem = { ...likedItem, active: false }
      setLikedItem(myLikeItem)
    })
  }

  const handleClick = () => {
    if (likedItem) {
      if (likedItem.active) {
        // console.log('like is active and will get removed from: ', item)
        removeLike()
        // console.log('removed like: ', post.postLikes)
        return
        // console.log('active is true')
      } else {
        // console.log('like is not active and will get activated from: ', item)
        likePost()
        // console.log('added like: ', post.postLikes)
        return
      }
    } else {
      // console.log('found nothing, add a like')
      firstLikePost()
      // console.log(post.postLikes)
    }
  }

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

  function likeCounter() {
    let newCounter = 0
    if (likes.length) {
      likes.forEach((item) => {
        if (item.active) {
          newCounter++
        }
      })
    }
    setLikesCount(newCounter)
  }

  function likeStyleCheck() {
    console.log('function triggered 1')
    if (likedItem && likedItem.active) {
      console.log('function triggered 2')
      return 'like-blue'
    }
  }

  return (
    <li className="post-item">
      <div className="post-item-user">
        {`${post.user.profile.firstName} ${post.user.profile.lastName} says:`}
      </div>
      <div className="post-item-content">{post.content}</div>
      <div className="post-item-buttons" key={index}>
        <button className={`${likeStyleCheck()}`} onClick={handleClick}>
          <span>{`Like | ${likesCount}`}</span>
        </button>

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
          <></>
        )}
      </div>
      <ul className="comments">
        <PostComments
          userData={userData}
          post={post}
          setPostResponse={setPostResponse}
        />
      </ul>
    </li>
  )
}

export default Post
