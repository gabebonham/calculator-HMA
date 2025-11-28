'use client'

import { LoaderCircle } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center place-items-center w-full min-h-screen">
      <h1 className="text-3xl flex items-center gap-x-4">
        <LoaderCircle className="animate-spin" /> Carregando...
      </h1>
    </div>
  )
}
