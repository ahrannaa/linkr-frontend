import axios from "axios";
import { useContext, useState } from "react";
import Modal from "react-modal";
import { ColorRing } from "react-loader-spinner";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AuthContext from "../auth.js";


export default function Post({ latestPost }) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [editInput, setEditInput] = useState("");
  const [like, setLike] = useState(false);
  const [ heartIcon, setheartIcon] = useState("heart-outline");
  const { user } = useContext(AuthContext);

  //function fillHeart() {
    //let heartClass = heartIcon
    
   // if (like) {
     // setLike(false);
    //  heartClass  = "heart-outline"
   // } else {
    //  setLike(true);
     // heartClass = "heart"
   // }
   // setheartIcon(heartClass);
 // }

 const customStyles = {
    content: {
      width: "597px",
      height: "262px",
      background: "#333333",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  async function deletePost() {
    setIsLoading(true);

    const URL =`http://localhost:4000/posts/${latestPost.id}`;

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      await axios.delete(URL, config)
  } catch (err) {
     alert(`error: ${err}`)
  }
    setTimeout(() => {
      setIsLoading(false);
      closeModal();
    }, 3000);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }
  
  function handleEditButton() {
    setEditing(!isEditing)
 }
  
 async function editPost() {
  const URL = `http://localhost:4000/posts/${latestPost.id}`

  const body = {
    description: editInput,
  }
  console.log(body.description)
  
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

    try {
      await axios.put(URL, body, config)
  } catch (err) {
    alert(`error: ${err}`)
  }

}
 document.onkeydown = function(e) {
  if(e.key === 'Escape') {
    e.preventDefault();
    setEditing(false);
  } else if(e.key === "Enter") {
    e.preventDefault();
    editPost()
 }
}

  function linkRedirection(link){
    window.open(link, "_blank");
  }

  return (
    <>
      <PostCard>
        <img
          src={latestPost.picture}
        />
        <PostContent>
          <Header>
            <Link to={`/user/${user.id}`}>
              <h2>{latestPost.name}</h2>
            </Link>
            <IonIcon>
              <ion-icon onClick={handleEditButton} name="pencil-outline"></ion-icon>
              <ion-icon onClick={openModal} name="trash-outline"></ion-icon>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                {isLoading ? (
                  <ColorRing
                    type="ThreeDots"
                    color="#4fa94d"
                    height={80}
                    width={80}
                    ariaLabel="blocks-loading"
                  />
                ) : (
                  <Box>
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                      Are you sure you want to delete this post?
                    </h2>
                    <Button onClick={closeModal}>No,go back</Button>
                    <Button onClick={deletePost}>Yes,delete it</Button>
                  </Box>
                )}
              </Modal>
            </IonIcon>
          </Header>
          <h3>{latestPost.text}</h3>
          { isEditing ? <Input onChange={e => setEditInput(e.target.value)} autoFocus defaultValue={editInput}/> :<h3>{latestPost.description}</h3>}
             <LinkDisplayer onClick={() => linkRedirection(latestPost.link)}>
                    <LinkInfo>
                      <h2>{latestPost.title}</h2>
                        <h3>{latestPost.preview}</h3>
                        <h4>{latestPost.link}</h4>
                    </LinkInfo>
                    <img src={latestPost.pic} />
                </LinkDisplayer>
        </PostContent>
      </PostCard>
    </>
  );
 }

const PostCard = styled.div`
  width: 611px;
  background-color: #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-bottom: 16px;
  padding: 16px;
  display: flex;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`
const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 19px;
  margin-bottom: 16px;

  a {
    text-decoration: none;
  }

  h2 {
    color: #ffffff;
    font-size: 19px;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    margin-bottom: 13px;
  }

  ion-icon {
    font-size: 19px;
    color: #ffffff;
    margin-left: 8px;
  }

  h3 {
    color: #b7b7b7;
    font-size: 17px;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    margin-bottom: 13px;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const IonIcon = styled.div`
  display: flex;
  margin-left: 20px;
`;
 const LinkDisplayer = styled.div`
    background-color: #000000;
    width: 503px;
    height: 155px;
    border-radius: 11px;
    border: 1px solid #4d4d4d;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    overflow: hidden;
    img{
        width: 154px;
        height: 154px;
        border-radius: 0px;
    }
`
const LinkInfo = styled.div`
    width:347px;
    height: 154px;
    padding: 19px;

    h2{
        color: #cecece;
        font-size:16px;
        font-family: 'Lato', sans-serif;
        font-weight: 400;
        margin-bottom: 8px;
    }
    h3{
        color: #9b9595;
        font-size:11px;
        font-family: 'Lato', sans-serif;
        font-weight: 400;
        margin-bottom: 14px;
    }
    h4{
        color: #cecece;
        font-size:11px;
        font-family: 'Lato', sans-serif;
        font-weight: 400;
        margin-bottom: 10px;
    }
`;
const Input = styled.input`
background: #FFFFFF;
border-radius: 7px;
width: 503px;
height: 44px;
`;
const Box = styled.div`

h2 {
  color: blue;
  font-size: 34px;
  font-family: "Lato", sans-serif;
  font-weight: 400;
  margin-bottom: 13px;
  text-align: center
}

`
const Button = styled.button `
  color: blue,
  width: 200px,
  height: 90px,
  display: flex,
  top: 508px;
 
  :hover {
   background-color: #1877F2;
  }
`