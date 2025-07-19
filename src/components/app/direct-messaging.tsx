'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { messageData, chatHistory } from "@/lib/data";
import { Send, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useI18n } from "@/locales/client";

export function DirectMessaging() {
  const t = useI18n();
  return (
    <Card className="h-[calc(100vh-10rem)] flex">
      <div className="w-1/3 border-r flex flex-col">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t('messages.search_placeholder')} className="pl-8" />
          </div>
        </CardHeader>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
          {messageData.map(msg => (
            <button key={msg.id} className="w-full text-left p-3 rounded-lg hover:bg-secondary data-[active=true]:bg-secondary">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={msg.avatar} alt={msg.name} data-ai-hint="professional headshot" />
                  <AvatarFallback>{msg.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{msg.name}</p>
                    <p className="text-xs text-muted-foreground">{msg.timestamp}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground truncate">{msg.lastMessage}</p>
                    {msg.unread > 0 && <Badge className="bg-accent text-accent-foreground">{msg.unread}</Badge>}
                  </div>
                </div>
              </div>
            </button>
          ))}
          </div>
        </ScrollArea>
      </div>
      <div className="w-2/3 flex flex-col">
        <CardHeader className="border-b">
           <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={messageData[1].avatar} alt={messageData[1].name} />
                <AvatarFallback>{messageData[1].name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-lg font-headline">{messageData[1].name}</p>
                <p className="text-sm text-muted-foreground">{t('messages.status_online')}</p>
              </div>
           </div>
        </CardHeader>
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {chatHistory.map((chat, index) => (
                <div key={index} className={`flex items-end gap-2 ${chat.sender === 'me' ? 'justify-end' : ''}`}>
                    {chat.sender === 'other' && <Avatar className="h-8 w-8"><AvatarImage src={messageData[1].avatar} /></Avatar>}
                    <div className={`max-w-md p-3 rounded-lg ${chat.sender === 'me' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                        <p>{chat.text}</p>
                    </div>
                </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="relative">
            <Input placeholder={t('messages.type_message_placeholder')} className="pr-12 text-base" />
            <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
