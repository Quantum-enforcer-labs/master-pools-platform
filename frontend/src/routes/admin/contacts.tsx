import { createFileRoute } from '@tanstack/react-router'
import AdminContacts from '../../pages/admin/AdminContacts'
export const Route = createFileRoute('/admin/contacts')({ component: AdminContacts })
