import { useEffect, useState } from "react";

function Jobs(){

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // FETCH JOBS
  useEffect(()=>{

    fetch("http://localhost:5000/jobs",{
      headers:{
        Authorization: token
      }
    })

    .then(res=>res.json())

    .then(data=>{

      if(Array.isArray(data)){
        setJobs(data);
        setFilteredJobs(data);
      }

    });

  },[token]);

  // FETCH APPLIED JOBS
  useEffect(()=>{

    fetch(
      "http://localhost:5000/applications/" + userId,
      {
        headers:{
          Authorization: token
        }
      }
    )

    .then(res=>res.json())

    .then(data=>{

      if(Array.isArray(data)){

        const ids = data.map(
          a => a.jobId.toString()
        );

        setAppliedJobs(ids);

      } else {

        setAppliedJobs([]);
      }

    });

  },[token, userId]);

  // SEARCH FILTER
  useEffect(()=>{

    const filtered = jobs.filter(job =>

      job.title
        .toLowerCase()
        .includes(search.toLowerCase())

      ||

      job.company
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredJobs(filtered);

  },[search, jobs]);

  // APPLY JOB
  const applyJob = async (jobId) => {

    if(appliedJobs.includes(jobId.toString())){
      return;
    }

    const res = await fetch(
      "http://localhost:5000/apply",
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json",
          Authorization: token
        },

        body: JSON.stringify({
          userId,
          jobId
        })
      }
    );

    const data = await res.json();

    if(data._id){

      alert("Applied successfully");

      setAppliedJobs(prev => [
        ...prev,
        jobId.toString()
      ]);

    } else {

      alert(data.message || "Error applying");
    }
  };

  return (

    <div>

      <h2 style={{marginBottom:"15px"}}>
        Job Listings
      </h2>

      {/* SEARCH */}

      <input
        placeholder="Search jobs..."

        value={search}

        onChange={(e)=>
          setSearch(e.target.value)
        }

        style={{
          padding:"10px",
          width:"100%",
          marginBottom:"20px",
          borderRadius:"6px",
          border:"1px solid #ddd"
        }}
      />

      {/* JOB GRID */}

      <div className="grid">

        {filteredJobs.map(job=>(

          <div key={job._id} className="card">

            {/* HEADER */}

            <div style={{
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center"
            }}>

              <h3>{job.title}</h3>

              <span style={{
                padding:"4px 10px",
                borderRadius:"20px",
                fontSize:"12px",
                background:
                  job.status === "Open"
                    ? "#e1f5ee"
                    : "#faece7",

                color:
                  job.status === "Open"
                    ? "#1d9e75"
                    : "#d85a30"
              }}>
                {job.status}
              </span>

            </div>

            {/* COMPANY */}

            <p style={{color:"#666"}}>
              {job.company}
            </p>

            {/* CTC */}

            <p style={{
              color:"green",
              fontWeight:"bold",
              margin:"8px 0"
            }}>
              {job.ctc}
            </p>

            {/* SKILLS */}

            <div style={{marginBottom:"10px"}}>

              {job.skills?.map((skill,i)=>(

                <span
                  key={i}

                  style={{
                    background:"#eef3fb",
                    padding:"4px 8px",
                    borderRadius:"6px",
                    marginRight:"5px",
                    fontSize:"12px"
                  }}
                >
                  {skill}
                </span>

              ))}

            </div>

            {/* FOOTER */}

            <div style={{
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center"
            }}>

              <span style={{
                fontSize:"12px",
                color:"#888"
              }}>
                Deadline: {job.deadline}
              </span>

              {appliedJobs.includes(job._id.toString()) ? (

                <button style={appliedBtn}>
                  Applied
                </button>

              ) : (

                <button
                  className="btn"

                  onClick={()=>
                    applyJob(job._id)
                  }
                >
                  Apply
                </button>

              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

/* STYLES */

const appliedBtn = {
  background:"#ccc",
  border:"none",
  padding:"8px 14px",
  borderRadius:"6px",
  cursor:"not-allowed"
};

export default Jobs;