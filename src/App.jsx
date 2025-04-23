import Home from "./Pages/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./Pages/Signin";
import SignUp from "./Pages/Signup";
import { AuthProvider } from "./Pages/Context/AuthContext";
import { ChatContextProvider } from "./Pages/Context/ChatContext";
import { SelectContextProvider } from "./Pages/Context/SelectContext";
import Setting from "./Pages/Setting";
import SideBar from "./Pages/SideBar";
import Emoji from "./Pages/Emoji";
import "./index.css";
import { Navbar } from "@material-tailwind/react";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ChatContextProvider>
          <SelectContextProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/navbar" element={<Navbar />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/sidebar" element={<SideBar />} />
              <Route path="/emoji" element={<Emoji />} />
            </Routes>
          </SelectContextProvider>
        </ChatContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
