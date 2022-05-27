import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Sale } from "./pages/Sale";
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sale />} />
        <Route path="/signin" element={<Login />} />
      </Routes>
    </Router>
  );
}
