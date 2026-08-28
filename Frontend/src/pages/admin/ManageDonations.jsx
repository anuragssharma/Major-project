import '../../App.css'
const donations = [
    { id: 'D-001', donor: 'Rahul Kumar', type: 'Laptop', status: 'Available' }
    , { id: 'D-002', donor: 'Priya Singh', type: 'Mouse (Wireless)', status: 'Requested' }
    , { id: 'D-003', donor: 'Amit Patel', type: 'Smartphone', status: 'Available' }
]
export default function ManageDonations({ navigate }) {
    return <>
        <header className="topbar">
            <strong>Manage Donations
            </strong>
            <button onClick={() => navigate('admin-dashboard')}>Dashboard
            </button>
        </header>
        <main className="page">
            <div className="container">
                <h1>All Donations
                </h1>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>ID
                                </th>
                                <th>Donor
                                </th>
                                <th>Device
                                </th>
                                <th>Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>{donations.map(d =>
                            <tr key={d.id}>
                                <td>{d.id}
                                </td>
                                <td>{d.donor}
                                </td>
                                <td>{d.type}
                                </td>
                                <td>
                                    <span className="status">{d.status}
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
