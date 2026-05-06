import { motion } from 'framer-motion'
import { Star, CheckCircle, XCircle, Trash2, Shield, User } from 'lucide-react'
import { useAdminReviews, useAdminToggleReview } from '../../hooks/useApi'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { cn } from '../../utils/cn'

export default function AdminReviews() {
  const { data: reviews = [], isLoading } = useAdminReviews()
  const toggleReview = useAdminToggleReview()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em', margin: 0 }}>Reviews</h1>
        <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.875rem', marginTop: '0.25rem', fontWeight: 500 }}>
          {reviews.length} total client testimonials
        </p>
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: 'var(--color-gray-50)', borderBottom: '1px solid var(--color-border)' }}>
              <tr>
                {['Client','Rating','Review Content','Status','Actions'].map(h => (
                  <th key={h} className="table-head">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({length: 5}, (_,i) => <tr key={i}><td colSpan={5} style={{padding:'1rem'}}><div className="skeleton" style={{height:'2rem'}} /></td></tr>)
              ) : !reviews.length ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '5rem', color: 'var(--color-text-tertiary)' }}>No reviews found.</td></tr>
              ) : (
                reviews.map((r: any, idx: number) => (
                  <motion.tr key={r._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.02 }} className="table-row">
                    <td className="table-cell">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '8px', background: 'var(--color-primary-900)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '0.8125rem' }}>
                          {r.user?.name?.[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p style={{ fontWeight: 700, color: 'var(--color-text)', fontSize: '0.875rem', margin: 0 }}>{r.user?.name}</p>
                          <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.75rem', margin: 0 }}>{r.user?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div style={{ display: 'flex', gap: '0.125rem' }}>
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} style={{ width: '0.875rem', height: '0.875rem', color: s <= r.rating ? 'var(--color-amber-500)' : 'var(--color-gray-200)', fill: s <= r.rating ? 'var(--color-amber-500)' : 'none' }} />
                        ))}
                      </div>
                      <p style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)', marginTop: '0.25rem', fontWeight: 600 }}>{format(new Date(r.createdAt), 'MMM d, yyyy')}</p>
                    </td>
                    <td className="table-cell" style={{ maxWidth: '24rem' }}>
                      <p style={{ fontWeight: 700, color: 'var(--color-text)', fontSize: '0.875rem', margin: '0 0 0.25rem' }}>{r.title}</p>
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8125rem', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: 1.5 }}>{r.content}</p>
                      {r.project && <p style={{ fontSize: '0.6875rem', color: 'var(--color-primary-700)', marginTop: '0.5rem', fontWeight: 700 }}>Project: {r.project.title}</p>}
                    </td>
                    <td className="table-cell">
                      <span className={cn("badge", r.isApproved ? 'badge-green' : 'badge-gray')}>
                        {r.isApproved ? 'Published' : 'Hidden'}
                      </span>
                    </td>
                    <td className="table-cell">
                      <button
                        onClick={() => toggleReview.mutate(r._id, { onSuccess: () => toast.success(r.isApproved ? 'Review hidden' : 'Review published') })}
                        className={cn('btn btn-sm', r.isApproved ? 'btn-danger' : 'btn-primary')}
                        style={{ minWidth: '6rem' }}
                      >
                        {r.isApproved ? <><XCircle style={{ width: '0.875rem', height: '0.875rem' }} /> Hide</> : <><CheckCircle style={{ width: '0.875rem', height: '0.875rem' }} /> Publish</>}
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
