import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import './App.css';
import { NotFound } from "./pages/NotFound";
import { WithNavbar } from "./pages/WithNavbar";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<WithNavbar />} />
        <Route path="/signin" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
