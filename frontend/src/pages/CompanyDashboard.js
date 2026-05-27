import { useEffect, useState } from "react";

function CompanyDashboard(){

  const [apps,setApps] = useState([]);

  const fetchApps = ()=>{

    fetch("http://localhost:5000/company/applications",{
      headers:{
        "Content-Type":"application/json",
        "Authorization": localStorage.getItem("token")
      }
    })

    .then(res=>res.json())

    .then(data=>{

      if(Array.isArray(data)){
        setApps(data);
      }

    });
  };

  useEffect(()=>{
    fetchApps();
  },[]);

  // UPDATE STATUS
  const updateStatus = async (id, status) => {

    await fetch(
      "http://localhost:5000/application/status/" + id,
      {
        method:"PUT",

        headers:{
          "Content-Type":"application/json",
          "Authorization": localStorage.getItem("token")
        },

        body: JSON.stringify({ status })
      }
    );

    fetchApps();
  };

  return (

    <div style={container}>

      <h1 style={heading}>
        Applicants Dashboard
      </h1>

      <div style={grid}>

        {apps
  .filter(a => a.status === "Applied")
  .map(a=>(

          <div key={a._id} style={card}>

            <div style={topSection}>

              <h2 style={jobTitle}>
                {a.job?.title}
              </h2>

              <span style={statusBadge(a.status)}>
                {a.status}
              </span>

            </div>

            <div style={infoBox}>

              <p>
                <strong>Applicant:</strong>
                {" "}
                {a.user?.name}
              </p>

              <p>
                <strong>Email:</strong>
                
                {" "}
                {a.user?.email}
              </p>

              <p>
                <strong>Company:</strong>
                {" "}
                {a.job?.company}
              </p>
              {a.resume && (

  <a
    href={a.resume}

    target="_blank"

    rel="noreferrer"

    style={resumeBtn}
  >
    View Resume
  </a>

)}
            </div>

            <div style={buttonContainer}>

              <button
                style={acceptBtn}

                onClick={()=>
                  updateStatus(a._id,"Selected")
                }
              >
                Accept
              </button>

              <button
                style={rejectBtn}

                onClick={()=>
                  updateStatus(a._id,"Rejected")
                }
              >
                Reject
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

/* STYLES */

const container = {
  padding:"30px",
  background:"#f4f7fb",
  minHeight:"100vh"
};

const heading = {
  marginBottom:"25px",
  color:"#1e293b"
};

const grid = {
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",
  gap:"20px"
};

const card = {
  background:"#fff",
  borderRadius:"16px",
  padding:"22px",
  boxShadow:"0 4px 15px rgba(0,0,0,0.08)"
};

const topSection = {
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  marginBottom:"15px"
};

const jobTitle = {
  margin:0,
  color:"#0f172a"
};

const infoBox = {
  lineHeight:"1.8",
  color:"#334155"
};

const buttonContainer = {
  display:"flex",
  gap:"12px",
  marginTop:"20px"
};

const acceptBtn = {
  flex:1,
  padding:"12px",
  background:"#22c55e",
  color:"#fff",
  border:"none",
  borderRadius:"10px",
  fontWeight:"600",
  cursor:"pointer"
};

const rejectBtn = {
  flex:1,
  padding:"12px",
  background:"#ef4444",
  color:"#fff",
  border:"none",
  borderRadius:"10px",
  fontWeight:"600",
  cursor:"pointer"
};
const resumeBtn = {
  display:"inline-block",
  marginTop:"12px",
  padding:"10px 14px",
  background:"#2563eb",
  color:"#fff",
  textDecoration:"none",
  borderRadius:"8px",
  fontWeight:"600"
};

const statusBadge = (status) => ({

  padding:"6px 12px",

  borderRadius:"20px",

  fontSize:"13px",

  fontWeight:"600",

  color:"#fff",

  background:
    status === "Selected"
      ? "#22c55e"
      : status === "Rejected"
      ? "#ef4444"
      : "#3b82f6"
});

export default CompanyDashboard;