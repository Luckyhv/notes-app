import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'


const Login = () => {
    const [details, setdetails] = useState({ email: "", password: "" });
    let history = useHistory();
    const onchange = (e) => {
        setdetails({ ...details, [e.target.name]: e.target.value })
    }
    const handlesubmit = (async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: details.email, password: details.password })
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            history.push("/");

        }
        else {
            alert("Invalid credentials");
        }
    
    })
return (
    <div>
        <form onSubmit={handlesubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={details.email} id="email" name='email' aria-describedby="emailHelp" onChange={onchange} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={details.password} id="password" name='password' onChange={onchange} />
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    </div>
)
}

export default Login
