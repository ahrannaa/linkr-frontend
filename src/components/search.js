import styled from "styled-components";
import SearchIcon from "../assets/img/Vector.svg";

export default function Search() {
  return (
    
      <StyleSearch>
        <input type="text" placeholder="Search for people" />
        <button>
          <img src={SearchIcon} alt="search-icon" />
        </button>
        {/* <ResultStyle>
          <img
            src="https://st2.depositphotos.com/3765293/6822/i/450/depositphotos_68226509-stock-photo-black-cat-in-the-grass.jpg"
            alt="avatar user"
          />
          <span>João Avatares</span>
        </ResultStyle>
        <ResultStyle>
          <img
            src="https://st2.depositphotos.com/3765293/6822/i/450/depositphotos_68226509-stock-photo-black-cat-in-the-grass.jpg"
            alt="avatar user"
          />
          <span>João Avatares</span>
        </ResultStyle> */}
      </StyleSearch>
    
  );
}

const StyleSearch = styled.div`
  background-color: #e7e7e7;
  border-radius: 8px;
  position: absolute;
  left:35%;
  top:13px;

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
    cursor: pointer;
  }
`;

// const ResultStyle = styled.div`
//   display: flex;
//   align-items: center;
//   margin:16px;

//   img {
//     width: 39px;
//     height: 39px;
//     border-radius: 50%;
//     margin: 0 10px;
//   }
// `;
