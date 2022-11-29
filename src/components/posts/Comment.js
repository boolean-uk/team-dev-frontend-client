export default function Comment({ comment }) {
  return (
    <section className="comments-container">
      <div className="comment-profile-img-container">
        <div className="comment-profile-img">SF</div>
      </div>
      <article className="comment-text">
        Hi, this is comment number #{comment}. Yay!
      </article>
      <div className="comment-edit-container">
        <div className="comment-edit-button">...</div>
      </div>
    </section>
  )
}
