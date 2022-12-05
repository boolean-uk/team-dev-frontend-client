import { useState, useEffect } from 'react'
import PostForm from './PostForm'
import client from '../../utils/client'
import './style.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Search from './Sidebar/Search'
import CohortsList from '../cohortsList/CohortsList'
import TeachersList from '../teachersList/TeachersList'
import Header from '../Header/Header'
import Post from './Post'
import NavigationRail from '../NavigationRail/NavigationRail'

const initialPostState = {
  content: ''
}
const PostsPage = ({ loggedInUser }) => {
  const [post, setPost] = useState(initialPostState)
  const [posts, setPosts] = useState([])
  const [value, setValue] = useState('')
  const [err, setErr] = useState('')
  const [helperText, setHelperText] = useState('')

  const isTeacher = loggedInUser !== null && loggedInUser.role === 'TEACHER'

  const isTeacher = loggedInUser !== null && loggedInUser.role === 'TEACHER'

  useEffect(() => {
    client.get('/posts').then((res) => {
      if (res.data.data) setPosts(res.data.data.posts)
    })
  }, [])

  const createPost = async (event) => {
    console.log(loggedInUser)
    event.preventDefault()

    if (post.content.length > 0) {
      client
        .post('/posts', post)
        .then((res) => {
          addPostToFeed(res.data.data)
          setPosts([post, ...posts])
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

      <NavigationRail user={loggedInUser} />

      <div className="home-page">
        <div className="left-sidebar"></div>
        <div className="posts-container">
          <section className="posts-section">
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
                  client={client}
                  posts={posts}
                  setPosts={setPosts}
                  value={value}
                  setErr={setErr}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="right-sidebar">
          <Search />
          {isTeacher && <CohortsList />}
          <TeachersList />
        </div>
      </div>
    </>
  )
}

export default PostsPage
