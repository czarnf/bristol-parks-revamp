"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const initialMessages = [
  { id: 1, sender: "Alice", content: "Hey everyone! Who's up for a ride this weekend?" },
  { id: 2, sender: "Bob", content: "I'm in! Where are we thinking of going?" },
  { id: 3, sender: "Carol", content: "How about Ashton Court? The trails are great this time of year." },
  { id: 4, sender: "Alice", content: "Sounds perfect! Shall we say Saturday at 10 AM?" },
  { id: 5, sender: "Bob", content: "Works for me. Looking forward to it!" },
]

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: "You", content: newMessage }])
      setNewMessage("")
    }
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Community Chat</h1>

      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle>Bristol Riders Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 pr-4">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={`/avatar-${message.sender.toLowerCase()}.png`} />
                  <AvatarFallback>{message.sender[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{message.sender}</p>
                  <p className="text-sm text-muted-foreground">{message.content}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="flex space-x-2 mt-4">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

