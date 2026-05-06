import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Eye, X, CheckCircle, Phone, MapPin, Clock } from 'lucide-react'
import { useAdminContacts } from '../../hooks/useApi'
import api from '../../api/client'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import type { Contact } from '../../types'

export default function AdminContacts() {
  const { data: contacts = [], isLoading } = useAdminContacts()
  const [selected, setSelected] = useState<Contact | null>(null)
  const qc = useQueryClient()

  const markRead = async (id: string) => {
    try {
      await api.patch(`/contact/admin/${id}`, { status: 'read' })
      qc.invalidateQueries({ queryKey: ['admin-contacts'] })
    } catch (e) {}
  }

  const statusMap = {
    new:     { label: 'New',     cls: 'badge badge-blue' },
    read:    { label: 'Read',    cls: 'badge badge-gray' },
    replied: { label: 'Replied', cls: 'badge badge-green' }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em', margin: 0 }}>Contact Messages</h1>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.875rem', marginTop: '0.25rem', fontWeight: 500 }}>
            {(contacts as Contact[]).filter(c => c.status === 'new').length} unread submissions
          </p>
        </div>
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: 'var(--color-gray-50)', borderBottom: '1px solid var(--color-border)' }}>
              <tr>
                {['Sender','Subject','Received','Status','Actions'].map(h => (
                  <th key={h} className="table-head">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({length: 5}, (_,i) => <tr key={i}><td colSpan={5} style={{padding:'1rem'}}><div className="skeleton" style={{height:'1.5rem'}} /></td></tr>)
              ) : !(contacts as Contact[]).length ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '5rem', color: 'var(--color-text-tertiary)' }}>No contact messages found.</td></tr>
              ) : (
                (contacts as Contact[]).map((c, idx) => {
                  const s = statusMap[c.status] || statusMap.read
                  return (
                    <motion.tr key={c._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }} className="table-row" style={c.status === 'new' ? { background: 'var(--color-primary-50)' } : {}}>
                      <td className="table-cell">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '8px', background: 'var(--color-primary-900)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.8125rem' }}>
                            {c.name?.[0]?.toUpperCase()}
                          </div>
                          <div>
                            <p style={{ fontWeight: 700, color: 'var(--color-text)', fontSize: '0.875rem', margin: 0 }}>{c.name}</p>
                            <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.75rem', margin: 0 }}>{c.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="table-cell">
                        <p style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '0.875rem', margin: 0 }}>{c.subject}</p>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '16rem' }}>{c.message}</p>
                      </td>
                      <td className="table-cell" style={{ color: 'var(--color-text-tertiary)', fontSize: '0.8125rem', fontWeight: 500 }}>{format(new Date(c.createdAt), 'MMM d, yyyy')}</td>
                      <td className="table-cell"><span className={s.cls}>{s.label}</span></td>
                      <td className="table-cell">
                        <button onClick={() => { setSelected(c); if (c.status === 'new') markRead(c._id) }}
                          className="btn btn-secondary btn-sm" style={{ gap: '0.375rem' }}>
                          <Eye style={{ width: '0.875rem', height: '0.875rem' }} /> Open
                        </button>
                      </td>
                    </motion.tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} onClick={() => setSelected(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 12 }}
              className="card" style={{ position: 'relative', width: '100%', maxWidth: '32rem', padding: '2rem', zIndex: 10, boxShadow: 'var(--shadow-xl)' }}>
              <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.5rem', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-gray-400)' }} onMouseEnter={e=>(e.currentTarget.style.background='var(--color-gray-100)')} onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
                <X style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-primary-600)', background: 'var(--color-primary-50)', padding: '0.125rem 0.5rem', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{selected.subject}</span>
                <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)', marginTop: '0.5rem', letterSpacing: '-0.02em' }}>Message from {selected.name}</h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <div style={{ width: '2rem', height: '2rem', borderRadius: '7px', background: 'var(--color-primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail style={{ width: '0.875rem', height: '0.875rem', color: 'var(--color-primary-700)' }} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', margin: 0 }}>Email</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>{selected.email}</p>
                  </div>
                </div>
                {selected.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <div style={{ width: '2rem', height: '2rem', borderRadius: '7px', background: 'var(--color-accent-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Phone style={{ width: '0.875rem', height: '0.875rem', color: 'var(--color-accent-600)' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', margin: 0 }}>Phone</p>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--color-text)', margin: 0 }}>{selected.phone}</p>
                    </div>
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <div style={{ width: '2rem', height: '2rem', borderRadius: '7px', background: 'var(--color-gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Clock style={{ width: '0.875rem', height: '0.875rem', color: 'var(--color-gray-500)' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', margin: 0 }}>Received</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text)', margin: 0 }}>{format(new Date(selected.createdAt), 'MMM d, HH:mm')}</p>
                  </div>
                </div>
              </div>

              <div style={{ padding: '1.25rem', background: 'var(--color-gray-50)', border: '1px solid var(--color-border)', borderRadius: '14px', marginBottom: '2rem' }}>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: 'var(--color-text)', margin: 0, whiteSpace: 'pre-wrap' }}>{selected.message}</p>
              </div>

              <div style={{ display: 'flex', gap: '0.875rem' }}>
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                  style={{ flex: 1, textDecoration: 'none' }} className="btn btn-primary btn-lg">
                  <Mail style={{ width: '1.125rem', height: '1.125rem' }} /> Reply via Email
                </a>
                <button onClick={() => setSelected(null)} className="btn btn-secondary btn-lg" style={{ flex: 1 }}>Close</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
