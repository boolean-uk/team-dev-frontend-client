export default function CommentEditButton({ comment, loggedInUser }) {
  const editButtonClicked = () => {
    console.log(`Edit button has been clicked at comment number ${comment.id}`)
  }
  return (
    <div
      className="comment-edit-button"
      onClick={() => {
        editButtonClicked()
      }}
    >
      ...
    </div>
  )
}
