import '../../App.css'
import { useState } from 'react'
export default function ManageNgos({ navigate }) {
    const [ngos, setNgos] = useState([
        { id: 'NGO-101', name: 'Green Earth Foundation', email: 'green@example.com' },
        { id: 'NGO-102', name: 'Eco Help Society', email: 'eco@example.com' }
    ]);
    const remove = id => {
        if (confirm('Delete this NGO account?'))
            setNgos(x => x.filter(n => n.id !== id))
    };
    return <>
        <header className="topbar">
            <strong>Manage NGOs
            </strong>
            <button onClick={() => navigate('admin-dashboard')}>Dashboard
            </button>
        </header>
        <main className="page">
            <div className="container">
                <h1>NGO Accounts
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
                        <tbody>{ngos.map(n =>
                            <tr key={n.id}>
                                <td>{n.id}
                                </td>
                                <td>{n.name}
                                </td>
                                <td>{n.email}
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => remove(n.id)}>Delete
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
