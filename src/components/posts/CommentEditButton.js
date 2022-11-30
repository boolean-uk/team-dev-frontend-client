export default function CommentEditButton() {
  const editButtonClicked = () => {
    console.log('Edit button has been clicked!')
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
