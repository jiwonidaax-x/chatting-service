/* eslint-disable no-console */
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import socket from '@/lib/socket';

const Home = () => {
  socket.on('connect', () => {
    console.log('✅ connected to server, socket id:', socket.id);
  });

  const sendMessage = () => {
    console.log('onClick');
    socket.emit('send_message', { text: 'hello' });
  };

  useEffect(() => {
    console.log('here');
    socket.on('receive_message', (data) => {
      console.log('📩 Received message:', data);
      alert(data); // ← 여기서 확인
    });
  }, [socket]);

  return (
    <main>
      <div>채팅 연습</div>
      <input placeholder="Message..." />
      <button onClick={sendMessage}>send message</button>
      <Link href="chat">메인</Link>
    </main>
  );
};

export default Home;
