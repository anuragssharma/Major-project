import { useState } from 'react'
import "../../pages/donor/DonationForm.css"

export default function DonationForm({ navigate }) {
  const [form, setForm] = useState({
    device: '',
    quantity: 1,
    condition: '',
    description: ''
  })
  const [image, setImage] = useState(null)
  const [verification, setVerification] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const devices = [
    'Keyboard (Wired)', 'Keyboard (Wireless)',
    'Mouse (Wired)', 'Mouse (Wireless)', 'Laptop',
    'Smartphone', 'Keypad Phone', 'Desktop Computer',
    'Monitor', 'Tablet', 'Printer', 'Scanner',
    'Router', 'Hard Drive', 'SSD', 'Headphones',
    'Earphones', 'Other'
  ]

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setVerification(null)
    setError('')
  }

  const handleImage = (e) => {
    const file = e.target.files?.[0]
    setError('')
    setVerification(null)

    if (!file) return setImage(null)

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      return setError('Only JPG, PNG and WebP images are allowed.')
    }

    if (file.size > 5 * 1024 * 1024) {
      return setError('Image must be smaller than 5 MB.')
    }

    setImage(file)
  }

  const verifyImage = () => {
    if (!form.device) return setError('Select an e-waste type first.')
    if (!image) return setError('Upload an image first.')

    setLoading(true)
    setError('')
    setVerification(null)

    const reader = new FileReader()

    reader.onload = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/image/verify',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              imageBase64: reader.result.split(',')[1],
              mimeType: image.type,
              expectedDevice: form.device
            })
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Verification failed.')
        }

        setVerification(data.verification)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    reader.onerror = () => {
      setLoading(false)
      setError('Unable to read the image.')
    }

    reader.readAsDataURL(image)
  }

  const submit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!form.device) return setError('Select an e-waste type.')
    if (form.quantity < 1) return setError('Quantity must be at least 1.')
    if (!form.condition) return setError('Select the device condition.')
    if (form.description.trim().length < 10) {
      return setError('Description must contain at least 10 characters.')
    }
    if (!image) return setError('Upload an image.')
    if (!verification?.verified) {
      return setError('Please verify the image before submitting.')
    }

    console.log({
      ...form,
      quantity: Number(form.quantity),
      image,
      verification
    })

    setSuccess('Donation verified successfully!')
  }

  return (
    <>
      <header className="topbar">
        <strong>My Donations
        </strong>
        <button onClick={() => navigate('donor-dashboard')}>
          Dashboard
        </button>
      </header>
      <div className="donation-page">

        <div className="donation-card">
          <div className="donation-header">
            <h1>Donate E-Waste</h1>
            <p>Help give your old electronics a second life.</p>
          </div>

          {error && <div className="form-alert error">{error}</div>}
          {success && <div className="form-alert success">{success}</div>}

          <form onSubmit={submit}>
            <div className="form-grid">
              <div className="form-group">
                <label>E-Waste Type</label>
                <select name="device" value={form.device} onChange={update}>
                  <option value="">Select device</option>
                  {devices.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Quantity</label>
                <input name="quantity" type="number" min="1" value={form.quantity} onChange={update} />
              </div>

              <div className="form-group">
                <label>Condition</label>
                <select name="condition" value={form.condition} onChange={update}>
                  <option value="">Select condition</option>
                  <option>Working</option>
                  <option>Partially Working</option>
                  <option>Not Working</option>
                  <option>For Parts</option>
                </select>
              </div>

              <div className="form-group full">
                <label>Description</label>
                <textarea name="description" rows="4" placeholder="Describe the device and its condition..." value={form.description} onChange={update} />
              </div>

              <div className="form-group full">
                <label>Device Image</label>
                <div className="upload-box">
                  <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImage} />

                  {image && (
                    <img src={URL.createObjectURL(image)} alt="Preview" className="image-preview" />
                  )}
                </div>
                <small>JPG, PNG or WebP • Maximum 5 MB</small>
              </div>
            </div>

            <button type="button" className="verify-btn" onClick={verifyImage} disabled={loading || !image || !form.device} >
              {loading ? 'Verifying...' : 'Verify Image'}
            </button>

            {verification && (
              <div className={`verification ${verification.verified ? 'valid' : 'invalid'}`}>
                <h3>
                  {verification.verified ? '✓ Image Verified' : '✕ Image Not Verified'}
                </h3>

                <div className="verification-grid">
                  <span>Detected</span>
                  <strong>{verification.deviceDetected || 'Unknown'}</strong>

                  <span>Device Match</span>
                  <strong>{verification.deviceMatch ? 'Yes' : 'No'}</strong>

                  <span>Image Quality</span>
                  <strong>{verification.imageQuality || 'Unknown'}</strong>

                  <span>Confidence</span>
                  <strong>
                    {typeof verification.confidence === 'number' ? `${(verification.confidence * 100).toFixed(0)}%` : 'N/A'}
                  </strong>
                </div>

                <p>{verification.reason}</p>
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={loading || !verification?.verified} >
              Submit Donation
            </button>
          </form>
        </div>
      </div>
    </>
  )
}