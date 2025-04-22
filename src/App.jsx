import Home from "./Pages/Home";
import NavBar from "./Pages/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./Pages/Signin";
import SignUp from "./Pages/Signup";
import { AuthProvider } from "./Pages/Context/AuthContext";
import { ChatContextProvider } from "./Pages/Context/ChatContext";
import { SelectContextProvider } from "./Pages/Context/SelectContext";
import Setting from "./Pages/Setting";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ChatContextProvider>
          <SelectContextProvider>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/setting" element={<Setting />} />
            </Routes>
          </SelectContextProvider>
        </ChatContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
