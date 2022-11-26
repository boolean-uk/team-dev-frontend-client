import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PostForm from './PostForm'
import client from '../../utils/client'
import './style.css'
import Search from '../Right-Sidebar/Search'

import Header from '../Header/Header'

const PostsPage = ({ loggedInUser }) => {
  const [post, setPost] = useState({ content: '' })
  const [postResponse, setPostResponse] = useState('')
  const [posts, setPosts] = useState([])
  const [cohorts, setCohorts] = useState([])
  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])

  let navigate = useNavigate()

  useEffect(() => {
    client.get('/posts').then((res) => setPosts(res.data.data.posts))
    client.get('/cohorts').then((res) => setCohorts(res.data.data))
    client.get('/users').then((res) => {
      setStudents(res.data.data.users.filter(user => user.role === 'STUDENT'))})
    client.get('/users').then((res) => {
      setTeachers(res.data.data.users.filter(user => user.role === 'TEACHER'))})
  }, [])

  const createPost = async (event) => {
    event.preventDefault()
    client
      .post('/post', post)
      .then((res) => setPostResponse(res.data))
      .catch((data) => {
        console.log(data)
      })
  }

  const handleChange = (event) => {
    event.preventDefault()
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
            <PostForm handleSubmit={createPost} handleChange={handleChange} />
            <ul className="posts-list">
              {posts.map((post, index) => (
                <li key={index} className="post-item">
                  {post.content}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="right-sidebar">
          <Search />
          <ul className="right-sidebar-list">
            <h2>Cohorts</h2>
            {cohorts.map((cohort, index) => (
              <li key={index} className="right-sidebar-item">
                {cohort.cohortName}
              </li>
            ))}
          </ul>
          <ul className="right-sidebar-list">
            <h2>Students</h2>
            {students.map((student, index) => (
              <li key={index} className="right-sidebar-item">
                {student.firstName} {student.lastName}
              </li>
            ))}
          </ul>
          <ul className="right-sidebar-list">
            <h2>My Cohort</h2>
            {students.filter(student => student.cohortId === loggedInUser.cohortId).map((student, index) => (
                <li key={index} className="right-sidebar-item">
                  {student.firstName} {student.lastName}
                </li>
              ))}
          </ul>
          <ul className="right-sidebar-list">
            <h2>Teachers</h2>
            {teachers.map((teacher, index) => (
              <li key={index} className="right-sidebar-item">
                {teacher.firstName} {teacher.lastName}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default PostsPage
