import { createFileRoute, redirect } from '@tanstack/react-router'
import DashboardPage from '../pages/DashboardPage'
export const Route = createFileRoute('/dashboard')({
  beforeLoad: () => {
    if (!localStorage.getItem('mp_token')) throw redirect({ to: '/login' })
  },
  component: DashboardPage
})
