import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../utils/firebase.js';
import api from "../../utils/axios.js"
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { setUserdata } from '../redux/userSlice.js';
import Sidebar from '../components/Sidebar.jsx';
import ChatArea from '../components/ChatArea.jsx';
import Artifact from '../components/Artifact.jsx';
import { RiRobot2Line, RiShieldCheckLine } from 'react-icons/ri';

const Home = () => {
    const { userData } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleLogin = async (token) => {
        try {
            const { data } = await api.post("/api/auth/login", { token })
            dispatch(setUserdata(data))
        } catch (error) {
            console.log("Error at handleLogin")
            console.log(error)
        }
    }

    const googleLogin = async () => {
        const data = await signInWithPopup(auth, googleProvider)
        const token = await data.user.getIdToken()
        await handleLogin(token)
    }

    return (
        <div style={{ height: '100vh', display: 'flex', background: 'var(--be-black)', color: 'var(--be-text)', overflow: 'hidden' }}>
            <Sidebar />
            <ChatArea />
            <Artifact />

            {/* Auth overlay */}
            {!userData && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 50,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(8,10,14,0.85)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                }}>
                    {/* Glow orb */}
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: '500px', height: '500px',
                        background: 'radial-gradient(circle, rgba(212,160,23,0.07) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }} />

                    <div className="fade-up" style={{
                        width: '380px',
                        background: 'var(--be-surface)',
                        border: '1px solid var(--be-border-2)',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(212,160,23,0.08)',
                        position: 'relative',
                    }}>
                        {/* Top accent bar */}
                        <div style={{
                            height: '3px',
                            background: 'linear-gradient(90deg, transparent, var(--be-gold), var(--be-gold-bright), var(--be-gold), transparent)',
                        }} />

                        <div style={{ padding: '32px 32px 28px' }}>
                            {/* Logo */}
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                                <div style={{
                                    width: '60px', height: '60px', borderRadius: '16px',
                                    background: 'linear-gradient(135deg, rgba(212,160,23,0.15), rgba(212,160,23,0.06))',
                                    border: '1.5px solid var(--be-border-2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 0 30px rgba(212,160,23,0.15)',
                                }}>
                                    <RiRobot2Line size={28} color="var(--be-gold-bright)" />
                                </div>
                            </div>

                            {/* Title */}
                            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                                <h2 className="font-brand" style={{
                                    fontSize: '26px', fontWeight: 700, letterSpacing: '0.06em',
                                    color: 'var(--be-gold-bright)', marginBottom: '6px',
                                }}>
                                    BlackEagle AI
                                </h2>
                                <p style={{ fontSize: '13.5px', color: 'var(--be-text-muted)', lineHeight: 1.6 }}>
                                    Precision intelligence for complex problems.<br />Sign in to access your workspace.
                                </p>
                            </div>

                            {/* Auth button */}
                            <button
                                onClick={googleLogin}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    padding: '13px 20px',
                                    borderRadius: '11px',
                                    background: 'var(--be-surface-3)',
                                    border: '1px solid var(--be-border-2)',
                                    color: 'var(--be-text)',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    transition: 'all 150ms',
                                    fontFamily: 'Inter, sans-serif',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'var(--be-surface-2)';
                                    e.currentTarget.style.borderColor = 'rgba(212,160,23,0.35)';
                                    e.currentTarget.style.boxShadow = '0 0 16px rgba(212,160,23,0.1)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'var(--be-surface-3)';
                                    e.currentTarget.style.borderColor = 'var(--be-border-2)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <FcGoogle size={18} />
                                Continue with Google
                            </button>

                            {/* Trust note */}
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                gap: '6px', marginTop: '18px',
                                fontSize: '11.5px', color: 'var(--be-text-muted)',
                            }}>
                                <RiShieldCheckLine size={13} color="var(--be-gold-dim)" />
                                Secured &amp; encrypted · No data shared
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
