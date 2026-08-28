import '../../App.css'
export default function AdminDashboard({ user, navigate, logout }) {
    return <>
        <header className="topbar">
            <strong>eDonationHub — Admin
            </strong>
            <nav>
                <button onClick={() => navigate('admin-dashboard')}>Dashboard
                </button>
                <button onClick={() => navigate('admin-ngo-requests')}>NGO Requests
                </button>
                <button onClick={() => navigate('admin-ngos')}>Manage NGOs
                </button>
                <button onClick={() => navigate('admin-donors')}>Manage Donors
                </button>
                <button onClick={() => navigate('admin-donations')}>Donations
                </button>
                <button onClick={logout}>Logout
                </button>
            </nav>
        </header>
        <main className="page">
            <div className="container">
                <h1>Admin Dashboard
                </h1>
                <p>Administrator: {user.name}
                </p>
                <div className="grid">
                    <div className="card">
                        <h2>NGO Approval
                        </h2>
                        <p>Review pending NGO account requests.
                        </p>
                        <button className="btn btn-primary" onClick={() => navigate('admin-ngo-requests')}>Review
                        </button>
                    </div>
                    <div className="card">
                        <h2>NGO Accounts
                        </h2>
                        <p>View or remove NGO accounts.
                        </p>
                        <button className="btn btn-primary" onClick={() => navigate('admin-ngos')}>Manage NGOs
                        </button>
                    </div>
                    <div className="card">
                        <h2>Donor Accounts
                        </h2>
                        <p>View or remove donor accounts.
                        </p>
                        <button className="btn btn-primary" onClick={() => navigate('admin-donors')}>Manage Donors
                        </button>
                    </div>
                    <div className="card">
                        <h2>Donations
                        </h2>
                        <p>Monitor all donations.
                        </p>
                        <button className="btn btn-primary" onClick={() => navigate('admin-donations')}>View Donations
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </>
}
