import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, UserCheck, UserX, Mail, Phone, Calendar, Shield, User as UserIcon } from 'lucide-react'
import { useAdminUsers, useAdminToggleUser } from '../../hooks/useApi'
import toast from 'react-hot-toast'
import { format, formatDistanceToNow } from 'date-fns'
import { cn } from '../../utils/cn'

export default function AdminUsers() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const { data, isLoading, refetch } = useAdminUsers({ page, limit: 20, ...(search && { search }) })
  const toggleUser = useAdminToggleUser()

  const users: any[] = (data as any)?.users || []
  const pagination: any = (data as any)?.pagination || {}

  const handleToggle = (u: any) => {
    toggleUser.mutate(u._id, {
      onSuccess: () => {
        toast.success(`${u.name} has been ${u.isActive ? 'deactivated' : 'activated'}`)
        refetch()
      },
      onError: () => toast.error('Failed to update user status'),
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em', margin: 0 }}>User Management</h1>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.875rem', marginTop: '0.25rem', fontWeight: 500 }}>
            {pagination?.total ?? 0} registered platform members
          </p>
        </div>
        <div style={{ position: 'relative' }}>
          <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: 'var(--color-gray-400)' }} />
          <input
            value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search by name or email…"
            className="input" style={{ paddingLeft: '2.25rem', width: '16rem', background: '#fff' }}
          />
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
        {[
          { label: 'Total Users', value: pagination?.total ?? 0, color: 'blue' },
          { label: 'Active', value: users.filter(u => u.isActive).length, color: 'green' },
          { label: 'Inactive', value: users.filter(u => !u.isActive).length, color: 'red' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card" style={{ padding: '1.25rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>{label}</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '2rem', fontWeight: 800, color: 'var(--color-text)', margin: 0, lineHeight: 1, letterSpacing: '-0.02em' }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: 'var(--color-gray-50)', borderBottom: '1px solid var(--color-border)' }}>
              <tr>
                {['User','Role','Joined','Last Seen','Status','Actions'].map(h => (
                  <th key={h} className="table-head">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 6 }, (_, i) => <tr key={i}><td colSpan={6} style={{padding:'1rem'}}><div className="skeleton" style={{height:'2rem'}} /></td></tr>)
              ) : !users.length ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '5rem', color: 'var(--color-text-tertiary)' }}>No users found.</td></tr>
              ) : (
                users.map((u, i) => (
                  <motion.tr key={u._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="table-row">
                    <td className="table-cell">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '10px', background: 'var(--color-primary-900)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '0.875rem' }}>
                          {u.name?.[0]?.toUpperCase()}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <p style={{ fontWeight: 700, color: 'var(--color-text)', fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0 }}>{u.name}</p>
                          <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0 }}>{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className={cn("badge capitalize", u.role === 'admin' ? 'badge-amber' : 'badge-blue')}>
                        {u.role === 'admin' ? <><Shield style={{width:'0.75rem',height:'0.75rem'}} /> Admin</> : <><UserIcon style={{width:'0.75rem',height:'0.75rem'}} /> User</>}
                      </span>
                    </td>
                    <td className="table-cell">
                      <p style={{ fontSize: '0.8125rem', color: 'var(--color-text)', fontWeight: 600, margin: 0 }}>{format(new Date(u.createdAt), 'MMM d, yyyy')}</p>
                      <p style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)', margin: 0 }}>{formatDistanceToNow(new Date(u.createdAt))} ago</p>
                    </td>
                    <td className="table-cell">
                      <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', fontWeight: 500, margin: 0 }}>
                        {u.lastSeen ? formatDistanceToNow(new Date(u.lastSeen)) + ' ago' : 'Never'}
                      </p>
                    </td>
                    <td className="table-cell">
                      <span className={cn("badge", u.isActive ? 'badge-green' : 'badge-gray')}>
                        {u.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="table-cell">
                      <button
                        onClick={() => handleToggle(u)}
                        disabled={toggleUser.isPending}
                        className={cn("btn btn-sm", u.isActive ? "btn-danger" : "btn-secondary")}
                        style={{ minWidth: '7.5rem' }}
                      >
                        {u.isActive ? <><UserX style={{ width: '0.875rem', height: '0.875rem' }} /> Deactivate</> : <><UserCheck style={{ width: '0.875rem', height: '0.875rem' }} /> Activate</>}
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination?.pages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.375rem', marginTop: '1rem' }}>
          {[...Array(pagination.pages)].map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)}
              style={{ width: '2.25rem', height: '2.25rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700, border: '1px solid', borderColor: page === i + 1 ? 'var(--color-primary-900)' : 'var(--color-border)', background: page === i + 1 ? 'var(--color-primary-900)' : '#fff', color: page === i + 1 ? '#fff' : 'var(--color-text-secondary)', cursor: 'pointer' }}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
