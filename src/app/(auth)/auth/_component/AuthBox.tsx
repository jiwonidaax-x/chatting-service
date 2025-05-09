'use client';
import Link from 'next/link';
import { useState } from 'react';

const AuthBox = () => {
  const [tab, setTab] = useState<'login' | 'signup'>('login');

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
            <input type="email" placeholder="이메일" className="custom-input" />
            <input
              type="password"
              placeholder="비밀번호"
              className="custom-input"
            />
            <button className="bg-[#304b69] text-white py-3 cursor-pointer rounded-md font-semibold hover:bg-[#253b53] transition">
              <Link href="/">로그인</Link>
            </button>
          </form>
        ) : (
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="이름" className="custom-input" />
            <input type="email" placeholder="이메일" className="custom-input" />
            <input
              type="password"
              placeholder="비밀번호"
              className="custom-input"
            />
            <button className="bg-[#304b69] text-white py-3 rounded-md font-semibold cursor-pointer hover:bg-[#253b53] transition">
              회원가입
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default AuthBox;
