import { useState } from 'react'
import { useEffect } from 'react'
import client from '../../utils/client'

export default function PostLikes({ loggedInUser }) {
  const [likeCount, setLikeCount] = useState(0)
  const [likesArray, setLikesArray] = useState([])

  //  postId  6 => needs to changed to current postId using string interpolation
  useEffect(() => {
    client.get('/posts/postLike').then((data) => {
      const allLikes = data.data.data.postLikes
      const filterLikes = allLikes.filter((likeObject) => {
        if (likeObject.postId === 6 && likeObject.active === true) {
          return true
        }
      })
      setLikesArray(filterLikes)
    })
  }, [likesArray])

  // need to interpolate actual post id into this later
  const handleLikingPost = () => {
    client.post('/posts/6/postLike').then((data) => {
      const postLikeData = data.data.data
      const newPostLikesArray = [...likesArray, postLikeData]
      setLikesArray(newPostLikesArray)
    })
  }

  const handleUnLikingPost = (filterId) => {
    const dataToSend = {
      active: false,
      postLikeId: filterId.id
    }
    client.post('/posts/6/postLike', dataToSend).then((data) => {
      const removeLikeFromArray = likesArray.filter((likeObject) => {
        if (likeObject === filterId) {
          return false
        } else {
          return true
        }
      })
      const newPostLikesArray = [...removeLikeFromArray, data.data.data]
      setLikesArray(newPostLikesArray)
    })
  }

  const handleLikeButton = () => {
    const filterId = likesArray.filter((likeObject) => {
      if (likeObject.userId === loggedInUser.id) {
        return true
      }
    })
    if (filterId.length === 0) {
      return handleLikingPost()
    } else {
      handleUnLikingPost(filterId)
    }
  }

  return (
    <div className="like-container">
      <div className="like-icon" onClick={handleLikeButton}></div>
      <div className="like">Like</div>
      <div className="number-of-likes">{likesArray.length} likes</div>
    </div>
  )
}
