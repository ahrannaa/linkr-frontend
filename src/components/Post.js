import styled from "styled-components";

export default function Post({ latestPost }) {

    function linkRedirection(link){
        window.open(link, "_blank");
    }

    return (
        <PostCard>
            <img src={latestPost.picture} />
            <PostContent>
                <h2>{latestPost.name}</h2>
                <h3>{latestPost.text}</h3>
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
    )
}

const PostCard = styled.div`
    width: 611px;
    background-color: #000000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: 18px;
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
`
