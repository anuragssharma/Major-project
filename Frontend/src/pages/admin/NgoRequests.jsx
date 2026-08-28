import '../../App.css'
import { useState } from 'react'
const initial = [
    { id: 'NGO-001', name: 'Green Earth Foundation', email: 'green@example.com', status: 'Pending' }, 
    { id: 'NGO-002', name: 'Eco Help Society', email: 'eco@example.com', status: 'Pending' }
]
export default function NgoRequests({ navigate }) {
    const [requests, setRequests] = useState(initial);
    const update = (id, status) => setRequests(items => items.map(x => x.id === id ? { ...x, status } : x));
    return <>
        <header className="topbar">
            <strong>NGO Account Requests
            </strong>
            <button onClick={() => navigate('admin-dashboard')}>Dashboard
            </button>
        </header>
        <main className="page">
            <div className="container">
                <h1>Pending NGO Requests
                </h1>
                <div className="grid">{requests.map(r =>
                    <article className="card" key={r.id}>
                        <h2>{r.name}
                        </h2>
                        <p>{r.email}
                        </p>
                        <p>Status:
                            <span className="status">{r.status}
                            </span>
                        </p>{r.status === 'Pending' &&
                            <div className="actions">
                                <button className="btn btn-primary" onClick={() => update(r.id, 'Approved')}>Approve
                                </button>
                                <button className="btn btn-danger" onClick={() => update(r.id, 'Rejected')}>Reject
                                </button>
                            </div>}
                    </article>)}
                </div>
            </div>
        </main>
    </>
}
