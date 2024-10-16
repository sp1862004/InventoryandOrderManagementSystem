import  { useState } from 'react';

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !message) {
            setError('All fields are required!');
            return;
        }
        alert("Message sent successfully!"); 
        setSuccess('Your message has been sent!');
        setName('');
        setEmail('');
        setMessage('');
        setError('');
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">🤙🏼 Contact Us 🤙🏼</h2>
            <div className="row justify-content-center p-5">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit} className="border p-4 rounded shadow bg-light">
                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}
                        <div className="form-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your Email"
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <textarea
                                className="form-control"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Your Message"
                                rows="5"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
