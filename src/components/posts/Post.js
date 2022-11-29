import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const Post = ({ handleChange, post, loggedInUser }) => {
  const firstName = post.user.profile.firstName
  const lastName = post.user.profile.lastName
  const loggedInFirstName = loggedInUser.firstName
  const loggedInLastName = loggedInUser.lastName

  return (
    <>
      <section className="single-post">
        <div className="single-post-header">
          <div className="single-post-author-img-container">
            <div className="single-post-author-img">
              <img
                src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&color=fff&rounded=true`}
                alt="avatar"
                height="50px"
              ></img>
            </div>
          </div>
          <div className="name-and-date-container">
            <div className="single-post-name">
              {firstName} {lastName}
            </div>
            <div className="single-post-date">{post.createdAt}</div>
          </div>
          <div className="single-post-edit-container">
            <div className="single-post-edit">...</div>
          </div>
        </div>
        <article className="single-post-content"> {post.content}</article>
        <div className="like-and-comment-container">
          <div className="like-container">
            <div className="like-icon"></div>
            <div className="like">Like</div>
          </div>
          <div className="comment-container">
            <div className="comment-icon"></div>
            <div className="comment">Comment</div>
          </div>
          <div className="placeholder"></div>
          <div className="numberOfLikes">Be the first to like this</div>
        </div>
        <div className="add-new-comment-container">
          <div className="new-comment-user-img-container">
            <div className="new-comment-user-img">
              <img
                src={`https://ui-avatars.com/api/?name=${loggedInFirstName}+${loggedInLastName}&background=random&color=fff&rounded=true`}
                alt="avatar"
                height="50px"
              ></img>
            </div>
          </div>
          <form className="post-form">
            <TextField
              className="user-form-input"
              type="text"
              label="Add a comment..."
              variant="outlined"
              name="content"
              onChange={handleChange}
            />
            <Button type="submit" variant="contained">
              Comment
            </Button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Post
