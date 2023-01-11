import styled from "styled-components";
import TopBar from "../components/TopBar.js";
import Post from "../components/Post.js";
import Hashtags from "../components/Hashtags.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import Follow from "../components/follow.js";
import { URL_BASE } from "../constants/UrlBase.js";

export default function UserPage() {
  const [posts, setPosts] = useState();
  const [user, setUser] = useState()
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${URL_BASE}/user/${id}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data.user)
        setPosts(res.data.posts);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [id]);

  

  return (
    <>
      <TimelineBackground>
        <TopBar />
        {user ? (
          <UserPageStyle>
            <div>
              <img src={user[0].picture} alt="avatar user" />
              <h1>{user[0].name} posts</h1>
              <Follow userId={id}></Follow>
            </div>
            {posts.map((post, index) => (
              <Post key={index} latestPost={post} />
            ))}
          </UserPageStyle>
        ) : (
          <RotatinL>
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="95"
              visible={true}
            />
          </RotatinL>
        )}

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
  margin-top: 95px;
  width: 650px;
  height: 100%;
  background-color: #171717;
  margin: auto;

  > div:first-child {
    display: flex;
    margin-bottom: 30px;
    align-items: center;
    justify-content: baseline;
    margin-top:100px;

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

const RotatinL = styled.div`
  background-color: #171717;
  margin: 10% auto 0 auto;
  text-align: center;
`;
