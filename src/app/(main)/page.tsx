/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';
import Link from 'next/link';
import Chat from './_component/Chat';
import useUserStore from '@/store/useUserStore';
import socket from '@/lib/socket';
import { getUser, logOut } from '@/services/auth.ctrl';
import { useEffect, useState } from 'react';
// TODO:컴포넌트화 시키기
const Home = () => {
  const { user, logout, hasHydrated } = useUserStore();
  const [users, setUsers] = useState([]);
  const [room, setRoom] = useState<string>('');
  const [receiver, setReceiver] = useState<{ email: string; name: string }>();

  useEffect(() => {
    if (!user && hasHydrated) {
      window.location.href = '/auth';
    }
  }, [user, hasHydrated]);

  useEffect(() => {
    getUser().then((res) => {
      setUsers(res);
    });
  }, []);

  useEffect(() => {
    if (room) joinRoom();
  }, [room]);

  const joinRoom = () => {
    socket.emit('join_room', room);
    console.log(`joined room ${room}`);
  };

  const handleLogOut = () => {
    if (user) {
      logOut({ id: user.email });
      logout();
    }
  };

  return (
    user && (
      <main className="w-full h-screen bg-[#304b69] flex items-center justify-center p-[4vw]">
        <div className="w-full h-full xl bg-[#F1EFEC] rounded-xl flex">
          <div className="w-[30%] bg-[#e7e7e7] rounded-tl-lg rounded-bl-lg flex flex-col">
            <div className="h-[15%] border-b-1 border-[#d8d8d8] p-3 flex flex-col ">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xl font-semibold">프로필</p>
                <Link href="/auth">
                  <button
                    onClick={handleLogOut}
                    className="text-sm font-semibold border border-gray-500 px-2 py-1 rounded hover:bg-gray-200 transition"
                  >
                    로그아웃
                  </button>
                </Link>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                <div className="bg-gray-400 rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16" />
                <div>
                  <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
                    {user.name}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="h-[12%] border-b border-[#d8d8d8] p-5 text-xl font-semibold flex flex-col">
            <p className="text-xl font-semibold">친구 검색</p>
            <div className="flex-1 flex items-center justify-center gap-1">
              <input
                placeholder="이메일을 입력하세요..."
                className="border w-[80%] border-[#d8d8d8] rounded-lg p-[7px] text-base font-medium bg-[#efefef]"
              />
              <button className="bg-[#304b69] p-[7px] text-white rounded-lg font-medium text-base cursor-pointer">
                검색
              </button>
            </div>
          </div> */}
            <div className="h-[65%] p-3 text-xl font-semibold overflow-auto">
              <p className="mb-2">친구 목록 ({users.length - 1})</p>
              <div className="pl-2  divide-y divide-gray-200">
                {users.map((e: { email: string; name: string }, i) => {
                  if (e.email === user.email) return null;

                  const isFirst = i === 0;
                  return (
                    e.email !== user.email && (
                      <div
                        key={i}
                        onClick={() => {
                          setReceiver(e);
                          setRoom([user.email, e.email].sort().join('_'));
                        }}
                        className={`cursor-pointer p-2 hover:bg-gray-300 hover:rounded-md transition text-base font-normal
        ${isFirst ? 'border-t border-gray-300' : ''} ${e.email === receiver?.email ? 'bg-gray-300 rounded-md' : ''}
        border-b border-gray-300
      `}
                      >
                        <p>{e.name}</p>
                        <p className="text-sm text-gray-600">{e.email}</p>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-full">
            {receiver ? (
              <>
                <div className="h-[10%] flex items-center border-b-1 border-[#d8d8d8] p-3">
                  <p className="text-2xl font-bold mr-2">{receiver.name}</p>
                  <p className="bg-green-700 w-[13px] h-[13px] rounded-full" />
                </div>
                <div className="h-[90%]">
                  <Chat user={user} room={room} />
                </div>
              </>
            ) : (
              <div className="flex items-center h-[100%] justify-center text-xl font-semibold text-[#525252]">
                대화 상대를 선택하여 주세요.
              </div>
            )}
          </div>
        </div>
      </main>
    )
  );
};

export default Home;
