import useUserStore from '@/store/useUserStore';

export const login = async (
  { id, pw }: { id: string; pw: string },
  push: (path: string) => void
) => {
  const setUser = useUserStore.getState().setUser;

  await fetch('http://localhost:8080/api/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: id, pw: pw }),
  }).then(async (res) => {
    const data = await res.json();
    if (res.status === 200) {
      alert(data.message);
      setUser(data.email, data.name);
      push('/');
    } else {
      alert(data.message);
    }
  });
};

export const signUp = async ({
  name,
  id,
  pw,
}: {
  name: string;
  id: string;
  pw: string;
}) => {
  await fetch('http://localhost:8080/api/signup', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: name, email: id, pw: pw }),
  })
    .then((res) => res.json())
    .then((res) => alert(res.message));
};

export const logOut = async ({ id }: { id: string }) => {
  const logout = useUserStore.getState().logout;
  await fetch('http://localhost:8080/api/logout', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: id }),
  }).then(async (res) => {
    const data = await res.json();
    if (data.state === 200) {
      alert(data.message);
      logout();
    } else {
      alert(data.message);
    }
  });
};

export const getUser = () => {
  return fetch('http://localhost:8080/api/user/all', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => data.allUser);
};
