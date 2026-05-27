import { useState } from "react";
import CompanyDashboard from "./pages/CompanyDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Applications from "./pages/Application";
import PostJob from "./pages/Postjob";
import ResumeUpload from "./pages/ResumeUpload";
import Layout from "./components/Layout";

function App() {

  const [page, setPage] = useState("login");

  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  // 🔒 NOT LOGGED IN
  if (!userId) {

    if(page === "register") return <Register setPage={setPage} />;
    if(page === "forgot") return <ForgotPassword setPage={setPage} />;
    if(page === "dashboard"){
  if(role === "company") return <CompanyDashboard />;
  return <Dashboard />;
}
    return <Login setPage={setPage} />;
  }

  // 🔓 LOGGED IN
  const renderPage = () => {

    if(page === "dashboard"){
      if(role === "company") return <CompanyDashboard />;
      return <Dashboard />;
    }

    if(page === "jobs"){
      if(role === "company") return <PostJob />;
      return <Jobs />;
    }
    if(page === "applications") return <Applications />;
    if(page === "resume"){
      return <ResumeUpload />;
    }
    return <Dashboard />;
  };

  return (
    <Layout setPage={setPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;