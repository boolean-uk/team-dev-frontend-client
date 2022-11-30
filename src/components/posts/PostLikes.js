// This is where the component for liking will live
// A function called PostLikes => no props at this moment
// Need to take the whole jsx section for likes
// The return () for this function will contain jsx of like button + interpolate values of likes
// NameClass for a toggle function that works with css to make like button blue will also need to be pressnt in the jsx
// {need to go over toggling and conditional rendering}

// need to export the function to PostPages.js + call it in the right place
// This will make me cry

export default function PostLikes() {
  return (
    <div className="like-container">
      <div className="like-icon"></div>
      <div className="like">Like</div>
    </div>
  )
}
