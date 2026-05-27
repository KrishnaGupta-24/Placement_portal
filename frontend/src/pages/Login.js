import { useState } from "react";

function Login({ setPage }){

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async () => {
    if(!email || !password){
      alert("Please fill all fields");
      return;
    }

    const res = await fetch("http://localhost:5000/login",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({email,password})
    });

    const data = await res.json();

    if(data.token){
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("role", data.user.role);
      setPage("dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>Login</h2>

        <input 
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input 
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        {/* 🔥 IMPORTANT LINKS */}
        <p style={link} onClick={()=>setPage("register")}>
          Don’t have an account? Register
        </p>

        <p style={link} onClick={()=>setPage("forgot")}>
          Forgot Password?
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

export default Login;