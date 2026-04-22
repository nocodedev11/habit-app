'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleAuth = async () => {
    setMessage('')
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setMessage(error.message)
      else setMessage('Account created! You can now log in.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
      else router.push('/')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>✅</div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a2e', margin: 0 }}>
            Habit Tracker
          </h1>
          <p style={{ color: '#666', marginTop: '8px' }}>
            {isSignUp ? 'Create your account' : 'Welcome back!'}
          </p>
        </div>

        <input
          style={{
            width: '100%',
            border: '2px solid #e8e8e8',
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '16px',
            fontSize: '16px',
            outline: 'none',
            boxSizing: 'border-box'
          }}
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          style={{
            width: '100%',
            border: '2px solid #e8e8e8',
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '20px',
            fontSize: '16px',
            outline: 'none',
            boxSizing: 'border-box'
          }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAuth()}
        />

        <button
          onClick={handleAuth}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '14px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {isSignUp ? 'Create Account' : 'Login'}
        </button>

        {message && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            borderRadius: '10px',
            background: message.includes('created') ? '#d4edda' : '#f8d7da',
            color: message.includes('created') ? '#155724' : '#721c24',
            textAlign: 'center',
            fontSize: '14px'
          }}>
            {message}
          </div>
        )}

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666', fontSize: '14px' }}>
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            style={{
              background: 'none',
              border: 'none',
              color: '#667eea',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            {isSignUp ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  )
}