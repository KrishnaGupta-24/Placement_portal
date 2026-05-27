function Sidebar({ setPage }) {
  const role = localStorage.getItem("role");

  return (
    <div className="sidebar">
      <div className="logo">
        Place<span>IQ</span>
      </div>

      <div className="menu-item" onClick={()=>setPage("dashboard")}>
        Dashboard
      </div>

      {role === "student" && (
        <>
          <div className="menu-item" onClick={()=>setPage("jobs")}>
            Jobs
          </div>

          <div className="menu-item" onClick={()=>setPage("applications")}>
            Applications
          </div>
          <div className="menu-item" onClick={()=>setPage("resume")}>
            Resume
          </div>
        </>
      )}

      {role === "company" && (
        <div className="menu-item" onClick={()=>setPage("jobs")}>
          Post Job
        </div>
      )}
    </div>
  );
}

export default Sidebar;