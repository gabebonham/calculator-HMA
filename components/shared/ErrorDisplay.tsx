'use client'
interface Props {
  error: string | undefined
}
export default function ErrorDisplay({ error }: Props) {
  return (
    <div className="w-full text-red-500">
      {error && error.includes('|')
        ? error.split(' | ').map((e) => <p>{e}</p>)
        : error}
    </div>
  )
}
