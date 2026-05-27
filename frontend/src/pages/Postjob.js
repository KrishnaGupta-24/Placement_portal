import { useState } from "react";

function PostJob(){

  const [job,setJob] = useState({
    title:"",
    company:"",
    ctc:"",
    skills:""
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    await fetch("http://localhost:5000/job",{
      method:"POST",

      headers:{
        "Content-Type":"application/json",
        "Authorization": localStorage.getItem("token")
      },

      body: JSON.stringify({
        ...job,
        skills: job.skills.split(",")
      })
    });

    alert("Job Posted Successfully!");

    setJob({
      title:"",
      company:"",
      ctc:"",
      skills:""
    });
  };

  return (

    <div style={container}>

      <div style={card}>

        <h1 style={heading}>
          Post New Job
        </h1>

        <p style={subHeading}>
          Create opportunities for students
        </p>

        <form onSubmit={handleSubmit} style={form}>

          <div style={inputGroup}>

            <label style={label}>
              Job Title
            </label>

            <input
              style={input}
              placeholder="Frontend Developer"

              value={job.title}

              onChange={(e)=>
                setJob({
                  ...job,
                  title:e.target.value
                })
              }
            />

          </div>

          <div style={inputGroup}>

            <label style={label}>
              Company Name
            </label>

            <input
              style={input}
              placeholder="Google"

              value={job.company}

              onChange={(e)=>
                setJob({
                  ...job,
                  company:e.target.value
                })
              }
            />

          </div>

          <div style={inputGroup}>

            <label style={label}>
              Package / CTC
            </label>

            <input
              style={input}
              placeholder="12 LPA"

              value={job.ctc}

              onChange={(e)=>
                setJob({
                  ...job,
                  ctc:e.target.value
                })
              }
            />

          </div>

          <div style={inputGroup}>

            <label style={label}>
              Required Skills
            </label>

            <input
              style={input}
              placeholder="React, Node.js, MongoDB"

              value={job.skills}

              onChange={(e)=>
                setJob({
                  ...job,
                  skills:e.target.value
                })
              }
            />

          </div>

          <button style={button}>
            Post Job
          </button>

        </form>

      </div>

    </div>
  );
}

/* STYLES */

const container = {
  minHeight:"100vh",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  background:"#f4f7fb",
  padding:"20px"
};

const card = {
  width:"420px",
  background:"#fff",
  borderRadius:"18px",
  padding:"35px",
  boxShadow:"0 4px 18px rgba(0,0,0,0.1)"
};

const heading = {
  marginBottom:"5px",
  color:"#1e293b",
  textAlign:"center"
};

const subHeading = {
  textAlign:"center",
  color:"#64748b",
  marginBottom:"30px"
};

const form = {
  display:"flex",
  flexDirection:"column",
  gap:"20px"
};

const inputGroup = {
  display:"flex",
  flexDirection:"column"
};

const label = {
  marginBottom:"8px",
  fontWeight:"600",
  color:"#334155"
};

const input = {
  padding:"12px",
  border:"1px solid #cbd5e1",
  borderRadius:"10px",
  fontSize:"15px",
  outline:"none"
};

const button = {
  marginTop:"10px",
  padding:"14px",
  background:"#2563eb",
  color:"#fff",
  border:"none",
  borderRadius:"10px",
  fontSize:"16px",
  fontWeight:"600",
  cursor:"pointer"
};

export default PostJob;