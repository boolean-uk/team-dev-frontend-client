import EditComment from './EditComment'
const PostComments = (props) => {
  const { post, setPostResponse } = props

  return post.postComments.map((comment, index) => {
    return (
      <EditComment
        post={post}
        comment={comment}
        key={index}
        setPostResponse={setPostResponse}
      />
    )
  })
}

export default PostComments
