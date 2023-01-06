import axios from "axios";
import { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SearchIcon from "../assets/img/Vector.svg";

export default function Search() {
  const [result, setResult] = useState([]);
  const [name, setName] = useState();
  const navegate = useNavigate()

  useEffect(() => {
    if (name?.length > 2) {
      axios
        .get(`http://localhost:4000/search/${name}`)
        .then((res) => {
          setResult(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    }else{
      setResult([]);
    }
  }, [name]);

  return (
    <StyleSearch>
      <DebounceInput
        type="text"
        name="userName"
        minLength={0}
        debounceTimeout={300}
        onChange={(event) => setName(event.target.value)}
        placeholder="Search for people"
      />
      <button>
        <img src={SearchIcon} alt="search-icon" />
      </button>
      {result?.map((user) => (
        <ResultStyle key={user.id} onClick={() => navegate(`user/:${user.id}`)}>
          <img src={user.picture} alt="avatar user" />
          <span>{user.userName}</span>
        </ResultStyle>
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

  input {
    width: 563px;
    height: 45px;
    border-radius: 8px;
    padding: 14px;
    font-size: 19px;
    border: none;
  }

  button {
    position: absolute;
    right: 14px;
    top: 13px;
    background-color: #fff;
    border: none;
  }
`;

const ResultStyle = styled.div`
  display: flex;
  align-items: center;
  margin: 16px;
  cursor: pointer;

  img {
    width: 39px;
    height: 39px;
    border-radius: 50%;
    margin: 0 10px;
  }
`;
