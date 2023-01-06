import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import TimelinePage from "./pages/TimelinePage.js";
import UserPage from "./pages/UserPage.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
