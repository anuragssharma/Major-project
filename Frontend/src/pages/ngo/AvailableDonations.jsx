import '../../App.css'
const donations = [
    { id: 'D-101', type: 'Laptop', condition: 'Working', description: 'Dell laptop in good working condition.' },
    { id: 'D-102', type: 'Keyboard (Wired)', condition: 'Used', description: 'USB keyboard, fully functional.' },
    { id: 'D-103', type: 'Smartphone', condition: 'Partially Working', description: 'Screen has minor damage.' }]
export default function AvailableDonations({ navigate }) {
    return <>
        <header className="topbar">
            <strong>Available Donations</strong>
            <button onClick={() => navigate('ngo-dashboard')}>Dashboard</button>
        </header>
        <main className="page">
            <div className="container">
                <h1>Current Donations</h1>
                <div className="grid">
                    {donations.map(d => <article className="card" key={d.id}>
                        <span className="status">{d.id}</span>
                        <h2>{d.type}</h2>
                        <p><strong>Condition:</strong> {d.condition}</p>
                        <p>{d.description}</p>
                        <button className="btn btn-primary" onClick={() => alert(`Request submitted for donation ${d.id}.`)}>Request Donation</button>
                    </article>)}
                </div>
            </div>
        </main></>
}
