import styled from "styled-components";
import AuthContext from "../auth";
import { useContext } from "react";

export default function Comment(props) {
  const { user } = useContext(AuthContext);

    return (
   <BoxComments>
      <Header>
      <img src= {props.followerPic}/>
      <h2>{props.followerName}</h2>
      {user.id == props.userId && (
        <h3> • post’s author</h3>
      )}
      </Header>
      <Comments><h3>{props.text}</h3></Comments>
     </BoxComments>
    )
}

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
const Comments = styled.div`
   display:flex;
   flex-wrap: wrap;
   h3{
    color:red;
    margin-left:60px;
    font-family: 'Lato';
    font-weight: 400;
    font-size: 14px;
}`
