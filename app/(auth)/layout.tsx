export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={`py-6 px-6`}>{children}</div>
}
