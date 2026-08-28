import '../../App.css'
import { useState } from 'react'
export default function ManageDonors({ navigate }) {
    const [donors, setDonors] = useState([
        { id: 'DON-101', name: 'Rahul Kumar', email: 'rahul@example.com' },
        { id: 'DON-102', name: 'Priya Singh', email: 'priya@example.com' }
    ]);
    const remove = id => {
        if (confirm('Delete this donor account?'))
            setDonors(x => x.filter(n => n.id !== id))
    };
    return <>
        <header className="topbar">
            <strong>Manage Donors
            </strong>
            <button onClick={() => navigate('admin-dashboard')}>Dashboard
            </button>
        </header>
        <main className="page">
            <div className="container">
                <h1>Donor Accounts
                </h1>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>ID
                                </th>
                                <th>Name
                                </th>
                                <th>Email
                                </th>
                                <th>Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>{donors.map(d =>
                            <tr key={d.id}>
                                <td>{d.id}
                                </td>
                                <td>{d.name}
                                </td>
                                <td>{d.email}
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => remove(d.id)}>Delete
                                    </button>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </>
}
