import { createFileRoute } from '@tanstack/react-router'
import AdminQuotations from '../../pages/admin/AdminQuotations'
export const Route = createFileRoute('/admin/quotations')({ component: AdminQuotations })
