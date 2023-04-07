import axios from "axios";
import React, { useState } from "react";
import UserPage from "./UserPage";
import AdminDashboard from "./Dashboard";
import { BrowserRouter } from "react-router-dom"

function Login () {
  const [refreshtoken, setRefreshtoken] = useState("")
  const [accesstoken,setAccesstoken] =useState('')
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [userid , setUserid] =useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://authserver-4m3k.onrender.com/login", {username, password});
      console.log(res.status);
      console.log(res.data);
      console.log("access: " + res.headers['auth-token-access'])
      setUserid(res.data.username);
      setUser(res.data);
      setAccesstoken(res.headers['auth-token-access']);
      setRefreshtoken(res.headers['auth-token-refresh']);
      if (res.status === 200) {
      //  handleLogin();
      } else {
        alert("Invalid username or password");
      }
    } catch (err) {
        console.log(err);
    }
  } 


  return (
    <div>
      {user?.username ?(user?.username==="admin" ? (
        <>
          <h1>Welcome {user.username}</h1>
          <BrowserRouter>
          <AdminDashboard accessToken={accesstoken} refreshToken={refreshtoken} setAccessToken={setAccesstoken}/>
          </BrowserRouter> 
          
        </>
      ):(
        <>
          <h1>Welcome {user.username}</h1>
          <BrowserRouter>
          <UserPage username={username} refreshtoken={refreshtoken} accesstoken={accesstoken} setAccesstoken={setAccesstoken}/>
          </BrowserRouter>
          
        </>
      ) ): (
      <form >
        <h1>Login</h1>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>Login</button>
      </form>
      )}
    </div>
  )
      
};

export default Login;

