'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { db } from '@/lib/firebase';
import type { UserProfile, Message } from '@/lib/types';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  getDocs,
  documentId,
} from 'firebase/firestore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, MessageSquare } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function ChatClient() {
  const { user, userProfile } = useAuth();
  const [connections, setConnections] = useState<UserProfile[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (userProfile?.connections?.length) {
      const q = query(collection(db, 'users'), where(documentId(), 'in', userProfile.connections));
      getDocs(q).then((snapshot) => {
        const connectionsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserProfile));
        setConnections(connectionsData);
      });
    }
  }, [userProfile]);

  useEffect(() => {
    if (!user || !selectedUser) return;
    const q = query(
      collection(db, 'messages'),
      where('fromId', 'in', [user.uid, selectedUser.id]),
      where('toId', 'in', [user.uid, selectedUser.id]),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [user, selectedUser]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedUser || !newMessage.trim()) return;

    await addDoc(collection(db, 'messages'), {
      fromId: user.uid,
      toId: selectedUser.id,
      content: newMessage,
      timestamp: serverTimestamp(),
    });
    setNewMessage('');
  };

  return (
    <div className="flex h-full">
      <aside className="w-1/3 border-r h-full flex flex-col">
        <CardHeader>
            <CardTitle>Conversations</CardTitle>
        </CardHeader>
        <ScrollArea className="flex-grow">
          {connections.map((person) => (
            <div
              key={person.id}
              onClick={() => setSelectedUser(person)}
              className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-muted ${selectedUser?.id === person.id ? 'bg-muted' : ''}`}
            >
              <Avatar>
                <AvatarImage src={person.avatarUrl} />
                <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{person.name}</span>
            </div>
          ))}
        </ScrollArea>
      </aside>
      <section className="w-2/3 flex flex-col h-full">
        {selectedUser ? (
          <>
            <div className="p-4 border-b flex items-center gap-3">
              <Avatar>
                  <AvatarImage src={selectedUser.avatarUrl} />
                  <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
            </div>
            <ScrollArea className="flex-grow p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${msg.fromId === user?.uid ? 'justify-end' : ''}`}
                  >
                     {msg.fromId !== user?.uid && <Avatar className="h-6 w-6"><AvatarImage src={selectedUser.avatarUrl}/><AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback></Avatar>}
                    <div
                      className={`max-w-xs lg:max-w-md rounded-lg px-4 py-2 ${
                        msg.fromId === user?.uid
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
               <div ref={messagesEndRef} />
            </ScrollArea>
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <MessageSquare className="h-16 w-16 mb-4" />
            <h2 className="text-xl font-semibold">Select a conversation</h2>
            <p>Choose someone from the list to start chatting.</p>
          </div>
        )}
      </section>
    </div>
  );
}
