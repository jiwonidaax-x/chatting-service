import Link from 'next/link';
import Chat from './_component/Chat';

// TODO:컴포넌트화 시키기
const Home = () => {
  return (
    <main className="w-full h-screen bg-[#304b69] flex items-center justify-center p-[4vw]">
      <div className="w-full h-full xl bg-[#F1EFEC] rounded-xl flex">
        <div className="w-[30%] bg-[#e7e7e7] rounded-tl-lg rounded-bl-lg flex flex-col">
          <div className="h-[15%] border-b-1 border-[#d8d8d8] p-3 flex flex-col ">
            <div className="justify-between flex items-center">
              <p>프로필</p>
              <button className="text-sm font-semibold  border border-gray-600 p-0.5 rounded-sm cursor-pointer">
                <Link href="/auth">로그아웃</Link>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-left gap-5 ">
              <p className="bg-gray-400 w-[70px] h-[70px] rounded-full" />
              <div className="p-3">
                <p>지원</p>
                <p>jgb07012@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="h-[10%] border-b border-[#d8d8d8] p-3 text-xl font-semibold flex flex-col">
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
          </div>
          <div className="h-[15%] border-b border-[#d8d8d8] p-3 text-xl font-semibold flex flex-col">
            <p className="text-xl font-semibold">친구 요청</p>
          </div>
          <div className="h-[65%] p-3 text-xl font-semibold">
            <p className="text-xl font-semibold">친구 목록 (0)</p>
          </div>
        </div>
        <div className="w-full">
          <div className="h-[10%] flex items-center border-b-1 border-[#d8d8d8] p-3">
            <p className="text-2xl font-bold mr-2">지원</p>
            <p className="bg-green-700 w-[13px] h-[13px] rounded-full" />
          </div>
          <div className="h-[90%]">
            <Chat />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
