/* eslint-disable no-console */
'use client';

import { useEffect, useState } from 'react';
import socket from '@/lib/socket';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');
  socket.on('connect', () => {
    console.log('✅ connected to server, socket id:', socket.id);
  });

  //TODO: 보내는이, 메세지, 시간, 받는이 정보 보내기
  const sendMessage = () => {
    socket.emit('send_message', { text: message });
  };

  //TODO JOIN ROOM
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data.text);
    });
  }, [socket]);

  return (
    <main className="h-[100%]">
      <div className="h-[90%]  border-b-1 border-[#d8d8d8] p-3">
        <p>Message: </p>
        <p>{messageReceived}</p>
      </div>
      <div className="h-[10%] p-3 flex items-center justify-center gap-1.5">
        <input
          className="border w-[90%] border-[#d8d8d8] rounded-xl p-3"
          placeholder="메세지를 입력하세요..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="bg-[#304b69] p-[12px] text-white rounded-xl font-bold cursor-pointer"
          onClick={sendMessage}
        >
          전송
        </button>
      </div>
    </main>
  );
};

export default Chat;
