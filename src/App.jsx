import './App.css'

function App() {
  return (
    <div className="login-page">
      <div className="login-card">

        <div className="logo-section">
          <div className="logo-icon">♻</div>
          <h1>eDonationHub</h1>
        </div>

        <h2>Welcome Back</h2>
        <p className="login-subtitle">
          Login to continue to eDonationHub
        </p>

        <form>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
          />

          <div className="role-section">
            <label>Login As</label>

            <select>
              <option value="donor">Donor</option>
              <option value="ngo">NGO</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit">
            Login
          </button>
        </form>

        <p className="register-text">
          Don't have an account? <span>Register</span>
        </p>

      </div>
    </div>
  )
}

export default App