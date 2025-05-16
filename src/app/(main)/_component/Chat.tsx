/* eslint-disable no-console */
'use client';

import { useEffect, useState } from 'react';
import formattedTime from '@/utils/formattedTime';
import socket from '@/lib/socket';

interface MsgType {
  sender: string;
  message: string;
  time: string;
  senderId: string;
}

//유저 정보 받아오기
const Chat = ({
  user,
  room,
}: {
  user: { email: string; name: string };
  room: string;
}) => {
  const [message, setMessage] = useState('');
  const [msgHistory, setMsgHistory] = useState<MsgType[]>([]);

  socket.on('connect', () => {
    console.log(' connected to server, socket id:', socket.id);
  });

  useEffect(() => {
    setMsgHistory([]); //채팅방 옮길때마다 초기화
  }, [room]);

  //TODO: 보내는이, 메세지, 시간, 받는이 정보 보내기
  const sendMessage = () => {
    if (message !== '') {
      const messageData = {
        room: room,
        sender: user.name,
        senderId: user.email,
        message: message,
        time: formattedTime(),
      };

      socket.emit('send_message', { messageData });

      setMsgHistory((list) => [...list, messageData]);
      setMessage('');
    }
  };

  //TODO JOIN ROOM
  useEffect(() => {
    const handleReceiveMessage = (messageData: MsgType) => {
      console.log('받은 메시지:', messageData);
      setMsgHistory((list) => [...list, messageData]);
    };

    socket.on('receive_message', handleReceiveMessage);

    return () => {
      socket.off('receive_message', handleReceiveMessage); // 이벤트 클린업
    };
  }, []);

  return (
    <main className="h-[100%]">
      <div className="h-[90%] border-b border-[#d8d8d8] p-3 overflow-auto space-y-2">
        {msgHistory.map((e: MsgType, i) => {
          const isMine = e.senderId === user.email;

          return (
            <div
              key={i}
              className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-2 rounded-xl ${
                  isMine ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                }`}
              >
                <p className="text-sm">{e.message}</p>
                <p className="text-xs mt-1 text-right opacity-70">{e.time}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-[10%] p-3 flex items-center justify-center gap-1.5">
        <input
          className="border w-[90%] border-[#d8d8d8] rounded-xl p-3"
          placeholder="메세지를 입력하세요..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
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
