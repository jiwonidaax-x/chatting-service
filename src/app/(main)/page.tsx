import Link from 'next/link';
const Home = () => {
  return (
    <main className="bg-orange-50">
      <div>메인</div>
      <Link href="/login">로그인 페이지</Link>
    </main>
  );
};
export default Home;
