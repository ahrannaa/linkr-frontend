import { useState, useContext} from "react";
import styled from "styled-components";
import axios from "axios";
import AuthContext from "../auth";


export default function NewPost({ dataPostReceived, setDataPostReceived }) {
    const [formPost, setFormPost] = useState({ text: "", link: "" })
    const [buttonClicked, setButtonClicked] = useState(false)
    const { user } = useContext(AuthContext);
   

    function handlePostForm(e) {
        const { name, value } = e.target
        setFormPost({ ...formPost, [name]: value })
    }

    function sendPostData(e) {
        e.preventDefault()
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const body = formPost

        axios.post("http://localhost:4000/posts", body, config)
            .then(() => {
                setDataPostReceived(true)
                setButtonClicked(false)
            })
            .catch((err) => {
                console.log(err)
                alert("Houve um erro ao publicar seu link")
            })
    }

    function publishActions(e){
        sendPostData(e)
        setButtonClicked(true)
    }


    return (
        <NewPostCard>

            <img onClick={() => console.log(user)} src={user.picture} alt=""/>
            <FormContent onSubmit={publishActions}>

                <h2>What are you going to share today?</h2>
                <LinkInput
                    name="link"
                    value={formPost.link}
                    onChange={handlePostForm}
                    type="text"
                    placeholder="http://..."
                    required
                />
                <PostInput
                    name="text"
                    value={formPost.text}
                    onChange={handlePostForm}
                    type="text"
                    placeholder="Awesome article about #javascript"
                />
                {buttonClicked?(
                    <>
                    {!dataPostReceived && <button type="submit" disabled>Publishing...</button>}
                    </>
                ):(<button type="submit" >Publish</button>)}
            </FormContent>
        </NewPostCard>
    )
}

const NewPostCard = styled.div`
    width: 611px;
    background-color: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius:16px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    margin-bottom:29px;
    img{
        width:50px;
        height: 50px;
        border-radius: 50%;
    }
`
const FormContent = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    h2{
        color: #707070;
        font-size:20px;
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        margin-bottom: 10px;
        margin-right: 207px;
    }
    button{
        display:flex;
        justify-content:center;
        align-items:center;
        color: #ffffff;
        width: 112px;
        height: 31px;
        border-radius: 5px;
        border: 2px solid #1877F2;
        background-color:#1877F2;
        font-family: 'Lato', sans-serif;
    }
`
const LinkInput = styled.input`
        width: 503px;
        height: 30px;
        padding: 6px 12px;
        border-radius: 5px;
        border: 2px solid #EFEFEF;
        margin-bottom: 6px;
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        color: #666666;
        font-size: 15PX;
        background-color: #EFEFEF;
        ::placeholder{
            color: #949494;
        }
`

const PostInput = styled.input`
    width: 503px;
    height: 66px;
    padding: 6px 12px;
    border-radius: 5px;
    border: 2px solid #EFEFEF;
    font-family: 'Lato', sans-serif;
    margin-bottom: 7px;
    font-weight: 300;
    color: #666666;
    font-size: 15PX;
    background-color: #EFEFEF;
    ::placeholder{
        color: #949494;
    }
`