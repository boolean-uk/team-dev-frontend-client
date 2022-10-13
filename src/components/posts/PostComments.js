const PostComments = (props) => {
  const { post } = props
  return post.postComments.map((comment) => {
    return (
      <li key={comment.id} className="comment">
        {comment.profile.firstName}: {comment.content}
        <button>Edit</button>
        <button>Delete</button>
      </li>
    )
  })
}

export default PostComments
