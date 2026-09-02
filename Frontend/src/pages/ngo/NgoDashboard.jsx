import '../../App.css'
export default function NgoDashboard({ user, navigate, logout }) {
    return <>
        <header className="topbar">
            <strong>eDonationHub — NGO
            </strong>
            <nav>
                <button onClick={() => navigate('ngo-available')}>
                    Available Donations
                </button>
                <button onClick={() => navigate('ngo-requests')}>
                    My Requests
                </button>
                <button onClick={logout}>
                    Logout
                </button>
            </nav>
        </header>
        <main className="page">
            <div className="container">
                <h1>Welcome, {user.name}
                </h1>
                <p>Find current e-waste donations and request devices your NGO needs.
                </p>
                <div className="grid">
                    <div className="card">
                        <h2>Available Donations
                        </h2>
                        <p>View e-waste currently available from donors.
                        </p>
                        <button className="btn btn-primary" onClick={() => navigate('ngo-available')}>Browse Donations
                        </button>
                    </div>
                    <div className="card">
                        <h2>Donation Requests
                        </h2>
                        <p>Track requests made by your NGO.
                        </p>
                        <button className="btn btn-secondary" onClick={() => navigate('ngo-requests')}>View Requests
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </>
}
