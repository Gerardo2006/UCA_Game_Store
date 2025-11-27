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

        if (carnet.length !== 8) {
            setError('El carnet debe tener exactamente 8 dígitos.');
            return;
        }

        if (!carnet.startsWith('0')) {
            setError('El carnet debe comenzar con 0.');
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
            const msg = err.response?.data?.message || "Ocurrió un error en el registro. Inténtalo de nuevo.";
            setError(msg);
        }
    };

    // Función para permitir solo números en el input
    const handleCarnetChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 8) {
            setCarnet(value);
        }
    };

    return (
        <main className="Signup">
            <header className="Signup-header">
                <div className="Signup-logo">
                    <img src={logo} alt="Logo UCA Game Store" />
                </div>
                <div className="header-content">
                    <h1>UCA Game Store</h1>
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
                        placeholder="00000000"
                        value={carnet}
                        onChange={handleCarnetChange}
                        required
                    />
                    <p style={{ fontSize: '0.8rem', color: '#ccc', marginTop: '5px' }}>
                        Debe tener 8 dígitos y comenzar con 0.
                    </p>

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