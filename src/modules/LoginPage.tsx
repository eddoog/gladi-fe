import React, { useState } from 'react';
import { useLoginMutation } from '../redux/api/authAPi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [login] = useLoginMutation();

    const navigate = useNavigate();
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = {
        username: username,
        password: password
      }
      await login({ ...data }).then((res) => {
        if (res) {
          if ('data' in res) {
            toast.success("Login success!")
            navigate('/')
          } else if ('data' in res.error) {
            const errorData = res.error.data as { message: string }
            toast.error(errorData.message)
          } else {
            toast.error('Unknown error!')
          }
        }
      })
    };
  
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    };
  
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username:
            </label>
            <input
                type="text"
                id="username"
                name="username"
                className="mt-1 p-2 border rounded-md w-full"
                placeholder="Enter your username"
                value={username}
                onChange={handleUsernameChange}
                required
            />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 border rounded-md w-full"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }