import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function Layout({ children, setPage }) {
  return (
    <div className="app">
      <Sidebar setPage={setPage} />

      <div className="main">
        <Topbar />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;