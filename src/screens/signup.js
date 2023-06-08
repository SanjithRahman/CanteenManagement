import React,{useState} from 'react';
import Navbar from '../components/Navbar';
import {Link,useNavigate } from 'react-router-dom'

const Signup = () => {
    let navigate=useNavigate()
    let [address, setAddress] = useState("");


    const [credentials, setCredentials] = useState({name:"",email:"",password:"",geolocation:""})
    const onChange=(event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value})

    }
    const handleClick =async(e)=>{
      e.preventDefault();
      try {
        const navLocation = () => {
          return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej);
          });
        };
      
        const latlong = await navLocation();
        const latitude = latlong.coords.latitude;
        const longitude = latlong.coords.longitude;
        console.log(latitude, longitude);
      
        const response = await fetch("http://localhost:5000/api/getlocation", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ latlong: { lat: latitude, long: longitude } })
        });
      
        const { location } = await response.json();
        // console.log(location);
        setAddress(location);
        setCredentials({ ...credentials, [e.target.name]: location });
      } catch (error) {
        console.error('Error occurred:', error);
      }
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if (!credentials.name || !credentials.location || !credentials.email || !credentials.password) {
            console.log('Please fill in all required fields');
            return;
          }
        try {
          const response =  await fetch("http://localhost:5000/api/createuser", {
            
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
                   name:credentials.name,
                   email:credentials.email,
                   password:credentials.password,
                   location:credentials.location


            })
          });
      
          if (!response.ok) {
            throw new Error('Request failed with status ' + response.status);
          }
      
          const json1 = await response.json();
          console.log(json1);
      
          if (!json1.success) {
            alert("Enter valid credentials");
          }
          navigate("/");
        } catch (error) {
          console.log(error);
          
        }
      };
      
      
    
    return <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
    <div>
    <Navbar />
    </div><div>
        <div className="container">

<form  className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
  <div className="m-3">
    <label htmlFor="name"  className="text-white bg-dark">Name</label>
    <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} />
   {console.log(credentials.name)}
  </div>
  <div className="m-3">
    <label htmlFor="password" className="text-white bg-dark">Password</label>
    <input type="password" className="form-control"  name="password" value={credentials.password}  onChange={onChange}/>
    {console.log(credentials.password)}
  </div>
  <div className="m-3">
    <label htmlFor="email"  className="text-white bg-dark">Email</label>
    <input type="email" className="form-control"  name="email" value={credentials.email}  onChange={onChange} />
    {console.log(credentials.email)}
  </div>
  <div className="m-3">
              <label htmlFor="location" className="form-label">Address</label>
              <fieldset>
                <input type="text" className="form-control" name='address' placeholder='"Click below for fetching address"' value={address} onChange={(e)=>setAddress(e.target.value)}  />
              </fieldset>
  </div>
  <div className="m-3">
              <button type="button" onClick={handleClick} name="location" className=" btn btn-success">Click for current Location </button>
            </div>
            {console.log(address)}

  {/* <div className="m-3">
    <label htmlFor="location"  className="text-white bg-dark">Location</label>
    <input type="text" className="form-control"  name="name" value={"palakkad,kerala"}   />
    {console.log(credentials.location)}
  </div> */}
 
  <button type="submit" className="m-3 btn btn-success">Submit</button>
    <Link to="/login" className="m-3 btn btn-danger">Already User</Link>
</form>
</div>
    </div>;
    </div>
}



export default Signup;