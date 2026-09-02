import '../App.css'
export default function Register({ navigate }) {
    const submit = e => { 
        e.preventDefault(); 
        const role = e.currentTarget.role.value; 
        alert(role === 'ngo' ? 'NGO registration submitted. Admin approval is required before login.' : 'Donor account created. You can now sign in.'); navigate('login') 
    }
    return <>
    <header className='topbarhome'>
            <strong>
                <button onClick={() => navigate('home')} className="content-nav-item">
                    Home
                </button>
            </strong>
        </header>
    <main className="auth-page">
        <section className="auth-card">
            <h1>Create Account
            </h1>
            <p>Donor accounts can be created directly. NGO accounts require admin approval.
            </p>
            <form className="form" onSubmit={submit}>
                <label>
                    Full Name / NGO Name
                    <input required placeholder="Enter name" />
                </label>
                <label>
                    Email
                    <input type="email" required placeholder="you@example.com" />
                </label>
                <label>
                    Phone
                    <input type="tel" required placeholder="+91..." minLength={10} maxLength={10}/>
                </label>
                <label>
                    Address <input type='text' required placeholder='Enter Your Address'minLength={10} maxLength={70} aria-rowspan={4}/>
                </label>
                <label>
                    Register as
                    <select name="role" defaultValue="donor">
                        <option value="donor">Donor
                        </option>
                        <option value="ngo">NGO
                        </option>
                    </select>
                </label>
                <label>
                    Password
                    <input type="password" required placeholder="Create password (At least 6 characters)" minLength={6}/>
                </label>
                <button className="btn btn-primary">Create Account
                </button>
            </form>
            <p style={{textAlign:'center'}}>
                Already registered?
                <br/>
                <button className="btn btn-secondary" onClick={() => navigate('login')}>Sign In
                </button>
            </p>
        </section>
    </main>
    </>
}
