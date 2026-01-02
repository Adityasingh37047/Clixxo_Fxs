import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { RESTART_SECTIONS, RESTART_BUTTON_LABEL } from '../constants/RestartConstants';
import { systemRestart, servicePing, serviceRestart, fetchSystemInfo } from '../api/apiService';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const blueBarStyle = {
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
};
const sectionContainerStyle = {
  width: '100%',
  maxWidth: 1400,
  background: '#fff',
  border: '1px solid #888',
  borderRadius: 8,
  margin: '32px auto',
  padding: 0,
  boxSizing: 'border-box',
  overflow: 'hidden',
};
const contentRowStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '48px 48px',
  gap: 24,
};
const instructionStyle = {
  fontSize: 20,
  color: '#666',
  textAlign: 'center',
  flex: 1,
};
const buttonSx = {
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
  color: '#fff',
  fontWeight: 600,
  fontSize: '18px',
  borderRadius: 2,
  minWidth: 140,
  minHeight: 48,
  px: 2,
  py: 0.5,
  boxShadow: '0 2px 8px #b3e0ff',
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
    color: '#fff',
  },
};

const Restart = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serviceSuccess, setServiceSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [loadingType, setLoadingType] = useState(''); // 'system' or 'service'
  const navigate = useNavigate();

  // Helper function to extract IP addresses from system info
  const getDeviceIPs = async () => {
    try {
      const sysInfo = await fetchSystemInfo();
      const getIpFromInterfaceObject = (obj) => {
        if (!obj || typeof obj !== 'object') return null;
        if (Array.isArray(obj['IP Address']) && obj['IP Address'][0]) return obj['IP Address'][0];
        if (Array.isArray(obj['Ip Address']) && obj['Ip Address'][0]) return obj['Ip Address'][0];
        if (Array.isArray(obj['ip_address']) && obj['ip_address'][0]) return obj['ip_address'][0];
        return null;
      };

      const details = sysInfo?.details || {};
      const lanInterfaces = details.LAN_INTERFACES || details.lan_interfaces || null;
      const interfacesArray = Array.isArray(lanInterfaces)
        ? lanInterfaces
        : (lanInterfaces && typeof lanInterfaces === 'object')
            ? Object.entries(lanInterfaces).map(([name, data]) => ({ name, data }))
            : [];

      let lan1Ip = null;
      let lan2Ip = null;
      
      interfacesArray.forEach((iface) => {
        const name = String(iface.name || iface.Name || '').toLowerCase();
        if (name.includes('eth0') || name.includes('lan 1') || name.includes('lan1')) {
          lan1Ip = lan1Ip || getIpFromInterfaceObject(iface.data || iface);
        }
        if (name.includes('eth1') || name.includes('lan 2') || name.includes('lan2')) {
          lan2Ip = lan2Ip || getIpFromInterfaceObject(iface.data || iface);
        }
      });

      // Fallback to direct network object access
      if (!lan1Ip) lan1Ip = getIpFromInterfaceObject(sysInfo?.network?.eth0) || getIpFromInterfaceObject(sysInfo?.eth0);
      if (!lan2Ip) lan2Ip = getIpFromInterfaceObject(sysInfo?.network?.eth1) || getIpFromInterfaceObject(sysInfo?.eth1);

      return { lan1Ip, lan2Ip };
    } catch (error) {
      console.error('Error getting device IPs:', error);
      return { lan1Ip: null, lan2Ip: null };
    }
  };

  // Function to ping both device IPs and return true if any responds
  const pingBothDeviceIPs = async (lan1Ip, lan2Ip) => {
    const pingPromises = [];
    const protocol = window.location.protocol;
    const port = window.location.port || (protocol === 'https:' ? '443' : '80');
    
    // Try to ping LAN1 IP if available
    if (lan1Ip) {
      pingPromises.push(
        axios.get(`${protocol}//${lan1Ip}:${port}/api/service-ping`, {
          timeout: 5000,
          headers: {
            'Content-Type': 'application/json',
          }
        }).then(() => true).catch(() => false)
      );
    }
    
    // Try to ping LAN2 IP if available
    if (lan2Ip) {
      pingPromises.push(
        axios.get(`${protocol}//${lan2Ip}:${port}/api/service-ping`, {
          timeout: 5000,
          headers: {
            'Content-Type': 'application/json',
          }
        }).then(() => true).catch(() => false)
      );
    }

    // If no IPs available, fallback to original servicePing
    if (pingPromises.length === 0) {
      try {
        await servicePing();
        return true;
      } catch {
        return false;
      }
    }

    // Wait for all pings and return true if any succeeds
    const results = await Promise.all(pingPromises);
    return results.some(result => result === true);
  };

  const handleRestart = async (sectionKey) => {
    setError('');
    if (sectionKey === 'system') {
      setLoading(true);
      setLoadingType('system');
      try {
        // Get device IPs before restart
        const { lan1Ip, lan2Ip } = await getDeviceIPs();
        
        await systemRestart();
        setTimeout(async () => {
          let pinged = false;
          for (let i = 0; i < 20; i++) {
            try {
              // Ping both device IPs - if any responds, device is back
              pinged = await pingBothDeviceIPs(lan1Ip, lan2Ip);
              if (pinged) {
                break;
              }
            } catch (e) {
              // Continue trying
            }
            await new Promise(res => setTimeout(res, 10000));
          }
          setLoading(false);
          setLoadingType('');
          if (pinged) {
            setSuccess(true);
            setShowModal(true);
          } else {
            alert('Server is not reachable. Please check your network or try again later.');
          }
        }, 5000);
      } catch (error) {
        console.error('System restart error:', error);
        
        let errorMessage = 'Failed to initiate system restart.';
        
        if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
          errorMessage = 'System restart timed out. Please check your connection and try again.';
        } else if (error.response?.status >= 500) {
          errorMessage = 'Server error during system restart. Please try again later or contact support.';
        } else if (error.message?.includes('Network Error') || error.message?.includes('Failed to fetch')) {
          errorMessage = 'Server is not connected. Please check your connection.';
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        alert(errorMessage);
        setLoading(false);
        setLoadingType('');
      }
    } else if (sectionKey === 'service') {
      setLoading(true);
      setLoadingType('service');
      try {
        // Get device IPs before restart
        const { lan1Ip, lan2Ip } = await getDeviceIPs();
        
        await serviceRestart();
        setTimeout(async () => {
          let pinged = false;
          for (let i = 0; i < 20; i++) {
            try {
              // Ping both device IPs - if any responds, device is back
              pinged = await pingBothDeviceIPs(lan1Ip, lan2Ip);
              if (pinged) {
                break;
              }
            } catch (e) {
              // Continue trying
            }
            await new Promise(res => setTimeout(res, 1000));
          }
          setLoading(false);
          setLoadingType('');
          if (pinged) {
            setServiceSuccess(true);
            setShowServiceModal(true);
          } else {
            alert('Server is not reachable. Please check your network or try again later.');
          }
        }, 5000);
      } catch (error) {
        console.error('Service restart error:', error);
        
        let errorMessage = 'Failed to initiate service restart.';
        
        if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
          errorMessage = 'Service restart timed out. Please check your connection and try again.';
        } else if (error.response?.status >= 500) {
          errorMessage = 'Server error during service restart. Please try again later or contact support.';
        } else if (error.message?.includes('Network Error') || error.message?.includes('Failed to fetch')) {
          errorMessage = 'Server is not connected. Please check your connection.';
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        alert(errorMessage);
        setLoading(false);
        setLoadingType('');
      }
    }
  };

  return (
    <div style={{ width: '100%', minHeight: 'calc(100vh - 80px)', background: 'gray-50', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0' }}>
      {RESTART_SECTIONS.map((section) => (
        <div key={section.key} style={sectionContainerStyle}>
          <div style={blueBarStyle}>{section.title}</div>
          <div style={{ ...contentRowStyle, flexDirection: 'row', padding: '48px 48px' }}>
            <div style={instructionStyle}>{section.instruction}</div>
            <Button
              sx={buttonSx}
              onClick={() => handleRestart(section.key)}
              disabled={loading && loadingType === section.key}
            >
              {RESTART_BUTTON_LABEL}
            </Button>
          </div>
        </div>
      ))}
      {error && (
        <div style={{ color: 'red', fontWeight: 600, fontSize: 18, marginTop: 24 }}>{error}</div>
      )}
      {loading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(255,255,255,0.7)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ fontSize: 28, fontWeight: 600, color: '#0e8fd6', marginBottom: 24 }}>
            {loadingType === 'system' ? 'System is restarting...' : 'Service is restarting...'}
          </div>
          <div className="loader" style={{ width: 48, height: 48, border: '6px solid #b3e0ff', borderTop: '6px solid #0e8fd6', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }`}</style>
        </div>
      )}
      {showModal && success && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.3)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ background: 'white', borderRadius: 12, padding: 40, minWidth: 320, textAlign: 'center', boxShadow: '0 2px 16px rgba(0,0,0,0.15)' }}>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#0e8fd6' }}>Restart successful</div>
            <div style={{ fontSize: 18, marginBottom: 32 }}>Now please login again.</div>
            <Button
              variant="contained"
              sx={{ ...buttonSx, minWidth: 100, fontSize: 18 }}
              onClick={() => {
                setShowModal(false);
                navigate('/login');
              }}
            >
              OK
            </Button>
          </div>
        </div>
      )}
      {showServiceModal && serviceSuccess && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.3)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ background: 'white', borderRadius: 12, padding: 40, minWidth: 320, textAlign: 'center', boxShadow: '0 2px 16px rgba(0,0,0,0.15)' }}>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#0e8fd6' }}>Service restart successful</div>
            <div style={{ fontSize: 18, marginBottom: 32 }}>The service has been restarted successfully.</div>
            <Button
              variant="contained"
              sx={{ ...buttonSx, minWidth: 100, fontSize: 18 }}
              onClick={() => {
                setShowServiceModal(false);
                setServiceSuccess(false);
              }}
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Restart; 