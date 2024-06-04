import { RootState, useAppSelector } from '../redux/store';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slice';
import { useNavigate } from 'react-router-dom';
import { useGetUserInfoQuery } from '../redux/api/authAPi';
import { useEffect, useState } from 'react';
import ToggleTheme from './common/ToggleTheme';

export function Navbar() {
  const user_token = useAppSelector((state: RootState) => state.user).token;
  const { data: user } = useGetUserInfoQuery();
  const [username, setUsername] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleYourRecording = () => {
    navigate('/recordings');
  };

  const handleCapture = () => {
    navigate('/capture');
  };

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  if (!user_token) {
    return (
      <div className="flex w-full justify-between gap-4 px-4 py-2 md:px-8">
        <div className="text-xl font-bold">Welcome to Gladi!</div>
        <div className="flex flex-row items-center gap-6">
          <ToggleTheme />
          <button
            onClick={handleRegister}
            className="font-bold transition-all duration-200 ease-in-out hover:text-blue-300"
          >
            Register
          </button>
          <button
            onClick={handleLogin}
            className="font-bold transition-all duration-200 ease-in-out hover:text-blue-300"
          >
            Login
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex w-full justify-between gap-4 px-4 py-2 md:px-8">
        <div className="text-xl font-bold">Welcome Back, {username}!</div>
        <div className="flex flex-row items-center gap-6">
          <ToggleTheme />
          <button
            onClick={handleCapture}
            className="font-bold transition-all duration-200 ease-in-out hover:text-blue-300"
          >
            Capture
          </button>
          <button
            onClick={handleYourRecording}
            className="font-bold transition-all duration-200 ease-in-out hover:text-blue-300"
          >
            Your Recording
          </button>
          <button
            onClick={handleLogout}
            className="font-bold transition-all duration-200 ease-in-out hover:text-red-300"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}
