import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import TopBar from "../components/TopBar.js";
import Post from "../components/Post.js";
import NewPost from "../components/NewPost.js";
import Hashtags from "../components/Hashtags.js";
import { useInterval } from "usehooks-ts";

export default function TimelinePage(props) {
  const [latestPosts, setLatestPosts] = useState([]);
  const [infoHashtag, setInfoHashtag] = useState([]);
  const [dataPostReceived, setDataPostReceived] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [needRefresh, setNeedRefresh] = useState(false);
  const [newTimeLineSize, setNewTimeLineSize] = useState();
  const [timelinesDiferences, setTimelineDiferences] = useState(0);
  const [timelineSize, setTimelineSize] = useState();
  const localhost1 = "http://localhost:4000/";
  const db1 = "https://linkr-api-0l14.onrender.com/";
  let offset = 0;
  let cont = 0;

  function refreshPosts() {
    axios
      .get(`${db1}posts?limit=5&offset=${offset}`)
      .then((res) => {
        const newPosts = [];
        res.data.forEach((e) => newPosts.push(e));
        setLatestPosts((oldPosts) => [...oldPosts, ...newPosts]);
      })
      .catch((err) => {
        alert(
          "An error ocurred while trying to fetch the posts, please refresh the page"
        );
      });
    offset += 5;
  }

  function handleScroll(e) {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      refreshPosts();
    }
  }

  useEffect(() => {
    refreshPosts();
    window.addEventListener("scroll", handleScroll);
  }, [dataPostReceived]);

  /* verifica o tamanho da página */
  function catchTimelineSize() {
    if (cont === 0) {
      axios.get(`${db1}posts`).then((res) => {
        setTimelineSize(res.data.length);
      });
    } else {
      return;
    }
  }

  catchTimelineSize();
  /* verifica o tamanho a cada 15 seg e atualiza */

  useInterval(() => {
    testTimeline();
  }, 15000);

  function testTimeline() {
    axios.get(`${localhost1}posts`).then((res) => {
      setNewTimeLineSize(res.data.length);
    });
    if (newTimeLineSize < timelineSize) {
      const timelineDiference = (newTimeLineSize - timelineSize) * -1;
      setNeedRefresh(true);
      setTimelineDiferences(timelineDiference);
    }
  }

  if (!latestPosts) {
    return (
      <TimelineContent>
        <h1>Loading...</h1>
      </TimelineContent>
    );
  }
  return (
    <>
      <TimelineBackground>
        <TopBar />
        <TimelineContent>
          <h1>timeline</h1>
          <NewPost
            dataPostReceived={dataPostReceived}
            setDataPostReceived={setDataPostReceived}
          />
          <NewMessagesAlert
            needRefresh={needRefresh}
            onClick={() => window.location.reload()}
          >
            <h2> {timelinesDiferences} new posts, load more!</h2>
            <ion-icon
              name="refresh-outline"
              style={{
                fontSize: "20px",
                color: "white",
              }}
            />
          </NewMessagesAlert>
          <>
            {latestPosts.length === 0 ? (
              <h1>There are no posts yet</h1>
            ) : (
              <>
                {" "}
                {latestPosts.map((latestPost, index) => (
                  <Post key={index} latestPost={latestPost} />
                ))}
              </>
            )}
          </>
        </TimelineContent>
        <Hashtags infoHashtag={infoHashtag} setInfoHashtag={setInfoHashtag} />
      </TimelineBackground>
    </>
  );
}

const NewMessagesAlert = styled.button`
  width: 611px;
  height: 61px;
  background: #1877f2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-bottom: 17px;
  display: ${(props) => (props.needRefresh ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  h2 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    margin-right: 10px;
  }
`;

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
  /* button {
    width: 611px;
    height: 61px;
    background: #1877f2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
  }
  h2 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
  } */
`;
