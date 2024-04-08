import React, { useState } from 'react'
import { useNavigate} from 'react-router'

const Signup = () => {

    let navigate = useNavigate();
    const [creds, setCreds] = useState({
        name:"",
        email: "",
        password:"",
        cpassword:""
    }); 
const handleSubmit = async(e) => {
    e.preventDefault();
    const {name, email, password} = creds;
    const response = await fetch(`http://localhost:8000/api/auth/createuser`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
         // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwYWRhMWVkM2QyMmEyMDJmZDlmNzEzIn0sImlhdCI6MTcxMjAwNDk3M30.q4Sh0HWtOhxG5q5wYwHWcbCXaFfftkmc4Kx2jrsl6So"
        },
        body: JSON.stringify({name, email, password})
      });
      const json = await response.json();
      console.log(json);
        //store auth token and redirect to the homepage
        localStorage.setItem('token',json.authtoken);
        navigate('/login');
    }
    const onChange =(e)=>{
        setCreds({ ...creds, [e.target.name]: e.target.value });
    };
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" id="name" onChange={onChange} minLength={3} required name="name" /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} minLength={5} required name="email" aria-describedby="emailHelp" />
                    <div id="email" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cnfpassword" className="form-label">Confirm Password</label>
                    <input type="cnfpassword" className="form-control" name="cnfpassword" id="cnfpassword" onChange={onChange}  minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
