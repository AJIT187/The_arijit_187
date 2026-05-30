'use client'

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { Mail, Trash2, Check, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { type Message, markMessageAsRead, deleteMessage } from '@/lib/actions'
import { formatDistanceToNow } from 'date-fns'

export function MessagesManager({ messages: initialMessages }: { messages: Message[] }) {
  const [messages, setMessages] = useState(initialMessages)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isPending, startTransition] = useTransition()

  const unreadCount = messages.filter(m => !m.is_read).length

  const handleMarkAsRead = async (id: string) => {
    startTransition(async () => {
      try {
        await markMessageAsRead(id)
        setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: true } : m))
      } catch (error) {
        console.error('Failed to mark as read:', error)
      }
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return
    
    startTransition(async () => {
      try {
        await deleteMessage(id)
        setMessages(prev => prev.filter(m => m.id !== id))
        if (selectedMessage?.id === id) setSelectedMessage(null)
      } catch (error) {
        console.error('Failed to delete message:', error)
      }
    })
  }

  const openMessage = async (message: Message) => {
    setSelectedMessage(message)
    if (!message.is_read) {
      await handleMarkAsRead(message.id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Messages</h1>
          <p className="text-muted-foreground mt-1">
            {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card 
              className={`glass-card border-border/50 cursor-pointer transition-all hover:border-primary/30 ${
                !message.is_read ? 'border-l-4 border-l-primary' : ''
              }`}
              onClick={() => openMessage(message)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full ${message.is_read ? 'bg-secondary' : 'bg-primary/20'}`}>
                    <Mail className={`h-5 w-5 ${message.is_read ? 'text-muted-foreground' : 'text-primary'}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold truncate ${!message.is_read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {message.subject}
                      </h3>
                      {!message.is_read && (
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{message.name}</span>
                      <span>-</span>
                      <span>{message.email}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {message.message}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                    </div>
                    <div className="flex items-center gap-1">
                      {!message.is_read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleMarkAsRead(message.id)
                          }}
                          disabled={isPending}
                          className="h-8 w-8"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(message.id)
                        }}
                        disabled={isPending}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {messages.length === 0 && (
        <Card className="glass-card border-border/50">
          <CardContent className="p-12 text-center">
            <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No messages yet.</p>
          </CardContent>
        </Card>
      )}

      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="glass-card border-border/50 max-w-2xl">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedMessage.subject}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{selectedMessage.name}</span>
                  </div>
                  <span>-</span>
                  <a href={`mailto:${selectedMessage.email}`} className="text-primary hover:underline">
                    {selectedMessage.email}
                  </a>
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {new Date(selectedMessage.created_at).toLocaleString()}
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(selectedMessage.id)}
                    disabled={isPending}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                  <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}>
                    <Button>
                      <Mail className="h-4 w-4 mr-2" />
                      Reply
                    </Button>
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
