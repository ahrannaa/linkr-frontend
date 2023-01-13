import axios from "axios";
import { useState, useContext } from "react";
import Modal from "react-modal";
import { ColorRing } from "react-loader-spinner";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../auth";
import { ReactTagify } from "react-tagify";
import Comment from "./Comment.js";

export default function Post({ latestPost }) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [editInput, setEditInput] = useState(latestPost.text);
  const [newComment, setNewComment] = useState("");
  const [countComments, setcountComments] = useState(0);
  const [comments, setComments] = useState([]);
  const [enableComments, setEnableComments] = useState(false);
  const [like, setLike] = useState(false);
  const [countLike, setcountLike] = useState(0);
  const [heartIcon, setheartIcon] = useState("heart-outline");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  function fillHeart() {
    let heartClass = heartIcon;

    if (like) {
      setLike(false);
      heartClass = "heart-outline";
      setcountLike(countLike - 1)
    } else {
      setLike(true);
      heartClass = "heart";
      setcountLike(countLike + 1)
    }
    setheartIcon(heartClass);
    setcountLike(countLike)
  }

  async function openComments() {
    const URL = `http://localhost:4000/posts/${latestPost.id}/comments`

    try {
      const response = await axios.get(URL)
      setComments(response.data)
      setEnableComments(true);

    } catch (err) {
      alert(err.message);
    }
  }

  async function sendComment(e) {
    e.preventDefault()
    const body = newComment

    const URL = `http://localhost:4000/posts/posts/${latestPost.id}/comments`

    try {
      await axios.post(URL, body)
      setcountComments(countComments + 1)

    } catch (err) {
      alert(err.message);
    }
  }

  const customStyles = {
    content: {
      width: "597px",
      height: "262px",
      background: "#333333",
      borderRadius: "50px",
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

    const URL = `http://localhost:4000/posts/${latestPost.id}`;

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      await axios.delete(URL, config);
      setTimeout(() => {
        closeModal();
        setIsLoading(false);
        window.location.reload(true);
      }, 3000);
    } catch (err) {
      closeModal();
      alert(`error: ${err}`);
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
    subtitle.style.color = "#ffffff";
  }

  function handleEditButton() {
    setEditing(!isEditing);
  }

  async function editPost() {
    const URL = `http://localhost:4000/posts/${latestPost.id}`;

    const body = {
      description: editInput,
    };
    console.log(body.description);

    const config = { headers: { Authorization: `Bearer ${user.token}` } };

    try {
      await axios.put(URL, body, config);
      setEditInput(body.description);
      window.location.reload(true);
    } catch (err) {
      alert(`error: ${err}`);
    }
  }

  document.onkeydown = function (e) {
    if (e.key === "Escape") {
      e.preventDefault();
      setEditing(false);
    } else if (e.key === "Enter") {
      e.preventDefault();
      editPost();
    }
  };

  function linkRedirection(link) {
    window.open(link, "_blank");
  }

  const tagDisplay = {
    color: "white",
    fontWeight: 700,
  };

  async function sharePost(id) {
    const body = null
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    if (window.confirm("Do you want to re-post this link?") === true) {

      try {
        await axios.post(`http://localhost:4000/posts/${id}`, body, config);
        window.location.reload(true);
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <>
      {latestPost.isrepost ? (
        <RepostDisplay>
          <RepostByDiv>
            <ion-icon name="repeat-sharp"></ion-icon>
            <h4>Re-posted by {latestPost.name === latestPost.reposter ? ("you") : (latestPost.reposter)}</h4>
          </RepostByDiv>
          <RepostCard>
            <div>
              <img src={latestPost.picture} />
              <ion-icon onClick={fillHeart} name={heartIcon}></ion-icon>
              <ion-icon name="chatbubbles-outline"></ion-icon>
              <ShareCounter>
                <ion-icon name="repeat-sharp" onClick={() => sharePost(latestPost.originalPostId)}></ion-icon>
                <h5>{latestPost.repostCount} re-post</h5>
              </ShareCounter>
            </div>
            <PostContent>
              <Header>
                <Link to={`/user/${latestPost.userId}`}>
                  <h2>{latestPost.name}</h2>
                </Link>
              </Header>
              <ReactTagify
                tagStyle={tagDisplay}
                tagClicked={(t) => {
                  navigate(`/hashtag/${t.replace("#", "")}`);
                }}
              >
                <h3>{latestPost.text}</h3>
              </ReactTagify>
              <LinkDisplayer onClick={() => linkRedirection(latestPost.link)}>
                <LinkInfo>
                  <h2>{latestPost.title}</h2>
                  <h3>{latestPost.preview}</h3>
                  <h4>{latestPost.link}</h4>
                </LinkInfo>
                <img src={latestPost.pic} />
              </LinkDisplayer>
            </PostContent>
          </RepostCard>
        </RepostDisplay>
      ) : (
        <>
          <PostCard>
            <div>
              <img src={latestPost.picture} />
              <ion-icon onClick={fillHeart} name={heartIcon}></ion-icon>
              {countLike > 0 &&
                <h3>{countLike} likes</h3>
              }
              <ion-icon onClick={openComments} name="chatbubbles-outline"></ion-icon>
              {countComments > 0 &&
                <h4>{countComments} comments</h4>
              }
              <ShareCounter>
                <ion-icon name="repeat-sharp" onClick={() => sharePost(latestPost.id)}></ion-icon>
                <h5>{latestPost.repostCount} re-post</h5>
              </ShareCounter>
            </div>
            <PostContent>
              <Header>
                <Link to={`/user/${latestPost.userId}`}>
                  <h2>{latestPost.name}</h2>
                </Link>
                {user.id === latestPost.userId && (
                  <IonIcon>
                    <ion-icon
                      onClick={handleEditButton}
                      name="pencil-outline"
                    ></ion-icon>
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
                          height={150}
                          width={150}
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
                )}
              </Header>
              {isEditing ? (
                <Input
                  onChange={(e) => setEditInput(e.target.value)}
                  autoFocus
                  defaultValue={editInput}
                />
              ) : (
                <ReactTagify
                  tagStyle={tagDisplay}
                  tagClicked={(t) => {
                    navigate(`/hashtag/${t.replace("#", "")}`);
                  }}
                >
                  <h3>{latestPost.text}</h3>
                </ReactTagify>
              )}
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
          {enableComments &&
            <ContainerComments>
              {
                comments.map((comment, index) => (
                  <Comment
                    key={index}
                    followerPic={comment.picture}
                    followerName={comment.userName}
                    text={comment.comment}
                  />
                ))
              }
              <BoxInput>
                <img src={latestPost.picture} />
                <input name="comment"
                  onChange={(e) => setNewComment(e.target.value)}
                  type="text"
                  placeholder="write a comment" ></input>
                <ion-icon onClick={sendComment} name="paper-plane-outline"></ion-icon>
              </BoxInput>
            </ContainerComments>
          }
        </>)}
    </>
  );
}

const PostCard = styled.div`
  width: 611px;
  background-color: #000000;
  margin-bottom:16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-bottom: 16px;
  z-index:1;
  padding: 16px;
  display: flex;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  ion-icon {
    font-size: 19px;
    color: white;
    margin-left: 17px;
    margin-top: 20px;
  }
  
   h3 {
    color:#ffffff;
    font-size: 11px;
    margin-left: 10px;
   }

   h4 {
   color:#ffffff;
   font-size: 11px;
  }
`;
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden; 
  img {
    width: 154px;
    height: 154px;
    border-radius: 0px;
  }
`;
const LinkInfo = styled.div`
  width: 347px;
  height: 154px;
  padding: 19px;

  h2 {
    color: #cecece;
    font-size: 16px;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    margin-bottom: 8px;
  }
  h3 {
    color: #9b9595;
    font-size: 11px;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    margin-bottom: 14px;
  }
  h4 {
    color: #cecece;
    font-size: 11px;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    margin-bottom: 10px;
  }
`;
const Input = styled.input`
  background: #ffffff;
  border-radius: 7px;
  width: 503px;
  height: 44px;
`;
const Box = styled.div`
  font-size: 35px;
  font-family: "Lato", sans-serif;
  font-weight: 400;
  border-radius: 50px;
  margin-bottom: 13px;
  text-align: center;
`;
const Button = styled.button`
  color: #000000;
  width: 134px;
  height: 37px;
  border-radius: 10px;
  margin-top: 50px;
  top: 508px;

  :hover {
    background: #1877f2;
  }
`;
const ContainerComments = styled.div`
  width: 611px;
  margin-bottom: 20px;
  padding: 16px;
  background-color: #1E1E1E;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  img {
      width: 39px;
      height: 39px;
      border-radius: 50%;
  }
`;
const BoxInput = styled.div`
display: flex;
 img {
    width: 39px;
    height: 39px;
    border-radius: 50%;
};

 ion-icon {
    background-color:#252525;
    font-size: 19px;
    color: #ffffff;
    margin-top:12px;
}

  input {
   width: 510px;
   height: 39px;
   margin-left:20px;
   background: #252525;
   border-radius: 8px;
   border:none;
   color:#ffffff;
   
   ::placeholder {
    font-family: 'Lato';
    font-size: 14px;
    color: #575757;
    margin-left: 25px;
   };

  }
`

const RepostDisplay = styled.div`
    width: 611px;
    height:100%;
    border-radius: 16px;
    background-color:#333333;
    display:flex;
    flex-direction:column;
    padding-top:14px;
    z-index: 0;
    margin-bottom: 15px;
`
const RepostByDiv = styled.div`
    width:100%;
    display:flex;
    height: 6px;
    flex-direction:row;
    justify-content:flex-start;
    align-items:center;
    h4{
        font-size:13px;
        color:#ffffff;
        font-family: "Lato", sans-serif;
        margin-left:8px;
    }
    ion-icon{
        font-size:18px;
        color:#ffffff;
        font-family: "Lato", sans-serif;
        margin-left:8px;
    }
  `
const RepostCard = styled.div`
width: 611px;
background-color: #000000;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
margin-bottom: 16px;
position:relative;
top: 16px;
z-index:1;
padding: 16px;
display: flex;
img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
ion-icon {
  font-size: 19px;
  color: red;
  margin-left: 17px;
  margin-top: 20px;
}
`;

const ShareCounter = styled.div`
  color:#ffffff;
    ion-icon{
      font-size:22px;
      color:#ffffff;
      font-family: "Lato", sans-serif;
    }
    h5{
      font-size:11px;
        color:#ffffff;
        font-family: "Lato", sans-serif;
        margin-left:8px;
    }
  `

