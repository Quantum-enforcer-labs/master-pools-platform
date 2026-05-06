import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, CheckCircle } from 'lucide-react'
import { useSubmitReview } from '../../hooks/useApi'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Props {
  open: boolean
  onClose: () => void
  projectId?: string
  projectTitle?: string
}

export default function ReviewModal({ open, onClose, projectId, projectTitle }: Props) {
  const [rating, setRating] = useState(5)
  const [hovered, setHovered] = useState(0)
  const { mutate, isPending } = useSubmitReview()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ title: string; content: string }>()

  const onSubmit = (data: { title: string; content: string }) => {
    mutate({ ...data, rating, ...(projectId && { project: projectId }) }, {
      onSuccess: () => {
        toast.success('Testimonial submitted for verification.')
        reset()
        setRating(5)
        onClose()
      },
      onError: (err: any) => toast.error(err.response?.data?.message || 'Submission failed'),
    })
  }

  return (
    <AnimatePresence>
      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }} className="card" style={{ position: 'relative', width: '100%', maxWidth: '32rem', padding: '2.5rem', zIndex: 10, boxShadow: 'var(--shadow-xl)' }}>
            
            <button onClick={onClose} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', padding: '0.5rem', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-gray-400)' }} onMouseEnter={e=>(e.currentTarget.style.background='var(--color-gray-100)')} onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
              <X style={{ width: '1.25rem', height: '1.25rem' }} />
            </button>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.025em', marginBottom: '0.375rem' }}>Share your experience</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>Your feedback helps others choose MATERPOOLS AND CONTRUCTION with confidence.</p>
              {projectTitle && (
                <div style={{ marginTop: '1rem', padding: '0.625rem 0.875rem', background: 'var(--color-primary-50)', borderRadius: '8px', border: '1px solid var(--color-primary-100)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle style={{ width: '0.875rem', height: '0.875rem', color: 'var(--color-primary-700)' }} />
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-primary-900)' }}>Reviewing: {projectTitle}</span>
                </div>
              )}
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <p className="label" style={{ marginBottom: '0.75rem' }}>Overall Rating</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '0.375rem' }}>
                  {[1,2,3,4,5].map(s => (
                    <button key={s} type="button"
                      onMouseEnter={() => setHovered(s)} onMouseLeave={() => setHovered(0)}
                      onClick={() => setRating(s)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'transform 0.15s ease' }}
                      className="hover:scale-110"
                    >
                      <Star style={{
                        width: '2rem', height: '2rem', transition: 'all 0.15s ease',
                        fill: s <= (hovered || rating) ? 'var(--color-amber-400)' : 'none',
                        color: s <= (hovered || rating) ? 'var(--color-amber-400)' : 'var(--color-gray-200)',
                        strokeWidth: 2
                      }} />
                    </button>
                  ))}
                </div>
                <span style={{ marginLeft: '0.75rem', fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-amber-600)', background: 'rgba(245,158,11,0.08)', padding: '0.25rem 0.75rem', borderRadius: '6px' }}>
                  {['','Disappointing','Below average','Good','Excellent','Outstanding'][rating]}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label className="label">Review Headline</label>
                <input {...register('title', { required: 'Headline is required', minLength: { value: 5, message: 'At least 5 characters' } })}
                  className="input" placeholder="e.g. Breathtaking design and professional team" style={errors.title ? {borderColor:'var(--color-danger)'} : {}} />
                {errors.title && <p style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '0.375rem' }}>{errors.title.message}</p>}
              </div>
              <div>
                <label className="label">Detailed Feedback</label>
                <textarea {...register('content', { required: 'Feedback is required', minLength: { value: 20, message: 'At least 20 characters' } })}
                  rows={4} className="textarea" placeholder="Describe the build process, our team's communication, and the final quality of your pool..." style={errors.content ? {borderColor:'var(--color-danger)'} : {}} />
                {errors.content && <p style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '0.375rem' }}>{errors.content.message}</p>}
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={onClose} className="btn btn-secondary btn-lg" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" disabled={isPending} className="btn btn-primary btn-lg" style={{ flex: 1.5 }}>
                  {isPending ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" /> Submitting...</>
                  ) : 'Post Review'}
                </button>
              </div>
              <p style={{ textAlign: 'center', fontSize: '0.6875rem', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>Reviews are verified and published within 24 hours.</p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
