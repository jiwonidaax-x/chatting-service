import { create } from 'zustand';

type User = { id: string; name: string };

type UserStore = {
  user: User;
  setUser: (id: string, name: string) => void;
};

const useUserStore = create<UserStore>()((set) => ({
  user: { id: '', name: '' },
  setUser: (id, name) => set({ user: { id: id, name: name } }),
}));

export default useUserStore;
