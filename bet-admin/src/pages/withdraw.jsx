import React from 'react'

const Withdraw = () => {
  return (
    <div className="page">
      <h1>Withdraw</h1>
      <p>Request a withdrawal from your account.</p>
      <form>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" placeholder="Enter amount to withdraw" />
        </div>
        <button type="submit" className="btn">Withdraw</button>
      </form>
    </div>
  )
}

export default Withdraw
