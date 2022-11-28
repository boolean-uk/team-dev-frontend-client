import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PostForm from './PostForm'
import client from '../../utils/client'
import './style.css'

import Header from '../Header/Header'

const PostsPage = ({ loggedInUser }) => {
  const [post, setPost] = useState({ content: '' })
  const [postResponse, setPostResponse] = useState('')
  const [posts, setPosts] = useState([])
  const [value, setValue] = useState('')
  const [err, setErr] = useState('')
  const [helperText, setHelperText] = useState('')
  let navigate = useNavigate()

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

  const signOut = (event) => {
    event.preventDefault()
    localStorage.setItem(process.env.REACT_APP_USER_TOKEN, '')
    localStorage.setItem('loggedInUser', '')
    navigate('../', { replace: true })
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
            {err !== '' && <span style={{ color: "red"}}>{err}!</span>}
            <PostForm 
              handleSubmit={createPost} 
              handleChange={handleChange} 
              value={value}
              helperText={helperText}
            />
            <ul className="posts-list">
              {posts.map((post, index) => (
                <li key={index} className="post-item">
                  {post.content}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="right-sidebar"></div>
      </div>
    </>
  )
}

export default PostsPage
