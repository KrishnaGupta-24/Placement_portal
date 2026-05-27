import { useEffect, useState } from "react";

function Dashboard(){

  const [jobs, setJobs] = useState([]);
  const [apps, setApps] = useState([]);

  // 🔥 Fetch data
  useEffect(()=>{
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    // fetch jobs
    fetch("http://localhost:5000/jobs",{
      headers:{
        Authorization: token
      }
    })
    .then(res=>res.json())
    .then(data=>{
      if(Array.isArray(data)){
        setJobs(data);
      } else {
        setJobs([]);
      }
    });

    // fetch applications
    fetch("http://localhost:5000/applications/" + userId,{
      headers:{
        Authorization: token
      }
    })
    .then(res=>res.json())
    .then(data=>{
      if(Array.isArray(data)){
        setApps(data);
      } else {
        setApps([]);
      }
    });

  },[]);

  // 🔥 SAFE ARRAY
  const safeApps = Array.isArray(apps) ? apps : [];

  return (
    <div>
      <h2 style={{marginBottom:"20px"}}>Dashboard</h2>

      {/* 🔥 STATS */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(4,1fr)",
        gap:"15px",
        marginBottom:"25px"
      }}>

        <div style={statCard}>
          <p>Total Jobs</p>
          <h2>{jobs.length}</h2>
        </div>

        <div style={statCard}>
          <p>Applications</p>
          <h2>{safeApps.length}</h2>
        </div>

        <div style={statCard}>
          <p>Active</p>
          <h2>
            {safeApps.filter(a=>a.status==="Applied").length}
          </h2>
        </div>

        <div style={statCard}>
          <p>Offers</p>
          <h2>
            {safeApps.filter(a=>a.status==="Offered").length}
          </h2>
        </div>

      </div>

      {/* 🔥 TWO COLUMN SECTION */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"1fr 1fr",
        gap:"20px"
      }}>

        {/* RECENT JOBS */}
        <div style={box}>
          <h3>Recent Jobs</h3>

          {jobs.slice(0,3).map(job=>(
            <div key={job._id} style={jobItem}>
              <div>
                <strong>{job.title}</strong>
                <p style={{fontSize:"12px",color:"#666"}}>
                  {job.company}
                </p>
              </div>
            </div>
          ))}

        </div>

        {/* APPLICATION TIMELINE */}
        <div style={box}>
          <h3>Application Timeline</h3>

          {safeApps.map((a,index)=>(
            <div key={index} style={timelineItem}>
              <div style={dot}></div>
              <div>
                <strong>{a.status}</strong>
                <p style={{fontSize:"12px",color:"#666"}}>
                  {a.job?.title || "Job"}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

/* 🎨 STYLES */

const statCard = {
  background:"#1a3c5e",
  color:"#fff",
  padding:"15px",
  borderRadius:"10px",
  textAlign:"center"
};

const box = {
  background:"#fff",
  padding:"15px",
  borderRadius:"10px",
  boxShadow:"0 2px 6px rgba(0,0,0,0.1)"
};

const jobItem = {
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  padding:"10px 0",
  borderBottom:"1px solid #eee"
};

const timelineItem = {
  display:"flex",
  gap:"10px",
  marginBottom:"10px",
  alignItems:"center"
};

const dot = {
  width:"10px",
  height:"10px",
  borderRadius:"50%",
  background:"#3b7dd8"
};

export default Dashboard;