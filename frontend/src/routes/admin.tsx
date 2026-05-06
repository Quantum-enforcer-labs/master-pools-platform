import { createFileRoute, redirect } from '@tanstack/react-router'
import AdminLayout from '../pages/admin/AdminLayout'
export const Route = createFileRoute('/admin')({
  beforeLoad: () => {
    if (!localStorage.getItem('mp_token')) throw redirect({ to: '/login' })
  },
  component: AdminLayout
})
