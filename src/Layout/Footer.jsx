import 'animate.css';

const Footer = () => {
    return (
        <footer className="footer bg-dark text-light py-4">
            <div className="container text-center mb-3 mt-3 animate__animated animate__fadeInUp pb-3 pt-3">
                <h5 className="mb-3">Stay Updated with Our Latest Inventory!</h5>
                <div className="social-icons mb-3">
                    <a href="/" className="social-icon mx-2 text-light" aria-label="Facebook">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="/" className="social-icon mx-2 text-light" aria-label="Twitter">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="/" className="social-icon mx-2 text-light" aria-label="Instagram">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/shailesh-patel-3102bb277" target="_blank" rel="noopener noreferrer" className="social-icon mx-2 text-light" aria-label="LinkedIn">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="https://github.com/sp1862004" target="_blank" rel="noopener noreferrer" className="social-icon mx-2 text-light" aria-label="GitHub">
                        <i className="fab fa-github"></i>
                    </a>
                </div>
                <p className="mb-0">© {new Date().getFullYear()} <i className="fa-solid fa-face-smile"></i> rder  <i className="fas fa-warehouse"></i> anagement
                    . All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
