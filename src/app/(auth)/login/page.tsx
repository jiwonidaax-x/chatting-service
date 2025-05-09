import Link from 'next/link';

const Login = () => {
  return (
    <main className="w-full h-screen bg-[#304b69] flex items-center justify-center p-[4vw]">
      <div>로그인페이지</div>
      <Link href="/">home</Link>
    </main>
  );
};
export default Login;
