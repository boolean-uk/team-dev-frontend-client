import { useState, useEffect } from 'react'
import PostForm from './PostForm'
import client from '../../utils/client'
import './style.css'

import Header from '../Header/Header'
import Post from './Post'

const PostsPage = ({ loggedInUser }) => {
  const initialPostState = {
    content: '',
    firstName: '',
    lastName: ''
  }
  const [post, setPost] = useState(initialPostState)
  const [postResponse, setPostResponse] = useState('')
  const [posts, setPosts] = useState([])
  const [value, setValue] = useState('')
  const [err, setErr] = useState('')
  const [helperText, setHelperText] = useState('')

  useEffect(() => {
    client.get('/posts').then((res) => {
      console.log(res.data.data.posts)
      setPosts(res.data.data.posts)
    })
  }, [])

  const createPost = async (event) => {
    event.preventDefault()

    if (post.content.length > 0) {
      client
        .post('/posts', post)
        .then((res) => {
          console.log('created post', res)
          addPostToFeed(res.data.data)
          setPostResponse(res.data.data.statusText)
        })
        .catch((err) => {
          console.log(err.message)
          setErr(err.message)
        })
      setValue('')
      setPost({ content: '' })
    } else {
      setHelperText('say something...')
    }
  }
  const addPostToFeed = (post) => {
    posts.unshift(post)
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
            <button id="user-signout-button" onClick={signOut}>
              sign out
            </button>
            <span>Status: {postResponse.status}</span>
            {err !== '' && <span style={{ color: 'red' }}>{err}!</span>}
            <PostForm
              loggedInUser={loggedInUser}
              handleSubmit={createPost}
              handleChange={handleChange}
              value={value}
              helperText={helperText}
            />
          </section>
          <ul className="posts-list">
            {posts.map((post, index) => (
              <li key={index} className="post-item">
                <Post
                  handleChange={handleChange}
                  post={post}
                  loggedInUser={loggedInUser}
                />
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
