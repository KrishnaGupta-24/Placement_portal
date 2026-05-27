import { useEffect, useState } from "react";

function Applications(){
  const [apps,setApps] = useState([]);

  useEffect(()=>{
  const userId = localStorage.getItem("userId");

  fetch("http://localhost:5000/applications/" + userId,{
    headers:{
      Authorization: localStorage.getItem("token")   // 🔥 IMPORTANT
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

  return (
    <div>
      <h2>My Applications</h2>
      {apps.map(a=>(
  <div key={a._id} className="card">
    <h3>{a.job?.title}</h3>
    <p>{a.job?.company}</p>
    <p>Status: {a.status}</p>
  </div>
))}
    </div>
  );
}

export default Applications;