import { useState } from 'react'
import { useEffect } from 'react'
import client from '../../utils/client'

export default function PostLikes() {
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
    client.post('/posts/6/postLike').then((data) => {
      const postLikeData = data.data.data
      if (postLikeData.active === false) {
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

// press on like
// get all like data for specific post
// use if statement that checks if active === false
// return true
// need to make sure fucntion is being called in the onClick
// i am guessing once I have made it true then it should just like the post???
// need to check live server to see if it works

// only needs one else to capture all unlikes
// unlike will also be a POST not sure about the code in the slightest
// will need some check???
