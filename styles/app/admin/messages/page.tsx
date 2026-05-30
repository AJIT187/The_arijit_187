import { getMessages } from '@/lib/actions'
import { MessagesManager } from '@/components/admin/messages-manager'

export default async function AdminMessagesPage() {
  const messages = await getMessages()
  
  return <MessagesManager messages={messages} />
}
