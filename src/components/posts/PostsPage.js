import { useState, useEffect } from "react";
import PostForm from "./PostForm";
import client from "../../utils/client";
import "./style.css";

import Header from "../Header/Header";

const PostsPage = () => {
  const [post, setPost] = useState({ content: "" });
  const [postResponse, setPostResponse] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client.get("/posts").then((res) => setPosts(res.data.data.posts));
  }, []);

  const createPost = async (event) => {
    event.preventDefault()
    client
      .post("/post", post)
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
    localStorage.setItem(process.env.REACT_APP_USER_TOKEN, "")
    navigate("../", { replace: true })
  }

  console.log(posts, postResponse);

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
                <div className="post-item-content">
                {post.content} 
                </div>
                <div className="post-item-buttons">
                <button>Like</button>
                <button>Comment</button>
                <button>Delete</button>
                <button>Edit</button>
                </div>
              </li>
            ))}
          </ul>
          <PostForm handleSubmit={createPost} handleChange={handleChange} />
        </section>
      </main>
    </>
  )
}

export default PostsPage
