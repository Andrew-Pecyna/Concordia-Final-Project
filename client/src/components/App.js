import { BrowserRouter, Routes, Route } from "react-router-dom";

// import NavBar from "./NavBar";
import BirdTestPage from "./BirdTestPage";
import GlobalStyle from "./GlobalStyles";
import LandingPage from "./LandingPage";
import RegisterForm from "./RegisterForm";
import TestNavigate from "./TestNavigate";
import Forum from "./Forum";

function App() {

  return (
    <BrowserRouter>
      <GlobalStyle />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<RegisterForm />} />
          <Route path="/test" element={<TestNavigate />} />
          <Route path="/birds" element={<BirdTestPage />} />
          <Route path="/forum" element={<Forum />} />
        </Routes>
    </BrowserRouter>
  );
}


export default App;
