import { Route, Routes } from "react-router-dom";
import { TopNavbar } from "../components/Navbar";
import { Histories } from "./Histories";
import { Sale } from "./Sale";

export function WithNavbar() {
  return (
    <>
      <TopNavbar />

      <Routes>
        <Route path="/" element={<Sale />}>
          <Route path="histories" element={<Histories />} />
        </Route>
      </Routes>
    </>
  )
}