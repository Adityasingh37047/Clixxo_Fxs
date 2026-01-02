import React, { useState } from 'react';
import { VPN_SETTINGS_INITIAL, VPN_RUNNING_INFO } from '../constants/VpnSettingsConstants';
import { 
  Button, 
  Paper, 
  Typography, 
  TextField, 
  Chip,
  CircularProgress
} from '@mui/material';
import {
  PlayArrow as StartIcon,
  Stop as StopIcon,
  Refresh as RefreshIcon,
  Upload as UploadIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

const blueButtonSx = {
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
  color: '#fff',
  fontWeight: 600,
  fontSize: 16,
  borderRadius: 1.5,
  minWidth: 120,
  boxShadow: '0 2px 6px #0002',
  textTransform: 'none',
  px: 3,
  py: 1.5,
  padding: '6px 28px',
  border: '1px solid #0e8fd6',
  '&:hover': {
    background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
    color: '#fff',
  },
};

const VpnSettingsPage = () => {
  const [form] = useState(VPN_SETTINGS_INITIAL);
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [vpnStatus, setVpnStatus] = useState('Unknown');
  const [vpnLogs, setVpnLogs] = useState(VPN_RUNNING_INFO);
  const [enableChoice, setEnableChoice] = useState('yes');

  const handleCertChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }
    alert('File uploaded successfully!');
    setSelectedFile(null);
  };

  const handleStartVpn = () => {
    alert('VPN started successfully!');
    setVpnStatus('Running');
  };

  const handleStopVpn = () => {
    alert('VPN stopped successfully!');
    setVpnStatus('Stopped');
  };

  const handleCheckStatus = () => {
    alert('Status checked successfully!');
  };

  const handleRefreshLogs = () => {
    setVpnLogs('VPN logs will appear here...');
  };

  const handleSaveEnable = () => {
    const enable = enableChoice === 'yes';
    alert(`AutoStart ${enable ? 'enabled' : 'disabled'} successfully!`);
    setShowAdvanced(enable);
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-80px)] flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Header */}
        <div style={{
          width: '100%',
          height: 36,
          background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 50%, #3b8fd6 100%)',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          marginBottom: 0,
          display: 'flex',
          alignItems: 'center',
          fontWeight: 600,
          fontSize: 22,
          color: '#444',
          justifyContent: 'center',
          boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)',
        }}>
          VPN Settings
        </div>

        {/* Content */}
        <Paper elevation={3} className="p-6 bg-white rounded-b-lg shadow-lg" style={{ borderTop: 'none' }}>
          
          <div className="space-y-6">

            {/* AutoStart OPENVPN toggle directly below blue bar */}
            <div className="bg-[#e5e8ed] p-6 rounded border border-gray-300">
              <div className="grid grid-cols-1 md:grid-cols-3 items-center">
                <div className="text-[18px] text-gray-700 font-medium md:text-right md:pr-6 mb-2 md:mb-0">AutoStart OPENVPN</div>
                <div className="flex items-center gap-6 justify-start md:justify-start">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="enableOpenVpn" checked={enableChoice==='yes'} onChange={()=>setEnableChoice('yes')} />
                    <span className="text-gray-700 text-[18px]">Yes</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="enableOpenVpn" checked={enableChoice==='no'} onChange={()=>setEnableChoice('no')} />
                    <span className="text-gray-700 text-[18px]">No</span>
                  </label>
                </div>
                <div className="flex md:justify-end mt-3 md:mt-0">
                  <Button 
                    variant="contained" 
                    onClick={handleSaveEnable}
                    sx={{
                      background: 'linear-gradient(to bottom, #5db6e8 0%, #298fcf 100%)',
                      color: '#fff', fontWeight: 600, fontSize: '18px', borderRadius: 1.5,
                      minWidth: 120, boxShadow: '0 2px 6px #0002', textTransform: 'none', px: 3, py: 1.5,
                      '&:hover': { background: 'linear-gradient(to bottom, #298fcf 0%, #5db6e8 100%)' }
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>

            {/* OpenVPN Operations Section */}
            {showAdvanced && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                
                {/* File Upload */}
                <div className="mb-4">
                  <Typography variant="subtitle1" className="mb-2 text-gray-700 font-medium">
                    Upload Configuration File
                  </Typography>
                  <div className="flex items-center gap-4">
                    <input
                      id="vpn-file-upload"
                      type="file"
                      accept=".ovpn,.conf"
                      onChange={handleCertChange}
                      style={{ display: 'none' }}
                    />
                    <label
                      htmlFor="vpn-file-upload"
                      className="cursor-pointer select-none"
                      style={{
                        padding: '8px 16px',
                        background: '#f3f4f6',
                        border: '1px solid #c7c9cf',
                        borderRadius: 6,
                        boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.06)',
                        color: '#111827',
                        fontWeight: 600,
                        transition: 'all .15s ease-in-out'
                      }}
                      onMouseOver={(e)=>{ e.currentTarget.style.background='#e5e7eb'; e.currentTarget.style.borderColor='#b6bac3'; }}
                      onMouseOut={(e)=>{ e.currentTarget.style.background='#f3f4f6'; e.currentTarget.style.borderColor='#c7c9cf'; }}
                    >
                      Choose File
                    </label>
                    <span style={{ color: '#374151' }}>{selectedFile ? selectedFile.name : 'No file chosen'}</span>
                    <Button
                      variant="contained"
                      startIcon={<UploadIcon />}
                      onClick={handleFileUpload}
                      disabled={!selectedFile}
                      sx={{
                        background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
                        color: '#fff',
                        fontWeight: 600,
                        textTransform: 'none',
                        minWidth: 160,
                      }}
                    >
                      Upload File
                    </Button>
                  </div>
                </div>

                {/* VPN Controls */}
                <div className="mb-4">
                  <Typography variant="subtitle1" className="mb-2 text-gray-700 font-medium">
                    VPN Controls
                  </Typography>
                  <div className="flex flex-wrap gap-4">
                    <Button
                      variant="contained"
                      startIcon={<StartIcon />}
                      onClick={handleStartVpn}
                      sx={blueButtonSx}
                    >
                      Start VPN
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<StopIcon />}
                      onClick={handleStopVpn}
                      sx={blueButtonSx}
                    >
                      Stop VPN
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<CheckCircleIcon />}
                      onClick={handleCheckStatus}
                      sx={blueButtonSx}
                    >
                      Check Status
                    </Button>
                  </div>
                </div>

                {/* VPN Status */}
                <div className="mb-4">
                  <Typography variant="subtitle1" className="mb-2 text-gray-700 font-medium">
                    Current Status
                  </Typography>
                  <div className="flex items-center gap-2">
                    <Chip
                      label={vpnStatus}
                      variant="filled"
                      sx={{
                        fontSize: 18,
                        height: 40,
                        borderRadius: 9999,
                        px: 2.5,
                        color: '#fff',
                        backgroundColor:
                          vpnStatus === 'Running' ? '#2e7d32' :
                          vpnStatus === 'Stopped' ? '#c62828' : '#ef6c00'
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* VPN Logs Section */}
            {showAdvanced && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <Typography variant="h6" className="text-gray-800 font-semibold">
                    VPN Logs
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<RefreshIcon />}
                    onClick={handleRefreshLogs}
                    sx={blueButtonSx}
                  >
                    Refresh Logs
                  </Button>
                </div>
                <TextField
                  multiline
                  rows={8}
                  value={vpnLogs || 'No logs available'}
                  variant="outlined"
                  fullWidth
                  InputProps={{ readOnly: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '12px',
                      fontFamily: 'monospace',
                      backgroundColor: '#f8f9fa'
                    }
                  }}
                />
              </div>
            )}
            
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default VpnSettingsPage;
