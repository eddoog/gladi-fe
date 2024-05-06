import { RootState, useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slice";
import { useNavigate } from "react-router-dom";
import { useGetUserInfoQuery } from "../redux/api/authAPi";

export function Navbar() {
  const user_token = useAppSelector((state: RootState) => state.user).token;
  const { data: user } = useGetUserInfoQuery();

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

  if (!user_token) {
    return (
      <div>
        <div className="flex gap-4">
          <div className="text-xl font-bold">Welcome to Gladi!</div>
          <button onClick={handleRegister} className="hover:text-gray-300">
            Register
          </button>
          <button onClick={handleLogin} className="hover:text-gray-300">
            Login
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex gap-4">
          <div className="text-xl font-bold">
            Welcome Back, {user?.username}!
          </div>
          <button onClick={handleLogout} className="hover:text-gray-300">
            Logout
          </button>
        </div>
      </div>
    );
  }
}
