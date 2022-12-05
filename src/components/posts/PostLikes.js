import { useState } from 'react'
import { useEffect } from 'react'
import client from '../../utils/client'

export default function PostLikes({ loggedInUser }) {
  const [likesArray, setLikesArray] = useState([])

  //  postId  6 => needs to changed to current postId using string interpolation
  useEffect(() => {
    client.get('/posts/postLike').then((data) => {
      const allLikes = data.data.data.postLikes
      const filterLikes = allLikes.filter((likeObject) => {
        if (likeObject.postId === 3 && likeObject.active === true) {
          return true
        }
      })
      setLikesArray(filterLikes)
    })
  }, [likesArray])

  // need to interpolate actual post id into this later
  const handleLikingPost = () => {
    client.post('/posts/3/postLike').then((data) => {
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
    client.post('/posts/3/postLike', dataToSend).then((data) => {
      const removeLikeFromArray = likesArray.filter((likeObject) => {
        console.log('likeobject', likeObject)
        console.log('filter-id', filterId[0])
        if (likeObject.id === filterId[0].id) {
          return false
        } else {
          return true
        }
      })
      const newPostLikesArray = [...removeLikeFromArray, data.data.data]
      console.log('data', data)
      console.log('newPostLikesArray is', newPostLikesArray)
      setLikesArray(newPostLikesArray)
    })
  }

  const handleLikeButton = () => {
    const filterId = likesArray.filter((likeObject) => {
      if (likeObject.userId === loggedInUser.id && likeObject.active === true) {
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
