import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Signup(props) {
  let navigate = useNavigate();
  const [newUser,setNewUser] = useState({name:"",email:"",password:""})

  const onchange = (e) =>
  {
        setNewUser({...newUser,[e.target.name]:e.target.value})
  }
  const handleCreate = async(e) =>
  {
    e.preventDefault();
    const response =await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
            "Content-Type":"application/json"
            },
            body : JSON.stringify({name:newUser.name,email:newUser.email,password:newUser.password})
          });
          const json=await response.json()
          console.log(json)
          if(json.success===false)
          {
            console.log(false)
            props.showAlert("User exists","warning")
          }
          else
          {
          localStorage.setItem("token",json.authtoken);
          navigate("/")
          props.showAlert("Account created successfully.Sign in to continue","success")
          }
  }
  return (
    <>
    <h2 className="heading"><i class="fa-sharp fa-regular fa-note-sticky"></i>&nbsp;i-Notes</h2>
    <div className='signupbody'>
      <form onSubmit={handleCreate} className='formdesign'>
      <h3>SIGN UP</h3>
        <div className="form-group my-3">
          <label htmlFor="name">Name:</label>
          <input type="text" className="form-control" id="name" name="name"  autocomplete="off" onChange={onchange} />
        </div>        
        <div className="form-group my-3">
          <label htmlFor="email">Email address:</label>
          <input type="email" className="form-control" id="email" name="email" autocomplete="off" onChange={onchange}/>
        </div>
        <div className="form-group my-3">
          <label htmlFor="password">Password:</label>
          <input type="password" className="form-control" id="password" name="password" autocomplete="off" onChange={onchange} />
        </div>
        <button type="submit" className="submit2">Create my account</button>
      </form>
    </div>
    </>
  )
}
