import EditComment from './EditComment'
const PostComments = (props) => {
  const { post, setPostResponse, userData } = props

  return post.postComments.map((comment, index) => {
    return (
      <EditComment
        post={post}
        comment={comment}
        key={index}
        setPostResponse={setPostResponse}
        userData={userData}
      />
    )
  })
}

export default PostComments
