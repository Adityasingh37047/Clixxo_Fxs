import React, { useState } from 'react';
import clixxoLogo from '../assets/Clixxo-logo.png';
import phoneIcon from '../assets/phone-icon.png';
import headerGlow from '../assets/header-glow.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState('online'); // Default to online, will be checked during login
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Smart validation (exact place)
    if (!username.trim() && !password.trim()) {
      alert('Please enter your username and password');
      return;
    }

    if (!username.trim()) {
      alert('Please enter your username!');
      return;
    }

    if (!password.trim()) {
      alert('Please enter your password!');
      return;
    }

    setIsLoading(true);
    setServerStatus('online'); // Reset server status

    try {
      await login(username, password);
      navigate('/');
    } catch (err) {

      // Check if it's a network/server error
      if (err.message.includes('Network Error') || err.message.includes('Failed to fetch')) {
        setServerStatus('offline');
      } else {
        alert('The username or password you entered is incorrect. Please enter again!');
      }

    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setUsername('');
    setPassword('');
    setError('');
    setServerStatus('online');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  
  return (
    <div className="min-h-screen bg-[#e1e4e9] flex flex-col items-center justify-start">
      {/* Top Bar */}
      <div className="w-screen h-[195px] bg-[#23272b] relative overflow-hidden border-b border-[#c0c0c0]">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 " style={{
            backgroundColor: "#000101", backgroundImage: `repeating-linear-gradient(45deg,
        rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 0.5px, transparent 1px, transparent 1px)`,
          }} />

        {/* Glow Image */}
        <div className="absolute top-0 right-0 h-[170px] w-[180px] opacity-100 pointer-events-none">
          <img
            src={headerGlow}
            alt=""
            className="h-full w-full object-cover mix-blend-screen"
          />
        </div>

        {/* Server Status in Top Bar */}
        {serverStatus === 'offline' && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="bg-[#f8d7da] text-[#721c24] px-6 py-4 rounded-lg text-lg font-medium border border-[#f5c6cb] shadow-lg flex flex-col items-center">
              <div className="flex items-center mb-6">
                <span className="mr-3 text-xl">⚠️</span>
                Server is offline. Please check your connection.
              </div>
              <button
                onClick={async () => {
                  setServerStatus('online');
                  setError('');
                  if (username.trim() && password.trim()) {
                    setIsLoading(true);
                    try {
                      const success = await login(username, password);
                      if (success) {
                        navigate('/');
                      } else {
                        setError('Login failed. Please check your credentials.');
                      }
                    } catch (err) {
                      if (err.message && (err.message.includes('Network Error') || err.message.includes('Failed to fetch') || err.code === 'ECONNABORTED')) {
                        setServerStatus('offline');
                      } else {
                        setError(err.message || 'Login failed. Please check your credentials.');
                      }
                    } finally {
                      setIsLoading(false);
                    }
                  }
                }}
                className="bg-[#721c24] text-white px-4 py-2 rounded-md hover:bg-[#5a1a1a] transition-colors"
              >
                Retry Connection
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="px-6 py-0 flex flex-col items-center relative -mt-5 w-[95vw] max-w-[400px]">
        {/* Error Message */}
        {error && (
          <div className="bg-[#f8d7da] text-[#a94442] px-5 py-3 rounded-md text-base font-medium mb-6 w-full max-w-xs absolute -top-16 left-1/2 -translate-x-1/2 border border-[#f5c6cb] flex items-center justify-between z-10 shadow">
            <span className="flex items-center">

              {error}
            </span>
            <span
              className="cursor-pointer text-2xl ml-4 leading-none"
              onClick={() => setError('')}
            >
              &times;
            </span>
          </div>
        )}
        {/* Logo and Phone Icon Area */}
        <div className="mb-0 flex items-end justify-center w-full relative h-[100px]">
          {/* Phone Icon */}
          <div className="absolute left-[20%] bottom-0 transform -translate-x-1/2 translate-y-2 z-30">
            <img src={phoneIcon} alt="Phone" className="w-[120px] h-[210px] object-contain" />
          </div>
          {/* Logo */}
          <div className="ml-16 mb-4">
            <img src={clixxoLogo} alt="Clixxo Logo" className="w-[140px] h-[80px] object-contain" />
          </div>
        </div>


        {/* Login Form */}

        <form onSubmit={handleLogin} className="w-full max-w-[300px] mx-auto mt-[-15px] px-2">
          <div className="flex items-center gap-4 mb-3">
            <label
              className="text-[17px] text-[#4b5563] font-normal whitespace-nowrap w-[100px] text-left shrink-0"
              htmlFor="username"
            >
              Username:
            </label>
            <div className="relative shrink-0">
              <input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="text-sm px-2 py-1 rounded border border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-300 bg-white disabled:bg-gray-100 w-[130px] h-[26px] shadow-inner box-border"
                autoFocus
                disabled={isLoading}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && password) {
                    handleLogin(e);
                  }
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-4 mb-7">
            <label className="text-[17px] text-[#4b5563] font-normal whitespace-nowrap w-[100px] text-left shrink-0" htmlFor="password">Password:</label>
            <div className="relative shrink-0">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="text-sm px-2 py-1 pr-8 rounded border border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-300 bg-white disabled:bg-gray-100 w-[130px] h-[26px] shadow-inner box-border"
                disabled={isLoading}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && username && password) {
                    handleLogin(e);
                  }
                }}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none disabled:opacity-100 z-10"
                disabled={isLoading}
                tabIndex={-1}
              >
                {showPassword ? <VisibilityOff style={{ fontSize: 16 }} /> : <Visibility style={{ fontSize: 16 }} />}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 w-full mt-2">
            <div className="w-[100px] shrink-0">
              <button
                type="submit"
                disabled={isLoading || serverStatus === 'offline'}
                className={`w-[90px] px-1 py-0.5 text-[14px] font-medium shadow-md transition-all duration-200 rounded border border-gray-400
                ${isLoading || serverStatus === 'offline'
                    ? 'bg-gray-300 text-white cursor-not-allowed'
                    : 'bg-gradient-to-b from-[#87d4f9] via-[#3ebcf7] to-[#1297db] text-black hover:brightness-110 active:scale-95 cursor-pointer'}
`}
              >
                {isLoading ? 'Wait...' : serverStatus === 'offline' ? 'Offline' : 'Login'}
              </button>
            </div>
            <div className="relative shrink-0 w-[130px] flex justify-end">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isLoading}
                className={`w-[90px] px-1 py-0.5 text-[14px] font-medium shadow-md transition-all duration-200 rounded border border-gray-400
                ${isLoading
                    ? 'bg-gray-300 text-white cursor-not-allowed'
                    : 'bg-gray-400 text-black hover:brightness-110 active:scale-95 cursor-pointer'}
`}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; 
