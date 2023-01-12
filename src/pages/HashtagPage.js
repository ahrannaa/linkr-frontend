import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Hashtags from "../components/Hashtags.js";
import PostHashtags from "../components/PostHashtags.js";
import TopBar from "../components/TopBar.js";
import AuthContext from "../auth";

export default function HashtagPage() {
  const { user } = useContext(AuthContext);
  const [allHashtags, setAllHashags]= useState([]);
  const [infoHashtag, setInfoHashtag] = useState([]);
  const { hashtag } = useParams();
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  useEffect(() => {
    const promise = axios.get(`https://linkr-api-0l14.onrender.com/post/${hashtag}`,config);
    promise.then((response) => {
      setAllHashags(response.data);
    });
    promise.catch((resposta) => {
      console.log("DEU RUIM", resposta);
    });
  }, [hashtag]);
  return (
    <>
      <TimelineBackground>
        <TopBar />
        <TimelineContent>
          <h1>#{hashtag}</h1>
          <PostHashtags allHashtags={allHashtags} />
        </TimelineContent>
        <Hashtags infoHashtag={infoHashtag} setInfoHashtag={setInfoHashtag}  />
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
