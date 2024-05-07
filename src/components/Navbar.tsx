import { RootState, useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slice";
import { useNavigate } from "react-router-dom";
import { useGetUserInfoQuery } from "../redux/api/authAPi";
import { useEffect, useState } from "react";


export function Navbar() {
  const user_token = useAppSelector((state: RootState) => state.user).token;
  const { data: user } = useGetUserInfoQuery();
  const [username, setUsername] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleYourRecording = () => {
    navigate("/recordings");
  };

  useEffect(() => {
    if (user){
      setUsername(user.username)
    }
  }, [user]);

  if (!user_token) {
    return (
      <div>
        <div className="flex gap-4">
          <div className="text-xl font-bold">Welcome to Gladi!</div>
          <button onClick={handleRegister} className="hover:text-blue-300">
            Register
          </button>
          <button onClick={handleLogin} className="hover:text-blue-300">
            Login
          </button>
        </div>
      </div>
    );
  } else {
    console.log(user)
    return (
      <div>
        <div className="flex gap-4">
          <div className="text-xl font-bold">
            Welcome Back, {username}!
          </div>
          <button onClick={handleYourRecording} className="hover:text-blue-300">
            Your Recording
          </button>
          <button onClick={handleLogout} className="hover:text-red-300">
            Logout
          </button>
        </div>
      </div>
    );
  }
}
