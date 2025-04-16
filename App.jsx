import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 监听认证状态变化
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    // 初始化检查当前用户
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  return (
    <div>
      {user ? (
        <div>欢迎，{user.email}！<button onClick={() => supabase.auth.signOut()}>退出</button></div>
      ) : (
        <Login />
      )}
    </div>
  );
};