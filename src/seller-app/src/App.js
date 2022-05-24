import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Sale } from "./pages/Sale";
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sale" element={<Sale />} />
      </Routes>
    </Router>
  );
}
