import CommentEditButton from './CommentEditButton'

export default function Comment({ comment, loggedInUser }) {
  const displayEditButton = () => {
    if (loggedInUser.role === 'TEACHER' || loggedInUser.id === comment.userId) {
      return <CommentEditButton comment={comment} loggedInUser={loggedInUser} />
    }
  }

  return (
    <section className="comments-container">
      <div className="comment-profile-img-container">
        <div className="comment-profile-img">
          {comment.profile.firstName[0] || ''}
          {comment.profile.lastName[0] || ''}
        </div>
      </div>
      <article className="comment-text">{comment.content}</article>
      <div className="comment-edit-container">{displayEditButton()}</div>
    </section>
  )
}
