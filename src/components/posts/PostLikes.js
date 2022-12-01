import { useState } from 'react'
import { useEffect } from 'react'
import client from '../../utils/client'

// NameClass for a toggle function that works with css to make like button blue will also need to be pressnt in the jsx
// {need to go over toggling and conditional rendering}

// need to create a get request to the API to fetch the list of likes on post already
// do I need to do that or is this a static post so it doesnt exist in api???
// use a check box to show wether the like button is pressed and use toggle to have checked or unchceked

export default function PostLikes() {
  const [likeCount, setLikeCount] = useState(0)

  const handleLike = () => {
    console.log('this was clicked!')
  }

  // currently only checking likes on postId  6
  //   6 needs to changed to current postId using string interpolation
  useEffect(() => {
    client.get('/posts/postLike').then((data) => {
      const allLikes = data.data.data.postLikes
      console.log(data)
      const filterLikes = allLikes.filter((likeObject) => {
        if (likeObject.postId === 6 && likeObject.active === true) {
          return true
        }
      })
      setLikeCount(filterLikes.length)
    })
  }, [])

  //   need to get the click
  return (
    <div className="like-container">
      <div className="like-icon" onClick={handleLike}></div>
      <div className="like">Like</div>
      <div className="number-of-likes">{likeCount} likes</div>
    </div>
  )
}
