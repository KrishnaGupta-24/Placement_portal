function Topbar(){
  return (
    <div style={{
      height:"60px",
      background:"#fff",
      display:"flex",
      alignItems:"center",
      justifyContent:"space-between",
      padding:"0 20px",
      borderBottom:"1px solid #ddd"
    }}>
      <h3>Placement Portal</h3>

      {/* 🔥 LOGOUT BUTTON */}
      <button 
        onClick={()=>{
          localStorage.clear();        // remove user data
          window.location.reload();    // reload app
        }}
        style={{
          background:"#d9534f",
          color:"#fff",
          border:"none",
          padding:"6px 12px",
          borderRadius:"6px",
          cursor:"pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Topbar;