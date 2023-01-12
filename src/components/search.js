import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { DebounceInput } from "react-debounce-input";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { URL_BASE } from "../constants/UrlBase";
import AuthContext from "../auth";

export default function Search() {
  const [result, setResult] = useState([]);
  const [name, setName] = useState();
  const [inputOf, setInputOf] = useState();
  const { user } = useContext(AuthContext);
  const [following, setFollowing] = useState();

  useEffect(() => {

    const config = { headers: { Authorization: `Bearer ${user.token}` } };

    if (name?.length > 2) {
      axios
        .get(`${URL_BASE}/search/${name}`, config)
        .then((res) => {
          setResult(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      setResult([]);
    }
  }, [name]);

  useEffect(() => {

    const config = { headers: { Authorization: `Bearer ${user.token}` } };

    axios
      .get(`${URL_BASE}/following`, config)
      .then((res) => {
        setFollowing(
          result
            ?.map((user) =>
              res.data.filter((fol) => fol.followId === user.id).length
                ? { ...user, following: true }
                : { ...user, following: false }
            )
            .sort((a, b) => b.following - a.following)
        );
      })
      .catch((res) => {
        console.log(res);
      });
  }, [result]);

  function toggleInput(resp) {
    setTimeout(setInputOf, 200, resp);
  }

  return (
    <StyleSearch>
      <DebounceInput
        type="text"
        name="userName"
        minLength={0}
        debounceTimeout={300}
        autoComplete="off"
        onBlur={(e) => toggleInput(true)}
        onFocus={(e) => toggleInput(false)}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Search for people"
      />
      <div>
        <FaSearch size="21" color="#C6C6C6" />
      </div>

      {following?.map((user) => (
        <Link to={`/user/${user.id}`} key={user.id}>
          <ResultStyle
            onClick={() => setName("")}
            visible={inputOf}
            following={user.following}
          >
            <img src={user.picture} alt="avatar user" />
            <span>
              {user.userName} <p>• following</p>
            </span>
          </ResultStyle>
        </Link>
      ))}
    </StyleSearch>
  );
}

const StyleSearch = styled.div`
  background-color: #e7e7e7;
  border-radius: 8px;
  position: absolute;
  left: 35%;
  top: 13px;

  a {
    text-decoration: none;
  }

  input {
    width: 563px;
    height: 45px;
    border-radius: 8px;
    padding: 14px;
    font-size: 19px;
    border: none;
    &:focus-visible {
      outline: none;
    }
  }

  div {
    position: absolute;
    right: 14px;
    top: 13px;
    background-color: initial;
    border: none;
  }
`;

const ResultStyle = styled.li`
  display: ${(props) => (props.visible ? "none" : "flex")};
  align-items: center;
  padding: 16px;
  cursor: pointer;
  border-radius: 0px 0px 8px 8px;

  img {
    width: 39px;
    height: 39px;
    border-radius: 50%;
    margin: 0 10px;
  }

  span {
    font-size: 19px;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    color: #515151;

    > p {
      margin-left: 7px;
      display: inline;
      color: #c5c5c5;
      display: ${(props) => (props.following ? "inline" : "none")};
    }
  }

  &:hover {
    background-color: #a7a7a7;
  }
`;
