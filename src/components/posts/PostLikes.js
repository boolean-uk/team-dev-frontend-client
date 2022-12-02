import { useState } from 'react'
import { useEffect } from 'react'
import client from '../../utils/client'

export default function PostLikes() {
  const [likeCount, setLikeCount] = useState(0)

  // currently only checking likes on postId  6
  // 6 needs to changed to current postId using string interpolation
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
  }, [])
  //  ^ not sure what the use Effect should be refreshed on yet
  //   this useEffect is used to display like count

  // need to interpolate acc post id into this later
  const LikeandUnlikingPost = () => {
    client.post('/posts/6/postLike').then((data) => {
      const postLikeData = data.data.data
      if (postLikeData.active === false) {
        return true
      }
    })
  }

  //  both liking and unliking in one big fucntion with 1 if statement that checks wether like is active or not => POST

  //  LIKING A POST:
  //   need to map through the post object and check for its active status
  //   create function to use in  onClick that sends POST request when heart icon is clicked
  //   request must be sent to posts/{postId}/postLikes { for now postId = 6}

  //   UN-LIKING A POST:
  //   else
  //    if statements => not active

  return (
    <div className="like-container">
      <div className="like-icon" onClick={LikeandUnlikingPost}></div>
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

// onle needs one else to capture all unlikes
// unlike will also be a POST not sure about the code in the slightest
// will need some check???
