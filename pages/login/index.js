import React, { useContext, useState } from 'react';
import styles from '../../components/restaurant/NewRestaurantForm.module.css';
import GlobalContext from "../../pages/store/globalContext";
import { useRouter } from "next/router";
import Link from 'next/link';

const LoginPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State to hold error message
    const globalCtx = useContext(GlobalContext);

    async function handleLogin(event) {
        event.preventDefault();
        setError('');
        try {
            const res = await globalCtx.login(username, password);
            if (!res.error || !res) {
                router.push('/');
            } else {
                setError(res.error);
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again later.');
        }
    }


    return (
        <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className={styles.control}>
                    <label htmlFor="username">Email/Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.control}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>} {/* Render error message */}
                <div className={styles.actions}>
                    <button type="submit">Login</button>
                    <> </>
                    <Link href="/signup">Sign Up</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
