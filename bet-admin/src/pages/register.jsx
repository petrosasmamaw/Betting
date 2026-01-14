import React from 'react'

const Register = () => {
  return (
    <div className="page">
      <h1>Register</h1>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>
        <button type="submit" className="btn">Register</button>
      </form>
    </div>
  )
}

export default Register
