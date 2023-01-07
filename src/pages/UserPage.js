import styled from "styled-components";
import TopBar from "../components/TopBar.js";
import Post from "../components/Post.js";
import GlobalStyle from "../GlobalStyle.js";
import Hashtags from "../components/Hashtags.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UserPage() {
  const [user, setUser] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/user/${id}`)
      .then((res) => {
        setUser(res.data[0]);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [id]);

  return (
    <>
      <GlobalStyle />
      <TimelineBackground>
        <TopBar />
        <UserPageStyle>
          <div>
            <img src={user?.picture} alt="avatar user" />
            <h1>{user?.userName} posts</h1>
          </div>
          <Post />
          {/* {latestPosts.map((latestPost, index) => <Post key={index} latestPost={latestPost} />)} */}
        </UserPageStyle>
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

const UserPageStyle = styled.div`
  margin-top: 120px;
  width: 650px;
  height: 100%;
  background-color: #171717;

  > div:first-child {
    display: flex;
    margin-bottom: 30px;
    align-items: center;
    justify-content: baseline;

    > img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin: 18px;
    }

    > h1 {
      font-family: "Oswald", sans-serif;
      font-size: 43px;
      color: #ffffff;
      margin-bottom: 5px;
    }
  }
`;