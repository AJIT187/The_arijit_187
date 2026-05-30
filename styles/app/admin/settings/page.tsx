import { getProfile } from '@/lib/actions'
import { SettingsManager } from '@/components/admin/settings-manager'

export default async function AdminSettingsPage() {
  const profile = await getProfile()
  
  return <SettingsManager profile={profile} />
}
