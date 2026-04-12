// Le root layout ne fournit pas html/body — c'est [lang]/layout.tsx qui les gère
// avec l'attribut lang correct (pattern i18n Next.js officiel).
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
