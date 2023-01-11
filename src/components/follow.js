import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../auth";
import { URL_BASE } from "../constants/UrlBase";

export default function Follow({ userId }) {
  const [follower, setFollower] = useState(false);
  const { user } = useContext(AuthContext);
  const [myPage, setMyPage] = useState(false);

  const config = { headers: { Authorization: `Bearer ${user.token}` } };

  useEffect(() => {

    if (user.id === parseInt(userId)) setMyPage(!myPage);

    axios
      .get(`${URL_BASE}/following`, config)
      .then((res) => {
        res.data.filter((id) => id.followId === parseInt(userId)).length
          ? setFollower(true)
          : setFollower(false);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [userId]);

  function toggleFollower() {
    setFollower(!follower);
    
    axios
      .post(`http://localhost:4000/follow/${userId}`, {}, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  return (
    <ButtonStyle onClick={toggleFollower} follower={follower} myPage={myPage}>
      {follower ? "Unfollow" : "Follow"}
    </ButtonStyle>
  );
}

const ButtonStyle = styled.button`
  width: 112px;
  height: 32px;
  background-color: ${(props) => (!props.follower ? "#1877f2" : "#fff")};
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: ${(props) => (!props.follower ? "#fff" : "#1877f2")};
  font-family: "Lato", sans-serif;
  font-weight: 700;
  position: absolute;
  margin-left: 800px;
  display: ${(props) => (props.myPage ? "none" : "initial")};
`;
