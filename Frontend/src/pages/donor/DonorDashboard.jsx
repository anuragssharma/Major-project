import '../../App.css'
export default function DonorDashboard({ user, navigate, logout }) {
    return <>
        <header className="topbar">
            <strong>eDonationHub — Donor
            </strong>
            <nav>
                <button onClick={() => navigate('donor-dashboard')}>Dashboard
                </button>
                <button onClick={() => navigate('donor-donation')}>Donate E-Waste
                </button>
                <button onClick={() => navigate('donor-history')}>My Donations
                </button>
                <button onClick={logout}>Logout
                </button>
            </nav>
        </header>
        <main className="page">
            <div className="container">
                <h1>Welcome, {user.name}
                </h1>
                <p>Donate unused electronic devices and help keep e-waste out of landfills.
                </p>
                <div className="grid">
                    <div className="card">
                        <h2>Donate E-Waste
                        </h2>
                        <p>Submit a device with its type, description, condition and image.
                        </p>
                        <button className="btn btn-primary" onClick={() => navigate('donor-donation')}>Create Donation
                        </button>
                    </div>
                    <div className="card">
                        <h2>My Donations
                        </h2>
                        <p>View donations and their current status.
                        </p>
                        <button className="btn btn-secondary" onClick={() => navigate('donor-history')}>View Donations
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </>
}
