import { Profile } from '../models/profile.entity'
import { planMapper } from './plan.mapper'

export function profileMapper(profile: Profile) {
  return {
    id: profile.id,
    userId: profile.userId,
    name: profile.name,
    email: profile.email,
    plan: planMapper(profile.plan),
    createdAt: profile.createdAt,
    planId: profile.planId,
  }
}
export function profilesMapper(profiles: Profile[]) {
  return profiles.map(profileMapper)
}
