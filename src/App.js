import { BrowserRouter, Route, Routes } from "react-router-dom";
import TimelinePage from "./pages/TimelinePage.js";
import SignInPage from "./pages/SignInPage.js";
import GlobalStyle from "./GlobalStyle";
import SignUpPage from "./pages/SignUpPage.js";
import AuthContext from "./auth.js";
import { useLocalStorage } from "./useLocalStorage.js";
import UserPage from "./pages/UserPage.js";

function App() {
  const [user, setUser] = useLocalStorage("user", null);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <AuthContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/user/:id" element={<UserPage />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
