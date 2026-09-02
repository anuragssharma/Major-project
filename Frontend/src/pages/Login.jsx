import '../App.css'
export default function Login({ onLogin, navigate }) {
    const submit = e => { 
        e.preventDefault(); 
        onLogin(e.currentTarget.role.value) 
    }
    return <main className="auth-page">
        <section className="auth-card">
            <h1>eDonationHub
            </h1>
            <h2>Sign In
            </h2>
            <p>Login to continue to your role-based dashboard.
            </p>
            <form className="form" onSubmit={submit}>
                <label>Email
                    <input type="email" placeholder="you@example.com" required />
                </label>
                <label>Password
                    <input type="password" placeholder="Password" required />
                </label>
                <label>Login as
                    <select name="role" defaultValue="donor">
                        <option value="donor">Donor
                        </option>
                        <option value="ngo">NGO
                        </option>
                        <option value="admin">Admin
                        </option>
                    </select>
                </label>
                <button className="btn btn-primary">Sign In
                </button>
            </form>
            <p>Don't have an account?
                <button className="btn btn-secondary" onClick={() => navigate('register')}>Register
                </button>
            </p>

            <div style={{ marginTop: '15px', borderTop: '1px solid #e5e7eb', paddingTop: '15px' }}>
                    <button 
                        onClick={() => navigate('home')} 
                        style={{
                            width: '100%',
                            padding: '10px 24px',
                            backgroundColor: 'white',
                            color: '#0b4f26',
                            border: '2px solid #0b4f26',
                            borderRadius: '6px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                    >
                        Go Back Home
                    </button>
                </div>
        </section>
    </main>
}
