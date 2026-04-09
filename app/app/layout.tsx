// Passthrough layout — app/[lang]/layout.tsx est le vrai root layout (i18n)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
