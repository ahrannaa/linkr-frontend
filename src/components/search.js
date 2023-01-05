import styled from "styled-components";
import SearchIcon from "../assets/img/Vector.svg";

export default function Search() {
  return (
    <StyleSearch>
      <input type="text" placeholder="Search for people" />
      <button>
        <img src={SearchIcon} alt="search-icon"/>
      </button>
    </StyleSearch>
  );
}

const StyleSearch = styled.div`
    position:relative;

  input {
    width: 563px;
    height: 45px;
    border-radius: 8px;
    padding: 14px;
    font-size: 19px;
  }

  button{
    position:absolute;
    right:14px;
    top:13px;
    background-color:#fff;
    border:none;
    cursor: pointer;
  }
`;