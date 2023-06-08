import React,{useState} from 'react';
import Navbar from '../components/Navbar';
import {Link,useNavigate } from 'react-router-dom'


const Login = () => {
    let navigate=useNavigate()
    const [credentials, setCredentials] = useState({email:"",password:""})
    const onChange=(event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value})

    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!credentials.email || !credentials.password) {
            console.log('Please fill in all required fields');
            return;
          }
        try {
          const response =  await fetch("http://localhost:5000/api/loginuser", {
            
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
                email:credentials.email,
                password:credentials.password})
          });
      
          if (!response.ok) {
              alert("enter valid credentials")
            throw new Error('Request failed with status ' + response.status);
          }
      
          const json = await response.json();
          console.log(json);
      
          if (!json.success) {
            alert("Enter valid credentials");
          }
          if(json.success){
              
               localStorage.setItem("authToken",json.authToken)
               localStorage.setItem("userEmail",credentials.email)
               console.log(localStorage.getItem('authToken'))

              navigate("/");
          }
        } catch (error) {
          console.log(error);
          
        }
      };
    return  <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
    <div>
      <Navbar />
    </div><div>

          <div className="container">

<form  className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
  
 
  <div className="form-group">
    <label htmlFor="email" className="text-white bg-dark">Email</label>
    <input type="email" className="form-control"  name="email" value={credentials.email}  onChange={onChange} />
    {console.log(credentials.email)}
  </div>
  <div className="form-group">
    <label htmlFor="password" className="text-white bg-dark">Password</label>
    <input type="password" className="form-control"  name="password" value={credentials.password}  onChange={onChange}/>
    {console.log(credentials.password)}
  </div>
  
 
  <button type="submit" className="m-3 btn btn-success">Submit</button>
    <Link to="/createuser" className="m-3 btn btn-danger">I am a new user</Link>
</form>
</div>
</div>
    </div>;
}



export default Login;