import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../auth";
import axios from "axios";

export default function SignInPage() {
  const [format, setFormat] = useState({ email: "", password: "" });
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function sendUser(e) {
    e.preventDefault();
    axios
      .post("https://linkr-api-0l14.onrender.com/signin", format)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        navigate("/timeline");
      })
      .catch((res) => alert(res.data));
  }

  function register(e) {
    setFormat({ ...format, [e.target.name]: e.target.value });
  }

  return (
    <PageContainer>
      <TitleContainer>
        <h1>linkr</h1>
        <h2>
          save, share and discover <br /> the best links on the web
        </h2>
      </TitleContainer>
      <FormContainer onSubmit={sendUser}>
        <input
          placeholder="e-mail"
          data-identifier="input-email"
          type="email"
          name="email"
          value={format.email}
          onChange={register}
        />
        <input
          placeholder="password"
          data-identifier="input-password"
          type="password"
          name="password"
          value={format.password}
          onChange={register}
        />
        <ButtonLogin type="submit">
          <h1>Log In</h1>
        </ButtonLogin>
        <Link to="/signup">
          <ButtonSignin>First time? Create an account! </ButtonSignin>
        </Link>
      </FormContainer>
    </PageContainer>
  );
}

const ButtonSignin = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-decoration-line: underline;
  color: white;
`;
const ButtonLogin = styled.button`
  width: 429px;
  height: 65px;
  background: #1877f2;
  border-radius: 6px;
  h1 {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: white;
  }
`;
const PageContainer = styled.div`
  display: flex;
  height: 950px;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 1000px;
  background-color: black;
  justify-content: center;
  h1 {
    font-family: "Passion One";
    font-style: normal;
    font-weight: 700;
    font-size: 106px;
    line-height: 117px;
    color: white;
    margin-left: 144px;
  }
  h2 {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: white;
    margin-left: 144px;
  }
`;
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-left: 51px;
  justify-content: center;
  input {
    width: 429px;
    height: 65px;
    background: #ffffff;
    border-radius: 6px;
    margin-bottom: 10px;
  }
`;
