import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import PostForm from './PostForm'
import client from '../../utils/client'
import './style.css'
import SideNavBar from '../sideNavBar/sideNavBar'
import Header from '../Header/Header'
import Post from './Post'

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
  }, [postResponse])

  const postsEndRef = useRef(null)

  const scrollToBottom = () => {
    postsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
    console.log('scrollToBottom called')
  }, [posts])

  const createPost = async (event) => {
    event.preventDefault()
    client
      .post('/post', post)
      .then((res) => {
        setPostResponse(res.data)
        setPosts(posts)
        scrollToBottom()
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

  const signOut = (event) => {
    event.preventDefault()
    localStorage.setItem(process.env.REACT_APP_USER_TOKEN, '')
    navigate('../', { replace: true })
  }

  return (
    <div className="content">
      <Header companyName={`Cohort Manager 2.0`} />
      <div className="mainGridArea">
        <SideNavBar />
        <main>
          <section className="posts-section main-col">
            <p>Status: {postResponse.status}</p>
            <ul className="posts-list">
              {posts.map((post, index) => (
                <Post
                  key={index}
                  post={post}
                  postResponse={postResponse}
                  setPostResponse={setPostResponse}
                  index={index}
                  userData={userData}
                />
              ))}
              <div ref={postsEndRef} />
            </ul>
            <PostForm
              handleSubmit={(e) => createPost(e)}
              handleChange={handleChange}
            />
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
          </section>
        </main>
      </div>
    </div>
  )
}

export default PostsPage
