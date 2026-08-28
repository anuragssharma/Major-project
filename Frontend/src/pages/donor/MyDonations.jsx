import '../../App.css'
const donations = [
    { id: 'D-001', type: 'Laptop', condition: 'Working', status: 'Available' }, 
    { id: 'D-002', type: 'Keyboard (Wireless)', condition: 'Used', status: 'Pending' }
]
export default function MyDonations({ navigate }) {
    return <>
        <header className="topbar">
            <strong>My Donations
            </strong>
            <button onClick={() => navigate('donor-dashboard')}>Dashboard
            </button>
        </header>
        <main className="page">
            <div className="container">
                <h1>My Donations
                </h1>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>ID
                                </th>
                                <th>Device
                                </th>
                                <th>Condition
                                </th>
                                <th>Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>{donations.map(d =>
                            <tr key={d.id}>
                                <td>{d.id}
                                </td>
                                <td>{d.type}
                                </td>
                                <td>{d.condition}
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
