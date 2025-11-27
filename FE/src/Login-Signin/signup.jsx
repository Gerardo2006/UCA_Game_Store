import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api'
import './signup.css';
import logo from '../assets/logo.png';

function Signup() {
    const [carnet, setCarnet] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!carnet || !password) {
            setError("El carnet y la contraseña son obligatorios.");
            return;
        }

        try {
            const response = await api.post('/auth/signup', {
                carnet,
                password
            });

            setSuccess(response.data.message || "¡Cuenta creada con éxito! Serás redirigido para iniciar sesión.");

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            console.error('Signup error:', err);
            setError(err.response?.data?.message || "Ocurrió un error en el registro. Inténtalo de nuevo.");
        }
    };

    return (
        <main className="Signup">
            <header className="Signup-header">
                <div className="Signup-logo">
                    <img src={logo} alt="Logo UCA Games Store" />
                </div>
                <div className="header-content">
                    <h1>UCA Games Store</h1>
                    <nav>
                        <Link to="/login">Volver</Link>
                    </nav>
                </div>
            </header>

            <div className="signup-container">
                <h2>Crear una Cuenta</h2>

                <form onSubmit={handleSignup} className="signup-form">

                    <label htmlFor="carnet">Carnet:</label>
                    <input
                        type="text"
                        id="carnet"
                        placeholder="Carnet"
                        value={carnet}
                        onChange={(e) => setCarnet(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Registrarse</button>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                </form>
            </div>
        </main>
    );
}

export default Signup;