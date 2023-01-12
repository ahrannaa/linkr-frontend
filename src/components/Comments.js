import styled from "styled-components";
import AuthContext from "../auth";
import { useContext } from "react";

export default function Comments({ latestPost }) {
  const { user } = useContext(AuthContext);

    return (
    <ContainerComments>
     <BoxComments>
      <Header>
      <img src= {latestPost.picture}/>
      <h2>{latestPost.name}</h2>
      <h3>• following</h3>
      </Header>
      <Comment><h3>Curti o post</h3></Comment>
     </BoxComments>
     <BoxInput>
     <img src= {user.picture} />
     <input placeholder="write a comment" ></input>
     <ion-icon name="paper-plane-outline"></ion-icon>
     </BoxInput>
   </ContainerComments>
    )
}

const ContainerComments = styled.div`
  width: 611px;
  margin-bottom: 20px;
  padding: 16px;
  background-color: #1E1E1E;;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  img {
      width: 39px;
      height: 39px;
      border-radius: 50%;
  }
`;
const BoxComments = styled.div`
margin-bottom: 15px;
border-bottom: 1px solid #353535;
`
const Header = styled.div`
  display:flex;
  margin-top:8px;
  h2 {
    color: #f3f3f3;
    margin-left: 35px;
    font-family: 'Lato';
    font-size: 14px;
  }

  h3 {
    color: #565656;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    margin-left: 15px;
  }
`
const Comment = styled.div`
   display:flex;
   flex-wrap: wrap;
   h3{
    color:red;
    margin-left:60px;
    font-family: 'Lato';
    font-weight: 400;
    font-size: 14px;
}`
const BoxInput = styled.div`
 img {
    width: 39px;
    height: 39px;
    border-radius: 50%;
};

 ion-icon {
    font-size: 19px;
    color: #ffffff;
    margin-left: 8px;
}

  input {
   width: 510px;
   height: 39px;
   margin-left:20px;
   background: #252525;
   border-radius: 8px;
   border:none;
   
   ::placeholder {
    font-family: 'Lato';
    font-size: 14px;
    color: #575757;
    margin-left: 25px;
   };

  }
`
