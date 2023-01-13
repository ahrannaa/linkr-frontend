import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import TopBar from "../components/TopBar.js";
import Post from "../components/Post.js";
import NewPost from "../components/NewPost.js";
import Hashtags from "../components/Hashtags.js";
import InfiniteScroll from "react-infinite-scroller";

export default function TimelinePage(props) {
  const [latestPosts, setLatestPosts] = useState([]);
  const [infoHashtag, setInfoHashtag] = useState([]);
  const [dataPostReceived, setDataPostReceived] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const localhost1 = "http://localhost:4000/";
  const db1 = "https://linkr-api-0l14.onrender.com/";
  let offset = 0;

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
