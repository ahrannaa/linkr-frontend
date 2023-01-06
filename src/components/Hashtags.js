//import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Hashtags() {
  const [allHashtag, setAllHastag] = useState([
    "#uhuul",
    "#Energia",
    "#Natureza",
    "#Viagem",
  ]);

  // useEffect(()=> seachHashtag(),[])
  //  function seachHashtag() {
  //     const promise = axios.get(``)
  //     promise.then((response)=> setAllHastag(response))
  //   }

  function openHashtag(h) {
    console.log(h);
    const noHashtag = h.split("#");
    console.log(noHashtag[1]);
    //axios.get(``)
  }

  return (
    <HashtagsCard>
      <Title> trending </Title>
      <Line />
      <HashtagList>
        {allHashtag.map((h) => {
          return (
            <Hashtag
              onClick={() => {
                openHashtag(h);
              }}
            >
              {h}
            </Hashtag>
          );
        })}
      </HashtagList>
    </HashtagsCard>
  );
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
