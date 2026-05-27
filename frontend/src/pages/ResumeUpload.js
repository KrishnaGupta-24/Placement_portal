import { useState } from "react";

function ResumeUpload(){

  const [file,setFile] = useState(null);

  const uploadResume = async () => {

    if(!file){
      alert("Please select a resume");
      return;
    }

    const formData = new FormData();

    formData.append("resume", file);

    const res = await fetch(
      "http://localhost:5000/upload-resume",
      {
        method:"POST",

        headers:{
          Authorization:
            localStorage.getItem("token")
        },

        body: formData
      }
    );

    const data = await res.json();

    if(data._id){
      alert("Resume uploaded successfully");
    } else {
      alert("Upload failed");
    }
  };

  return (

    <div style={container}>

      <div style={card}>

        <h1 style={heading}>
          Upload Resume
        </h1>

        <p style={subText}>
          Upload your latest PDF resume
        </p>

        <input
          type="file"

          accept=".pdf"

          onChange={(e)=>
            setFile(e.target.files[0])
          }
        />

        <button
          style={button}
          onClick={uploadResume}
        >
          Upload Resume
        </button>

      </div>

    </div>
  );
}

const container = {
  minHeight:"100vh",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  background:"#f4f7fb"
};

const card = {
  background:"#fff",
  padding:"35px",
  borderRadius:"16px",
  boxShadow:"0 4px 15px rgba(0,0,0,0.1)",
  display:"flex",
  flexDirection:"column",
  gap:"20px",
  width:"400px"
};

const heading = {
  margin:0,
  color:"#1e293b"
};

const subText = {
  color:"#64748b"
};

const button = {
  padding:"12px",
  background:"#2563eb",
  color:"#fff",
  border:"none",
  borderRadius:"10px",
  cursor:"pointer",
  fontWeight:"600"
};

export default ResumeUpload;