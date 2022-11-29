import Comment from './Comment'

export default function CommentsList() {
  // This is just a placeholder const,
  // should be deleted when adding functionality
  const comments = [1, 2, 3, 4, 5]
  return (
    <>
      {/* Not sure how to implement see previous comments functionality yet /}
      <div className="previous-comments-container">
        <span className="previous-comments-link">See previous comments</span>
      </div>
      {/ Map through the actual comments state when we get there */}
      {comments.map((comment, index) => {
        return <Comment comment={comment} key={index} />
      })}
    </>
  )
}
