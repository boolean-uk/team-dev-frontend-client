export default function Comment({ comment }) {
  return (
    <section className="comments-container">
      <div className="comment-profile-img-container">
        <div className="comment-profile-img">
          {comment.profile.firstName[0] || ''}
          {comment.profile.lastName[0] || ''}
        </div>
      </div>
      <article className="comment-text">{comment.content}</article>
      <div className="comment-edit-container">
        <div className="comment-edit-button">...</div>
      </div>
    </section>
  )
}
