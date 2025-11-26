'use client'

import { Profile } from '@/app/models/profile.entity'
import { Card } from '@/components/ui/card'
interface Props {
  profile: Profile
}
export default function ProfileInfoCard({ profile }: Props) {
  return (
    <div>
      <Card>
        <div></div>
      </Card>
    </div>
  )
}
