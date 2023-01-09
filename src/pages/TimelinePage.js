import { useState } from "react";

import styled from "styled-components";
import TopBar from "../components/TopBar.js";
import Post from "../components/Post.js";
import NewPost from "../components/NewPost.js";
import GlobalStyle from "../GlobalStyle.js";
import Hashtags from "../components/Hashtags.js";

export default function TimelinePage(props) {
  const [latestPosts, setLatestPosts] = useState([]);
  const [infoHashtag, setInfoHashtag] = useState([]);
  return (
    <>
      <GlobalStyle />
      <TimelineBackground>
        <TopBar />
        <TimelineContent>
          <h1>timeline</h1>
          <NewPost />
          <Post />
          {/* {latestPosts.map((latestPost, index) => <Post key={index} latestPost={latestPost} />)} */}
        </TimelineContent>
        <Hashtags infoHashtag={infoHashtag} setInfoHashtag={setInfoHashtag} />
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
