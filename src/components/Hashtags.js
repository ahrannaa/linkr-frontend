import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Hashtags(props) {
  const [allHashtag, setAllHastag] = useState([]);
  const { infoHashtag, setInfoHashtag } = props;
  const navigate = useNavigate();

  useEffect(function seachHashtag() {
    const promise = axios.get(`http://localhost:4000/hashtags`);
    promise.then((response) => setAllHastag(response.data));
    promise.catch((resposta) => {
      console.log("DEU RUIM", resposta);
    });
  }, []);

  function openHashtag(hashtag) {
    const promise = axios.get(
      `http://localhost:4000/hashtags/${hashtag.hashtag}`
    );

    promise.then((response) => {
      setInfoHashtag(response.data)
      navigate(`/hashtag/${response.data.hashtag}`)
    });

    promise.catch((resposta) => {
      console.log("DEU RUIM", resposta);
    });


  }

 /*  return (
    <Hashtag
      onClick={() => {
        openHashtag(h);
      }}
    >
      #{h.hashtag}
    </Hashtag>
  );
})}
      </HashtagList >
    </HashtagsCard >
  ); */
}

const HashtagsCard = styled.div`
  position: absolute;
  margin-top: 207px;
  margin-left: 900px;
  width: 300px;
  height: 406px;
  background-color: black;
  border-radius: 16px;
`;

const Title = styled.h1`
  color: white;
  margin-left: 15px;
  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 27px;
  line-height: 40px;
`;
const Line = styled.div`
  width: 300px;
  height: 0px;
  border: 1px solid #484848;
`;

const HashtagList = styled.div`
  color: white;
  margin: 15px;
`;

const Hashtag = styled.h3`
  cursor: pointer;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 19px;
  margin-bottom: 10px;
`;
