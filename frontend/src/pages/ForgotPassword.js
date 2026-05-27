import { useState } from "react";

function ForgotPassword({ setPage }){

  const [email,setEmail] = useState("");

  const handleReset = () => {
    if(!email){
      alert("Enter email");
      return;
    }

    alert("Password reset link sent (dummy)");
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>Forgot Password</h2>

        <input 
          placeholder="Enter your email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <button onClick={handleReset}>
          Send Reset Link
        </button>

        <p style={link} onClick={()=>setPage("login")}>
          Back to Login
        </p>

      </div>
    </div>
  );
}

const container = {
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  height:"100vh",
  background:"#f4f7fb"
};

const card = {
  background:"#fff",
  padding:"30px",
  borderRadius:"10px",
  width:"300px",
  display:"flex",
  flexDirection:"column",
  gap:"10px",
  boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
};

const link = {
  color:"#3b7dd8",
  cursor:"pointer",
  fontSize:"14px"
};

export default ForgotPassword;