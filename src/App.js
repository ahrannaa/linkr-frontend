import { BrowserRouter, Route, Routes } from "react-router-dom";

import TimelinePage from "./pages/TimelinePage.js";
import SignInPage from "./pages/SignInPage.js";
import GlobalStyle from "./GlobalStyle";
import SignUpPage from "./pages/SignUpPage.js";
import UserPage from "./pages/UserPage.js";
import HashtagPage from "./pages/HashtagPage.js";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/hashtag/:hashtag" element = {<HashtagPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
