import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PostForm from './PostForm'
import client from '../../utils/client'
import './style.css'
// import {testUserData} from '../users/login/LoginPage'

import Header from '../Header/Header'

const PostsPage = (props) => {
  const { userData } = props

  const [post, setPost] = useState({ content: '' })
  const [postResponse, setPostResponse] = useState('')
  const [posts, setPosts] = useState([])
  let navigate = useNavigate()
  useEffect(() => {
    client
      .get('/posts')
      .then((res) => setPosts(res.data.data.posts.sort((a, b) => a.id - b.id)))
  }, [posts])

  const createPost = async (event) => {
    event.preventDefault()
    client
      .post('/post', post)
      .then((res) => {
        setPostResponse(res.data)
        setPosts(posts)
      })
      .catch((data) => {
        console.log(data)
      })
    event.target.reset()
    setPost({ content: '' })
  }

  const handleChange = (event) => {
    event.preventDefault()
    const { value, name } = event.target
    setPost({
      ...post,
      [name]: value
    })
  }

  // console.log('props post page', userData)

  const signOut = (event) => {
    event.preventDefault()
    localStorage.setItem(process.env.REACT_APP_USER_TOKEN, '')
    navigate('../', { replace: true })
  }

  // console.log(posts, postResponse)

  return (
    <>
      <Header companyName={`Cohort Manager 2.0`} />
      <main>
        <section className="posts-section">
          <button id="user-signout-button" onClick={signOut}>
            sign out
          </button>
          <p>Status: {postResponse.status}</p>

          <ul className="posts-list">
            {posts.map((post, index) => (
              <li key={index} className="post-item">
                <div className="post-item-user">
                  {`${post.user.profile.firstName} ${post.user.profile.lastName} says:`}
                </div>
                <div className="post-item-content">{post.content}</div>
                <div className="post-item-buttons">
                  <button onClick={() => console.log(post.id)}>Like</button>
                  <button>Comment</button>
                  {userData.role === 'TEACHER' ? (
                    <>
                      <button>Edit</button>
                      <button>Delete</button>
                    </>
                  ) : (
                    userData
                  )}
                </div>
              </li>
            ))}
          </ul>
          <PostForm
            handleSubmit={(e) => createPost(e)}
            handleChange={handleChange}
          />
        </section>
      </main>
    </>
  )
}

export default PostsPage
