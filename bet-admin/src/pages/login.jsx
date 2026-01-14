import React from 'react'

const Login = () => {
  return (
    <div className="page">
      <h1>Login</h1>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  )
}

export default Login
