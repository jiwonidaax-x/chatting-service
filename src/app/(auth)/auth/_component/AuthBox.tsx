'use client';
// import Link from 'next/link';
import { login, signUp } from '@/services/auth.ctrl';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

const AuthBox = () => {
  const router = useRouter();
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [name, setName] = useState<string>('');

  function valInit() {
    setId('');
    setPw('');
    setName('');
    setTab('login');
  }

  return (
    <main className="min-h-screen bg-[#304b69] flex items-center justify-center px-4 w-[780px]">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">
        <div className="flex border-b border-[#e3e3e3] mb-6">
          <button
            className={`flex-1 py-2 text-lg font-semibold cursor-pointer ${
              tab === 'login'
                ? 'border-b-2 border-[#304b69] text-[#304b69]'
                : 'text-gray-500'
            }`}
            onClick={() => setTab('login')}
          >
            로그인
          </button>
          <button
            className={`flex-1 py-2 text-lg font-semibold cursor-pointer ${
              tab === 'signup'
                ? 'border-b-2 border-[#304b69] text-[#304b69]'
                : 'text-gray-500'
            }`}
            onClick={() => setTab('signup')}
          >
            회원가입
          </button>
        </div>
        {tab === 'login' ? (
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="이메일"
              className="custom-input"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호"
              className="custom-input"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
            <button
              className="bg-[#304b69] text-white py-3 cursor-pointer rounded-md font-semibold hover:bg-[#253b53] transition"
              onClick={(e) => {
                e.preventDefault(); // 새로고침 방지
                login({ id: id, pw: pw }, router.push);
                valInit();
              }}
            >
              로그인
            </button>
          </form>
        ) : (
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="이름"
              className="custom-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="이메일"
              className="custom-input"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호"
              className="custom-input"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
            <button
              className="bg-[#304b69] text-white py-3 rounded-md font-semibold cursor-pointer hover:bg-[#253b53] transition"
              onClick={(e) => {
                e.preventDefault(); // 새로고침 방지
                signUp({ name: name, id: id, pw: pw });
                valInit();
              }}
            >
              회원가입
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default AuthBox;
