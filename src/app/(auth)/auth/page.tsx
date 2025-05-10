// import Link from 'next/link';
import Image from 'next/image';
import AuthBox from './_component/AuthBox';

const Auth = () => {
  return (
    <main className="w-full min-h-screen bg-[#304b69] flex flex-col items-center justify-center px-4">
      <div className="w-full">
        <div className="h-[80px]  fixed  top-0 left-0 flex items-center px-12 bg-[#304b69] z-10">
          <p className="text-2xl font-bold text-white">chatting-service</p>
        </div>
        <div className="flex overflow-hidden min-h-screen  flex-col lg:flex-row items-center justify-center gap-10  ">
          <div className="hidden lg:block">
            <Image
              src="/main.svg"
              alt="login illustration"
              width={700}
              height={700}
              className="object-contain"
            />
          </div>

          <AuthBox />
        </div>
      </div>
    </main>
  );
};
export default Auth;
