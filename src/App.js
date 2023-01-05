import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import TimelinePage from "./pages/TimelinePage.js" 

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/timeline" element={<TimelinePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;




