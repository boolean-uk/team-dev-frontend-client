const PostCommentsForm = (props) => {
  const { post, handleChange, handleSubmit } = props
  return (
    <form id={post.id} onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        name="comment"
        placeholder="Write something"
        onChange={(e) => handleChange(e)}
      />
      <button type="submit">Send</button>
    </form>
  )
}

export default PostCommentsForm
