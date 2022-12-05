import { useState } from 'react'
import { useEffect } from 'react'
import client from '../../utils/client'

export default function PostLikes({ loggedInUser }) {
  const [likeCount, setLikeCount] = useState(0)
  // currently only checking likes on postId  6 => needs to changed to current postId using string interpolation
  useEffect(() => {
    client.get('/posts/postLike').then((data) => {
      const allLikes = data.data.data.postLikes
      const filterLikes = allLikes.filter((likeObject) => {
        if (likeObject.postId === 6 && likeObject.active === true) {
          return true
        }
      })
      setLikeCount(filterLikes.length)
    })
  }, [likeCount])

  // need to interpolate actual post id into this later
  const handleLikingPost = () => {
    client
      .post('/posts/6/postLike')
      .then((data) => {
        const postLikeData = data.data.data
        const postIsNotLiked = postLikeData.active === false
        if (postIsNotLiked) {
          return true
        }
      })
      .then((updatedPostLikeData) => setLikeCount(updatedPostLikeData))
  }

  const handleUnLikingPost = () => {
    client.post('/posts/6/postLike').then((data) => {
      const postLikeData = data.data.data
      const postIsLiked = postLikeData.active === true
      if (postIsLiked) {
        return console.log('I WILL UNLIKE POST SOON')
      }
    })
  }

  const handleLikeButton = () => {
    client.get('/posts/postLike').then((data) => {
      const postLikeData = data.data.data.postLikes
      const filterLikes = postLikeData.filter((likeObject) => {
        if (likeObject.postId === 6 && likeObject.active === true) {
          return true
        }
      })
      const filterId = filterLikes.filter((likeObject) => {
        if (likeObject.userId === loggedInUser.id) {
          return true
        }
      })
      if (filterId.length === 0) {
        return handleLikingPost()
      } else {
        handleUnLikingPost()
      }
    })
  }

  return (
    <div className="like-container">
      <div className="like-icon" onClick={handleLikeButton}></div>
      <div className="like">Like</div>
      <div className="number-of-likes">{likeCount} likes</div>
    </div>
  )
}

// // need to use a patch request to unlike post
// const handleUnLikingPost = () => {
//       const postLikeData = data.data.data
//   client
//     .patch('/posts/6/postLike', { ...postLikeData, active: false })
//     })
//     .then((updatedData) => setLikeCount(updatedData))
// }

// need to make ll data and get request globally available
