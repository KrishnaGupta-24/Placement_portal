import { useState } from "react";

function Register({ setPage }){

  const [form,setForm] = useState({
    name:"",
    email:"",
    password:"",
    role:"student"
  });

  const handleRegister = async () => {

    // 🔒 Validation
    if(!form.name || !form.email || !form.password){
      alert("Please fill all fields");
      return;
    }

    const res = await fetch("http://localhost:5000/register",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if(data._id){
      alert("Registered successfully");
      setPage("login");   // 🔥 go back to login
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>Register</h2>

        <input 
          placeholder="Full Name"
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />

        <input 
          placeholder="Email"
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <input 
          type="password"
          placeholder="Password"
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />

        {/* 🔥 ROLE SELECTION */}
        <select 
          onChange={(e)=>setForm({...form,role:e.target.value})}
        >
          <option value="student">Student</option>
          <option value="company">Company</option>
        </select>

        <button onClick={handleRegister}>
          Register
        </button>

        {/* 🔥 BACK TO LOGIN */}
        <p style={link} onClick={()=>setPage("login")}>
          Already have an account? Login
        </p>

      </div>
    </div>
  );
}

/* 🎨 STYLES */

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

export default Register;