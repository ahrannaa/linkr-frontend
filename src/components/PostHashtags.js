import styled from "styled-components";

export default function PostHashtags(props){
    const {allHashtags} = props
    return(<>
         
                {allHashtags.map((h)=>{const {userName,picture,description,link}= h;
                return(
                    <PostCard>
            <img src={picture} alt="" />
            
                <PostContent>
                <h3> {userName}</h3>  
                <h3>{description}</h3>
                <h3>{link}</h3>
                </PostContent>
                </PostCard>
                )})} 
            
            </>
    )
}

const PostCard = styled.div`
    width: 611px;
    margin-bottom: 10px;
    background-color: #000000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius:16px;
    padding: 16px;
    display: flex;
    img{
        width:50px;
        height: 50px;
        border-radius: 50%;
    }
`
const PostContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 19px;
    margin-bottom:16px;
    h2{
        color: #ffffff;
        font-size:19px;
        font-family: 'Lato', sans-serif;
        font-weight: 400;
        margin-bottom: 13px;
    }
    h3{
        color: #b7b7b7;
        font-size:17px;
        font-family: 'Lato', sans-serif;
        font-weight: 400;
        margin-bottom: 13px;
    }
`