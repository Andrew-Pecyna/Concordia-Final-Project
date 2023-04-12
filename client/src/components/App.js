import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "./GlobalStyles";
import LandingPage from "./LandingPage";
import RegisterForm from "./RegisterForm";
import TestNavigate from "./TestNavigate";
import Forum from "./Forum";
import BirdDetails from "./BirdDetails";
import UserHome from "./UserHome";
import UserProfile from "./UserProfile";
import BirdCollection from "./BirdCollection";

function App() {

  return (
    <BrowserRouter>
      <GlobalStyle />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<RegisterForm />} />
          <Route path="/test" element={<TestNavigate />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/singleBird/:birdName" element={<BirdDetails />} />
          <Route path="/userHome" element={<UserHome />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/birdCollection" element={<BirdCollection />} />
        </Routes>
    </BrowserRouter>
  );
}


export default App;
