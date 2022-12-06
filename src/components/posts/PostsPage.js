import { useState, useEffect } from 'react'
import PostForm from './PostForm'
import client from '../../utils/client'
import './style.css'
import CommentsList from './CommentsList'
import PostLikes from './PostLikes'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import Header from '../Header/Header'

const PostsPage = ({ loggedInUser }) => {
  const [post, setPost] = useState({ content: '' })
  const [postResponse, setPostResponse] = useState('')
  const [posts, setPosts] = useState([])
  const [value, setValue] = useState('')
  const [err, setErr] = useState('')
  const [helperText, setHelperText] = useState('')

  useEffect(() => {
    client.get('/posts').then((res) => setPosts(res.data.data.posts))
  }, [])

  const createPost = async (event) => {
    event.preventDefault()
    if (post.content.length > 0) {
      client
        .post('/posts', post)
        .then((res) => {
          console.log(res)
          setPostResponse(res.data)
        })
        .catch((err) => {
          console.log(err.message)
          setErr(err.message)
        })
      addPostToFeed(post)
      setValue('')
      setPost({ content: '' })
    } else {
      setHelperText('say something...')
    }
  }
  const addPostToFeed = (post) => {
    posts.unshift(post)
    setPosts(posts)
  }
  const handleChange = (event) => {
    event.preventDefault()
    setHelperText('')
    setValue(event.target.value)
    const { value, name } = event.target
    setPost({
      ...post,
      [name]: value
    })
  }

  return (
    <>
      <Header companyName={`Cohort Manager 2.0`} loggedInUser={loggedInUser} />
      <div className="home-page">
        <div className="left-sidebar"></div>
        <div className="posts-container">
          <section className="posts-section">
            <span>Status: {postResponse.status}</span>
            {err !== '' && <span style={{ color: 'red' }}>{err}!</span>}
            <PostForm
              handleSubmit={createPost}
              handleChange={handleChange}
              value={value}
              helperText={helperText}
            />
            <section className="single-post">
              <div className="single-post-header">
                <div className="single-post-author-img-container">
                  <div className="single-post-author-img">SF</div>
                </div>
                <div className="name-and-date-container">
                  <div className="single-post-name">Sam Fletcher</div>
                  <div className="single-post-date">19 February at 10:32</div>
                </div>
                <div className="single-post-edit-container">
                  <div className="single-post-edit">...</div>
                </div>
              </div>
              <article className="single-post-content">
                Zombie ipsum reversus ab viral inferno, nam rick grimes malum
                cerebro. De carne lumbering animata corpora quaeritis. Summus
                brains sit​​, morbo vel maleficia? De apocalypsi gorger omero
                undead survivor dictum mauris. Hi mindless mortuis soulless
                creaturas, imo evil stalking monstra adventus resi dentevil
                vultus comedat cerebella viventium. Qui animated corpse, cricket
                bat max brucks terribilem incessu zomby. The voodoo sacerdos
                flesh eater, suscitat mortuos comedere carnem virus. Zonbi
                tattered for solum oculi eorum defunctis go lum cerebro. Nescio
                brains an Undead zombies. Sicut malus putrid voodoo horror. Nigh
                tofth eliv ingdead.
              </article>
              <div className="like-and-comment-container">
                <PostLikes loggedInUser={loggedInUser} postId={post.id} />
                <div className="comment-container">
                  <div className="comment-icon"></div>
                  <div className="comment">Comment</div>
                </div>
                <div className="placeholder"></div>
                <div className="numberOfLikes">Be the first to like this</div>
              </div>
              <CommentsList />
              <div className="add-new-comment-container">
                <div className="new-comment-user-img-container">
                  <div className="new-comment-user-img">FA</div>
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
          </section>
          <ul className="posts-list">
            {posts.map((post, index) => (
              <li key={index} className="post-item">
                {post.content}
              </li>
            ))}
          </ul>
        </div>
        <div className="right-sidebar"></div>
      </div>
    </>
  )
}

export default PostsPage
