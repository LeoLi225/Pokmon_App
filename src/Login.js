import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "user" && password === "userpass") {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", "user");
        window.location.href = "/user";
      } else if (username === "admin" && password === "adminpass") {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", "admin");
        window.location.href = "/admin";
      } else {
        alert("Invalid username or password");
      }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
