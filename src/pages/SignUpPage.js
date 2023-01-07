import styled from "styled-components";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  return (
    <PageContainer>
      <TitleContainer>
        <h1>linkr</h1>
        <h2>
          save, share and discover <br /> the best links on the web
        </h2>
      </TitleContainer>
      <FormContainer>
        <input
          placeholder="e-mail"
          data-identifier="input-email"
          type="email"
          name="email"
        />
        <input
          placeholder="password"
          data-identifier="input-password"
          type="password"
          name="senha"
        />
        <input
          placeholder="username"
          data-identifier="input-username"
          type="text"
          name="username"
        />
        <input
          placeholder="picture url"
          data-identifier="input-picture"
          type="text"
          name="picture"
        />
        <ButtonLogin type="submit">
          <h1>Sign Up</h1>
        </ButtonLogin>
        <Link to="/">
          <ButtonSignup>First time? Create an account! </ButtonSignup>
        </Link>
      </FormContainer>
    </PageContainer>
  );
}

const ButtonSignup = styled.div`
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
