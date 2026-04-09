import { redirect } from 'next/navigation'

// La route racine "/" est gérée par proxy.ts → /fr
// Cette page est un fallback de sécurité
export default function RootPage() {
  redirect('/fr')
}
