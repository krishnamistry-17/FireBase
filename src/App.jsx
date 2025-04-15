import Home from "./Pages/Home";
import NavBar from "./Pages/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./Pages/Signin";
import SignUp from "./Pages/Signup";
import { AuthProvider } from "./Pages/Context/AuthContext";
import { ChatContextProvider } from "./Pages/Context/ChatContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ChatContextProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </ChatContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
