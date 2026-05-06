import { createFileRoute, redirect } from '@tanstack/react-router'
import QuotationPage from '../pages/QuotationPage'
export const Route = createFileRoute('/quotation')({
  beforeLoad: () => {
    if (!localStorage.getItem('mp_token')) throw redirect({ to: '/login' })
  },
  component: QuotationPage
})
