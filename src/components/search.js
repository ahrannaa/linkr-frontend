import axios from "axios";
import { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { URL_BASE } from "../constants/UrlBase";

export default function Search() {
  const [result, setResult] = useState([]);
  const [name, setName] = useState();
  const [inputOf, setInputOf] = useState();

  useEffect(() => {
    if (name?.length > 2) {
      axios
        .get(`${URL_BASE}/search/${name}`)
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

      {result?.map((user) => (
        <Link to={`/user/${user.id}`} key={user.id}>
          <ResultStyle
            onClick={ () => setName("")}
            visible={inputOf}
          >
            <img src={user.picture} alt="avatar user" />
            <span>{user.userName}</span>
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
  }

  &:hover {
    background-color: #a7a7a7;
  }
`;
