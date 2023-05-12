import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/user/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import Header from "./components/shared/Header";

// pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateUser from "./pages/CreateUser";
import TCDetails from "./pages/TCDetails";

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/tcDetails/:id" element={<TCDetails />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
      <ToastContainer />
    </UserProvider>
  );
}
