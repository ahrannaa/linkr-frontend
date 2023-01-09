import styled from "styled-components";
import Search from "./search";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const { user, setUser } = useContext(AuthContext);
  const [infosUser, setInfosUser] = useState();
  const [displayButton, setDisplayButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return;
    }
    const config = { headers: { Authorization: `Bearer ${user}` } };
    axios
      .get("http://localhost:4000/info/user", config)
      .then((res) => {
        setInfosUser(res.data);
        console.log(infosUser);
      })
      .catch((res) => alert(res.data));
  }, [user]);

  function Logout() {
    setUser(null);
    navigate("/");
  }

  return (
    <BarLayout>
      <h1>linkr</h1>
      <Search />
      <UserDiv infosUser={infosUser}>
        <ion-icon
          name={displayButton ? "chevron-up-outline" : "chevron-down-outline"}
          onClick={() => setDisplayButton(!displayButton)}
        ></ion-icon>
        {/* <img src={infosUser[0].picture} /> */}
        <LogoutButton displayButton={displayButton} onClick={Logout}>
          <h2>Logout</h2>
        </LogoutButton>
      </UserDiv>
    </BarLayout>
  );
}

const LogoutButton = styled.button`
  width: 150px;
  height: 47px;
  background: #171717;
  border-radius: 0px 0px 20px 20px;
  position: absolute;
  top: 72px;
  right: 5px;
  display: ${(props) => (props.displayButton ? "flex" : "none")};
  h2 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: 0.05em;
    color: #ffffff;
    margin: auto auto;
  }
`;

const BarLayout = styled.div`
  width: 100%;
  height: 72px;
  background-color: #000000;
  position: fixed;
  box-shadow: 0px 4px 4px rgb(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 28px;
  z-index: 3;
  h1 {
    font-size: 49px;
    color: #ffffff;
    font-family: "Passion One", cursive;
    font-weight: 700;
  }
`;

const UserDiv = styled.div`
  display: flex;
  align-items: center;
  ion-icon {
    font-size: 26px;
    color: #ffffff;
  }
  img {
    width: 53px;
    height: 53px;
    border-radius: 50%;
    margin-left: 16px;
  }
`;
