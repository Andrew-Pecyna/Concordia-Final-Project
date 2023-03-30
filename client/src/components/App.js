import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

// import NavBar from "./NavBar";
import BirdTestPage from "./BirdTestPage";
import GlobalStyle from "./GlobalStyles";
import LandingPage from "./LandingPage";

function App() {

  return (
    <BrowserRouter>
      {/* <PageContainer> */}
      <GlobalStyle />
        <Routes>
          <Route path="/birds" element={<BirdTestPage />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      {/* </PageContainer> */}
    </BrowserRouter>
  );
}

// const PageContainer = styled.div`
// display: flex;
// flex-direction: column;
// margin: 0px;
// padding: 0px;
// `

export default App;
