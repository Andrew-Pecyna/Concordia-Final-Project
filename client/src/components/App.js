import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

// import NavBar from "./NavBar";
import BirdTestPage from "./BirdTestPage";
import GlobalStyle from "./GlobalStyles";
import LandingPage from "./LandingPage";
import RegisterForm from "./RegisterForm";

function App() {

  return (
    <BrowserRouter>
      <GlobalStyle />
        <Routes>
          <Route path="/birds" element={<BirdTestPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<RegisterForm />} />
        </Routes>
    </BrowserRouter>
  );
}


export default App;
