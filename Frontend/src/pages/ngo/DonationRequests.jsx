import '../../App.css'
const requests = [
    { id: 'R-001', donation: 'Laptop', status: 'Pending' }, 
    { id: 'R-002', donation: 'Smartphone', status: 'Approved' }]
export default function DonationRequests({ navigate }) {
    return <>
        <header className="topbar">
            <strong>NGO Donation Requests
            </strong>
            <button onClick={() => navigate('ngo-dashboard')}>Dashboard
            </button>
        </header>
        <main className="page">
            <div className="container">
                <h1>My Requests
                </h1>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>Request ID
                                </th>
                                <th>Donation
                                </th>
                                <th>Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>{requests.map(r =>
                            <tr key={r.id}>
                                <td>{r.id}
                                </td>
                                <td>{r.donation}
                                </td>
                                <td>
                                    <span className="status">{r.status}
                                    </span>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </>
}
