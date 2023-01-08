import { useEffect, useState } from "react";
import axios from "axios"

import styled from "styled-components";
import TopBar from "../components/TopBar.js";
import Post from "../components/Post.js";
import NewPost from "../components/NewPost.js";
import GlobalStyle from "../GlobalStyle.js";
import Hashtags from "../components/Hashtags.js";

export default function TimelinePage() {
  const [latestPosts, setLatestPosts] = useState([]);
  const [dataPostReceived, setDataPostReceived] = useState(false)

  useEffect(() => {
    axios.get("http://localhost:4000/posts")
      .then(res => {
        setLatestPosts(res.data)
        setDataPostReceived(false)
      })
      .catch(err => {
        alert("An error ocurred while trying to fetch the posts, please refresh the page")
      })
  }, [dataPostReceived])

  if (!latestPosts){
    return(
      <TimelineContent>
        <h1>Loading...</h1>
      </TimelineContent>
    )
  }

  return (
    <>
      <GlobalStyle />
      <TimelineBackground>
        <TopBar />
        <TimelineContent>
          <h1>timeline</h1>
          <NewPost dataPostReceived={dataPostReceived} setDataPostReceived={setDataPostReceived} />
          <>
          {latestPosts.length === 0? (
            <h1>There are no posts yet</h1>
          ):(
           <> {latestPosts.map((latestPost, index) => <Post key={index} latestPost={latestPost} />)}</>
          )}
          </> 
        </TimelineContent>
        <Hashtags />
      </TimelineBackground>
    </>
  );
}

const TimelineBackground = styled.body`
  background-color: #171717;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimelineContent = styled.div`
  margin-top: 120px;
  width: 650px;
  height: 100%;
  background-color: #171717;
  h1 {
    font-family: "Oswald", sans-serif;
    font-size: 43px;
    color: #ffffff;
    margin-bottom: 45px;
  }
`;
