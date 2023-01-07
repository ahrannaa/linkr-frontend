import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components"; 
import TimelinePage from "./pages/TimelinePage.js";
import SignInPage from "./pages/SignInPage.js";
import GlobalStyle from "./GlobalStyle";
import SignUpPage from "./pages/SignUpPage.js";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
