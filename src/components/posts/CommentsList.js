import Comment from './Comment'
import { useState, useEffect } from 'react'

export default function CommentsList({ post }) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    console.log('post in CommentsList is:', post)
    setComments(post.postComments)
  }, [post])

  // console.log('comments in CommentsList is after setting stuff:', comments)

  return (
    <>
      {/* Not sure how to implement see previous comments functionality yet /}
      <div className="previous-comments-container">
        <span className="previous-comments-link">See previous comments</span>
      </div>
      {/ Map through the actual comments state when we get there */}
      {/* {comments ? getCommentsComponent() : <div>Hello</div>} */}
      {comments ? (
        comments.map((comment, index) => {
          console.log('Comment inside map is', comment)
          return <Comment key={index} comment={comment} />
        })
      ) : (
        <div>This doesn't exist</div>
      )}
    </>
  )
}
