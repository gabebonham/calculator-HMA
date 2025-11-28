import Image from 'next/image'
import LoginPageComponent from './_components/LoginPageComponent'
import img from '@/public/images/graphimg.png'
export default function LoginPage() {
  return (
    <div className="min-h-full h-full lg:flex lg:justify-between">
      <div className="lg:w-2/5 lg:px-12 lg:py-8">
        <LoginPageComponent />
      </div>
      <div className="lg:flex hidden lg:w-3/5 relative">
        <Image
          src={img}
          alt="graphImg"
          className="rounded-xl object-cover"
          fill
        />
      </div>
    </div>
  )
}
