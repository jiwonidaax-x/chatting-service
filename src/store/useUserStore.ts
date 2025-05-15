import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = { email: string; name: string };

type UserStore = {
  user: User | null;
  hasHydrated: boolean;
  setUser: (id: string, name: string) => void;
  logout: () => void;
  setHasHydrated: (state: boolean) => void;
};

const useUserStore = create<UserStore>()(
  persist(
    //localstorage를 사용하는 스토어만 persist 사용해도 ㄱㅊ
    (set) => ({
      user: null,
      hasHydrated: false,
      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
      setUser: (email, name) => {
        const user = { email, name };
        set({ user });
      },
      logout: () => set({ user: null }),
    }),
    {
      //두번째 인자는 옵션 객체
      name: 'user-storage', // 로컬 스토리지의 키 역할 브라우저가 새로고침 될때 회수 해서 복구.
      onRehydrateStorage: () => (state) => {
        //(state)=> {} 복구된 상태를 인자로 받는 함수
        // persist 상태가 로컬 스토리지에서 복구되눈 시점을 알아내서 true로 바꿔주기
        state?.setHasHydrated(true);
      },
    }
  )
);
// 복구화 과정 => 브라우저가 페이지 열기 -> zustand스토어 초기화 ->persist미들웨어 활성화 (로컬 스토리지 확인)-> 로컬 스토리지에서 옵션키 기준으로 확인 -> 덮어쓰기
export default useUserStore;
