import { Bell, BellDot, ChartNoAxesCombined, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { destroySession } from '@/lib/session'
import { redirect } from 'next/navigation'
interface Props {
  profile?: any
}
export default function Header({ profile }: Props) {
  const logoutHandler = async () => {
    await destroySession()
    redirect('/login')
  }
  if (profile)
    return (
      <header
        className={`py-4 px-4 flex items-center justify-between bg-white ${profile.plan}`}
      >
        <div className="">
          <h1 className="font-bold">Olá, {profile.name}!</h1>
          <div className="hidden flex items-center gap-x-2">
            <div>
              <ChartNoAxesCombined className="box-content bg-primary text-white rounded-lg p-2" />
            </div>
            <div>
              <h1 className="text-xl">Calculator HMA</h1>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center">
            {/* <NotificationButton notifications={notifications} /> */}
          </div>
          <div className="flex items-center gap-x-1">
            <Button onClick={() => logoutHandler()}>Logout</Button>
          </div>
        </div>
      </header>
    )
  else
    return (
      <header
        className={`py-4 px-4 flex items-center justify-between bg-[#121826]`}
      >
        <div className="">
          <div className=" flex items-center gap-x-2">
            <div>
              <ChartNoAxesCombined className="box-content bg-primary text-white rounded-lg p-2" />
            </div>
            <div>
              <h1 className="text-xl text-white">Calculator HMA</h1>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center">
            {/* <NotificationButton notifications={notifications} /> */}
          </div>
          <div className={`flex items-center gap-x-1 `}>
            <Button onClick={() => logoutHandler()}>Logout</Button>
          </div>
        </div>
      </header>
    )
}
