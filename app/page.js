'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [habits, setHabits] = useState([])
  const [newHabit, setNewHabit] = useState('')
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
        fetchHabits(user.id)
      }
    }
    getUser()
  }, [])

  const fetchHabits = async (userId) => {
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (!error) setHabits(data)
  }

  const addHabit = async () => {
    if (!newHabit.trim()) return
    const { error } = await supabase
      .from('habits')
      .insert([{ user_id: user.id, title: newHabit, completed: false }])
    if (!error) {
      setNewHabit('')
      fetchHabits(user.id)
    }
  }

  const toggleHabit = async (habit) => {
    const { error } = await supabase
      .from('habits')
      .update({ completed: !habit.completed })
      .eq('id', habit.id)
    if (!error) fetchHabits(user.id)
  }

  const deleteHabit = async (id) => {
    const { error } = await supabase
      .from('habits')
      .delete()
      .eq('id', id)
    if (!error) fetchHabits(user.id)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'system-ui, sans-serif',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <div>
            <h1 style={{ color: 'white', fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
              ✅ My Habits
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', margin: '4px 0 0' }}>
              {user?.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.4)',
              padding: '10px 20px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Logout
          </button>
        </div>

        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px'
        }}>
          <input
            style={{
              flex: 1,
              padding: '14px 18px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '16px',
              outline: 'none',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}
            type="text"
            placeholder="Add a new habit..."
            value={newHabit}
            onChange={e => setNewHabit(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addHabit()}
          />
          <button
            onClick={addHabit}
            style={{
              background: 'white',
              color: '#667eea',
              border: 'none',
              padding: '14px 24px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}
          >
            Add
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {habits.length === 0 && (
            <div style={{
              textAlign: 'center',
              color: 'rgba(255,255,255,0.8)',
              padding: '40px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '16px'
            }}>
              No habits yet. Add one above! 🚀
            </div>
          )}
          {habits.map(habit => (
            <div
              key={habit.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'white',
                padding: '16px 20px',
                borderRadius: '14px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <input
                  type="checkbox"
                  checked={habit.completed}
                  onChange={() => toggleHabit(habit)}
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                <span style={{
                  fontSize: '16px',
                  color: habit.completed ? '#aaa' : '#1a1a2e',
                  textDecoration: habit.completed ? 'line-through' : 'none'
                }}>
                  {habit.title}
                </span>
              </div>
              <button
                onClick={() => deleteHabit(habit.id)}
                style={{
                  background: '#fee2e2',
                  color: '#ef4444',
                  border: 'none',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}