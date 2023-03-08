import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Hotel from "./Pages/Hotel/Hotel";
import List from "./Pages/Lists/List";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List/>} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/login" element={<Login/>} />
        
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
