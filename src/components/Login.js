import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {

  const [user, setUser] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: user.email, password: user.password })
    });
    const json = await response.json()
    console.log(json)
    if (json.success) {
      //save the authtoken and redirect to home page
      localStorage.setItem('token', json.jwt_token);
      navigate("/home");
      props.showAlert("Sign in successful","success")
    }
    else {
      props.showAlert("Invalid credentials","danger")
    }
  }
  return (
    <>
    <h2 className="heading"><i class="fa-sharp fa-regular fa-note-sticky"></i>&nbsp;i-Notes</h2>
    <div className="loginbody">
      <form onSubmit={handleSubmit} className='formdesign'>
      <h3>LOGIN</h3>
      <div className="formbody">
        <div className="form-group">
          <i class="fa-solid fa-envelope"></i>
          <input type="email" className="form-control my-3" id="email" name="email" value={user.email} placeholder="Enter email" autocomplete="off" onChange={onChange} />
        </div>
        <div className="form-group">
          <i class="fa-sharp fa-solid fa-key"></i>
          <input type="password" className="form-control my-2" id="password" name="password" value={user.password} placeholder="Password" autocomplete="off" onChange={onChange} />
        </div>
        </div>
        <div className="formbottom">
        <button type="submit" className='submit'>Sign In</button><br/>
        <span className="signup">New here?<a className="mx-2 my-2" href="/signup">Create Account</a></span>
        </div>
      </form>
    </div>
    </>
  )
}
