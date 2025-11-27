import { useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './login.css'
import logo from '../assets/logo.png'
import api from '../utils/api'

function Login() {
    // Definición del estado para capturar los valores de los inputs
    const [carnet, setCarnet] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    // Hook de navegación de React Router
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await api.post('/auth/signin', { carnet, password }); 
            localStorage.setItem('token', response.data.token);
            navigate('/');
            
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || "Carnet o contraseña incorrectos. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <main className="Login">
            <header className="Login-header">
                <div className="Login-logo">
                    <img src={logo} alt="Logo UCA Games Store" />
                </div>
                <div className="header-content">
                    <h1>UCA Games Store</h1>
                    <nav>
                        <Link to="/">Inicio</Link>
                        <Link to="/signup">Crear una cuenta</Link>
                    </nav>
                </div>
            </header>

            <div className="login-container">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <label htmlFor="carnet">Carnet:</label>
                    <input
                        type="carnet"
                        placeholder="Carnet"
                        value={carnet}
                        onChange={(e) => setCarnet(e.target.value)}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submite">Iniciar Sesión</button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </main>
    )
};

export default Login