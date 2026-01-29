import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Select, MenuItem, Alert, CircularProgress } from '@mui/material';
import { fetchNetwork, resetNetworkSettings, saveNetworkSettings, postLinuxCmd, servicePing } from '../api/apiService';

const blueButtonSx = {
  background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
  color: '#fff',
  fontWeight: 600,
  fontSize: 16,
  borderRadius: 1.5,
  minWidth: 120,
  boxShadow: '0 2px 8px #b3e0ff',
  textTransform: 'none',
  px: 3,
  py: 1.5,
  padding: '6px 28px',
  '&:hover': {
    background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
    color: '#fff',
  },
};

const grayButtonSx = {
  background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
  color: '#444',
  fontWeight: 600,
  fontSize: 15,
  borderRadius: 1.5,
  minWidth: 120,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  textTransform: 'none',
  px: 3,
  py: 1.5,
  padding: '6px 28px',
  '&:hover': {
    background: 'linear-gradient(to bottom, #bfc6d1 0%, #e3e7ef 100%)',
    color: '#444',
  },
};

// Unified input sizing to keep all fields consistent (32px height)
const inputSx = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#fff',
    height: '32px',
    minHeight: '32px',
    '& fieldset': { borderColor: '#bbb', borderWidth: '1px' },
    '&:hover fieldset': { borderColor: '#999' },
    '&.Mui-focused fieldset': { borderColor: '#666' },
  },
  '& .MuiInputBase-input': {
    fontSize: '14px',
    padding: '6px 8px',
    height: '20px',
    lineHeight: '20px',
  },
};

const select32Sx = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#fff !important',
    height: '32px',
    minHeight: '32px',
    '& fieldset': { borderColor: '#bbb', borderWidth: '1px' },
    '&:hover fieldset': { borderColor: '#999' },
    '&.Mui-focused fieldset': { borderColor: '#666' },
  },
  '& .MuiSelect-select': {
    backgroundColor: '#fff !important',
    fontSize: '14px',
    padding: '6px 8px',
    height: '20px',
    lineHeight: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  '& .MuiSelect-icon': { color: '#666', right: '8px' },
};

const QuickConfig = () => {
  const [lanInterfaces, setLanInterfaces] = useState([]);
  const [dnsServers, setDnsServers] = useState(['', '']);
  const [arpMode, setArpMode] = useState('1');
  const [loading, setLoading] = useState(true); // Start with loading true for initial load
  const [error, setError] = useState('');
  const [resetting, setResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  // Error states for each field
  const [ipErrors, setIpErrors] = useState([]);
  const [subnetErrors, setSubnetErrors] = useState([]);
  const [gatewayErrors, setGatewayErrors] = useState([]);
  const [dnsErrors, setDnsErrors] = useState(['', '']);
  const [arpError, setArpError] = useState('');
  // Removed showConfirm and pendingSave for native confirm
  const [hasChanges, setHasChanges] = useState(false);
  const [networkRestarting, setNetworkRestarting] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');
  const [pendingIps, setPendingIps] = useState([]);

  const [originalLanSnapshot, setOriginalLanSnapshot] = useState([]);
  const [originalDnsSnapshot, setOriginalDnsSnapshot] = useState(['', '']);
  const [originalArp, setOriginalArp] = useState('1');

  const pingIntervalRef = useRef(null);
  const restartTimeoutRef = useRef(null);

  function isValidIPv4(ip) {
    return /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip);
  }
  function isValidSubnetMask(mask) {
    const masks = [
      "255.0.0.0","255.255.0.0","255.255.255.0","255.255.255.128","255.255.255.192","255.255.255.224","255.255.255.240","255.255.255.248","255.255.255.252","255.255.255.254","255.255.255.255"
    ];
    return masks.includes(mask);
  }
  function isValidArpMode(mode) {
    return mode === '1' || mode === '2';
  }

  const clearRestartPolling = () => {
    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current);
      pingIntervalRef.current = null;
    }
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearRestartPolling();
    };
  }, []);

  const loadNetworkData = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await fetchNetwork();

      if (data && data.data) {
        if (Array.isArray(data.data.interfaces)) {
          const allIfaces = data.data.interfaces;
          const filteredInterfaces = allIfaces
            .filter(iface => {
              const interfaceName = iface.interface || '';
              return interfaceName === 'eth0' || interfaceName === 'eth1';
            })
            .map(iface => {
              if (iface.interface === 'eth0') {
                return { ...iface, name: 'LAN 1' };
              } else if (iface.interface === 'eth1') {
                return { ...iface, name: 'LAN 2' };
              }
              return iface;
            })
            .sort((a, b) => {
              const order = { 'LAN 1': 1, 'LAN 2': 2 };
              const aOrder = order[a.name] || 99;
              const bOrder = order[b.name] || 99;
              return aOrder - bOrder;
            });

          setLanInterfaces(filteredInterfaces);
          setOriginalLanSnapshot(normalizeLanArray(filteredInterfaces));
        }
        const dnsSnap = data.data.dnsServers || ['', ''];
        const arpSnap = data.data.defaultArpMode || '1';
        setDnsServers(dnsSnap);
        setArpMode(arpSnap);
        setOriginalDnsSnapshot([...(dnsSnap || ['', ''])]);
        setOriginalArp(arpSnap);
      } else { 
        throw new Error('Invalid data format received from server');
      }
    } catch (err) {
      console.error('Network data fetch error:', err);

      if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
        setError('Request timeout. Please check your connection and try again.');
      } else if (err.response?.status === 404) {
        setError('Network configuration not found. Please contact administrator.');
      } else if (err.response?.status >= 500) {
        setError('Server error. Please try again later or contact support.');
      } else if (err.message?.includes('Network Error') || err.message?.includes('Failed to fetch')) {
        setError('Network connection failed. Please check your internet connection.');
      } else {
        setError('Failed to load network settings. Please refresh the page and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNetworkData();
  }, []);

  const normalizeLanArray = (interfaces = []) => (
    (interfaces || []).map((lan, idx) => ({
      key: (lan?.interface || lan?.name || `index-${idx}`).toString(),
      ipAddress: lan?.ipAddress || '',
      subnetMask: lan?.subnetMask || '',
      defaultGateway: lan?.defaultGateway || '',
      ipv6Address: lan?.ipv6Address || '',
      ipv6Prefix: lan?.ipv6Prefix || '',
    }))
  );

  // Update setHasChanges to true on any input change
  const handleLanChange = (index, field, value) => {
    setHasChanges(true);
    setLanInterfaces(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    // Clear error for the changed field
    if (field === 'ipAddress') {
      setIpErrors(prev => {
        const arr = [...prev]; arr[index] = ''; return arr;
      });
    }
    if (field === 'subnetMask') {
      setSubnetErrors(prev => {
        const arr = [...prev]; arr[index] = ''; return arr;
      });
    }
    if (field === 'defaultGateway') {
      setGatewayErrors(prev => {
        const arr = [...prev]; arr[index] = ''; return arr;
      });
    }
  };

  const handleDnsChange = (idx, value) => {
    setHasChanges(true);
    setDnsServers(prev => {
      const updated = [...prev];
      updated[idx] = value;
      return updated;
    });
    setDnsErrors(prev => {
      const arr = [...prev]; arr[idx] = ''; return arr;
    });
  };

  const handleArpChange = (e) => {
    setHasChanges(true);
    setArpMode(e.target.value);
    setArpError('');
  };

  const handleReset = async () => {
    clearRestartPolling();
    setNetworkRestarting(false);
    setProgressMessage('');
    try {
      setResetting(true);
      setResetSuccess(false);
      setError('');
      
      const resp = await resetNetworkSettings();
      
      if (resp.response) {
        await loadNetworkData();
        setResetSuccess(true);
        setTimeout(() => setResetSuccess(false), 3000);
      } else {
        throw new Error(resp.message || 'Reset operation failed');
      }
    } catch (error) {
      console.error('Network reset error:', error);
      
      if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        setError('Reset timeout. Please check your connection and try again.');
      } else if (error.response?.status >= 500) {
        setError('Server error during reset. Please try again later.');
      } else if (error.message?.includes('Network Error') || error.message?.includes('Failed to fetch')) {
        setError('Network connection failed during reset. Please check your connection.');
      } else {
        setError(error.message || 'Failed to reset network settings. Please try again.');
      }
    } finally {
      setResetting(false);
    }
  };

  const pingDevice = async (targetIp) => {
    const protocol = window.location.protocol;
    const port = window.location.port ? `:${window.location.port}` : '';
    const base = targetIp ? `${protocol}//${targetIp}${port}` : window.location.origin;
    const url = `${base}/api/service-ping`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);
    try {
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        signal: controller.signal,
      });
      if (!res.ok) throw new Error('Ping failed');
      const data = await res.json();
      return data;
    } finally {
      clearTimeout(timeout);
    }
  };

  const checkDeviceOnline = async (targetIp = null) => {
    try {
      const res = targetIp ? await pingDevice(targetIp) : await servicePing();
      if (res?.response) return true;
      return false;
    } catch (err) {
      if (err?.response && (err.response.status === 401 || err.response.status === 403)) {
        return true;
      }
      return false;
    }
  };

  const beginNetworkPolling = (initialMessage = 'Checking device availability...', targetIpList = []) => {
    clearRestartPolling();
    setProgressMessage(initialMessage);
    const sanitizedTargets = (targetIpList && targetIpList.length ? targetIpList : [window.location.hostname])
      .map(ip => (ip || '').trim())
      .filter(Boolean);
    const targets = Array.from(new Set(sanitizedTargets.length ? sanitizedTargets : [window.location.hostname]));

    let attempts = 0;
    pingIntervalRef.current = setInterval(async () => {
      attempts += 1;
      for (const targetIp of targets) {
        const online = await checkDeviceOnline(targetIp);
        if (online) {
          clearRestartPolling();
          setProgressMessage('Device is back online. Redirecting to login...');
          setTimeout(() => {
            const protocol = window.location.protocol;
            const port = window.location.port ? `:${window.location.port}` : '';
            const redirectHost = targetIp || window.location.hostname;
            window.location.href = `${protocol}//${redirectHost}${port}/login`;
          }, 3000);
          return;
        }
      }
      if (attempts >= 60) {
        clearRestartPolling();
        setNetworkRestarting(false);
        setProgressMessage('');
        setError('Network service restart timed out. Please verify device connectivity.');
      }
    }, 5000);
  };

  const triggerNetworkRestart = async (targetsOverride = null) => {
    setNetworkRestarting(true);
    setProgressMessage('Network settings saved. Rebooting device...');
    try {
      const rebootCmd = 'nohup sh -c "sleep 5; reboot" >/dev/null 2>&1 & echo REBOOT_TRIGGERED';
      await postLinuxCmd({ cmd: rebootCmd });
    } catch (err) {
      console.error('Failed to initiate reboot:', err);
      setNetworkRestarting(false);
      setProgressMessage('');
      setError(err?.message || 'Failed to reboot device. Please reboot manually.');
      return;
    }

    const targets = (targetsOverride && targetsOverride.length ? targetsOverride : pendingIps?.length ? pendingIps : null) || [window.location.hostname];

    restartTimeoutRef.current = setTimeout(() => {
      beginNetworkPolling('Device is rebooting. Waiting for it to come back online...', targets);
    }, 8000);
  };

  // Move actual save logic here
  const actuallySave = async () => {
    setLoading(true);
    setError('');

    // Validate all fields
    let valid = true;
    const ipErrs = new Array(lanInterfaces.length).fill('');
    const subnetErrs = new Array(lanInterfaces.length).fill('');
    const gatewayErrs = new Array(lanInterfaces.length).fill('');
    const dnsErrs = ['', ''];
    let arpErr = '';
    const candidatePriorities = new Map();
    const baselineMap = new Map((originalLanSnapshot || []).map(item => [item.key, item]));

    lanInterfaces.forEach((lan, idx) => {
      if (!isValidIPv4(lan.ipAddress)) {
        ipErrs[idx] = 'Please enter a valid IP address.';
        valid = false;
      } else {
        ipErrs[idx] = '';
      }
      if (!isValidSubnetMask(lan.subnetMask)) {
        subnetErrs[idx] = 'Please enter a valid subnet mask.';
        valid = false;
      } else {
        subnetErrs[idx] = '';
      }
      if (!isValidIPv4(lan.defaultGateway)) {
        gatewayErrs[idx] = 'Please enter a valid gateway address.';
        valid = false;
      } else {
        gatewayErrs[idx] = '';
      }

      const key = (lan.interface || lan.name || `index-${idx}`).toString();
      const baseline = baselineMap.get(key);
      const candidateIp = (lan.ipAddress || '').trim();
      const previousIp = (baseline?.ipAddress || '').trim();
      const ifaceName = (lan.interface || '').toLowerCase();
      const displayName = (lan.name || '').toLowerCase();
      const isPrimaryIface = ifaceName === 'eth0' || displayName === 'lan 1';

      const addCandidate = (ip, priority) => {
        if (!ip) return;
        const value = ip.trim();
        if (!value) return;
        const existing = candidatePriorities.get(value);
        if (existing === undefined || priority < existing) {
          candidatePriorities.set(value, priority);
        }
      };

      if (candidateIp && previousIp && candidateIp !== previousIp) {
        addCandidate(candidateIp, isPrimaryIface ? 0 : 1);
        addCandidate(previousIp, isPrimaryIface ? 2 : 3);
      } else if (candidateIp) {
        addCandidate(candidateIp, isPrimaryIface ? 0 : 5);
      }
    });

    if (dnsServers[0] && !isValidIPv4(dnsServers[0])) {
      dnsErrs[0] = 'Please enter a valid IP address.';
      valid = false;
    }
    if (dnsServers[1] && !isValidIPv4(dnsServers[1])) {
      dnsErrs[1] = 'Please enter a valid IP address.';
      valid = false;
    }
    if (!isValidArpMode(arpMode)) {
      arpErr = 'Please select a valid ARP mode.';
      valid = false;
    }
    setIpErrors(ipErrs);
    setSubnetErrors(subnetErrs);
    setGatewayErrors(gatewayErrs);
    setDnsErrors(dnsErrs);
    setArpError(arpErr);

    const currentHost = window.location.hostname;
    if (currentHost) {
      const existing = candidatePriorities.get(currentHost);
      candidatePriorities.set(currentHost, existing === undefined ? 10 : Math.min(existing, 10));
    }

    const pendingList = Array.from(candidatePriorities.entries())
      .sort((a, b) => a[1] - b[1])
      .map(([ip]) => ip);
    setPendingIps(pendingList);

    if (!valid) {
      setLoading(false);
      return;
    }

    try {
      const lanArray = lanInterfaces.map(lan => ({
        name: lan.interface,
        ipv4Type: lan.ipv4Type,
        ipAddress: lan.ipAddress,
        subnetMask: lan.subnetMask,
        defaultGateway: lan.defaultGateway,
        ipv6Address: lan.ipv6Address,
        ipv6Prefix: lan.ipv6Prefix,
      }));
      const dnsArray = [
        { preferredDns: dnsServers[0] },
        { standbyDns: dnsServers[1] }
      ];
      const arpArray = [
        { defaultArpMode: arpMode }
      ];
      const payload = {
        interfaces: lanArray,
        dnsServers: dnsArray,
        arpMode: arpArray
      };
      console.log(payload);

      const response = await saveNetworkSettings(payload);
      
      if (response.response) {
        setHasChanges(false);
        setLoading(false);
        await triggerNetworkRestart(pendingList);
        return;
      } else {
        throw new Error(response.message || 'Save operation failed');
      }
    } catch (error) {
      console.error('Network save error:', error);
      
      let errorMessage = 'Failed to save network settings.';
      
      if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        errorMessage = 'Save operation timed out. Please check your connection and try again.';
      } else if (error.response?.status === 400) {
        errorMessage = 'Invalid network configuration. Please check your settings and try again.';
      } else if (error.response?.status >= 500) {
        errorMessage = 'Server error during save. Please try again later or contact support.';
      } else if (error.message?.includes('Network Error') || error.message?.includes('Failed to fetch')) {
        errorMessage = 'Network connection failed during save. Please check your connection.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      window.alert(errorMessage);
      setError(errorMessage);
    } finally {
      if (!networkRestarting) {
        setLoading(false);
      }
    }
  };

  // Use native browser confirm dialog
  const handleSave = async (e) => {
    e.preventDefault();
    if (hasChanges) {
      const confirmed = window.confirm("Are you sure you want to save changes?");
      if (!confirmed) {
        return; // User cancelled, do nothing
      }
      await actuallySave(); // Proceed with save and redirect
      return;
    }
    // If no changes, do nothing or show a message
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-200px)] flex flex-col items-center box-border" style={{backgroundColor: "#dde0e4"}}>
      {/* Message Display */}
      {error && (
        <Alert 
          severity="error" 
          onClose={() => setError('')}
          sx={{
            position: 'fixed', 
            top: 20, 
            right: 20, 
            zIndex: 9999,
            minWidth: 300,
            boxShadow: 3
          }}
        >
          {error}
        </Alert>
      )}


      <div className="w-full max-w-6xl mx-auto">
        {/* Blue header bar */}
        <div className="rounded-t-lg h-8 flex items-center justify-center font-semibold text-[18px] text-[#444] shadow-sm mt-0"
          style={{background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 50%, #3b8fd6 100%)', boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)'}}>
          Quick Config-Network Settings
        </div>
        {/* Main content container */}
        <div className="w-full border-2 border-gray-400 border-t-0 shadow-sm flex flex-col" style={{backgroundColor: "#dde0e4"}}>
          {loading ? (
            <div className="flex items-center justify-center min-h-[500px] bg-white">
              <div className="text-center">
                <CircularProgress size={40} sx={{ color: '#0e8fd6' }} />
                <div className="mt-3 text-gray-600">Loading network settings...</div>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col overflow-hidden">
            <div className="p-4">
              <form onSubmit={handleSave} className="space-y-4">
                {/* Dynamically render LAN sections */}
                {lanInterfaces.map((lan, idx) => (
                  <div key={lan.name || idx} className="space-y-2">
                    <h3 className="text-[12px] text-gray-600 font-medium mb-2" style={{ paddingLeft: '20px' }}>
                      {lan.name || `LAN ${idx + 1}`}
                    </h3>
                    
                    {/* IPV4 Network Type */}
                    <div className="flex items-center justify-center" style={{ minHeight: 32 }}>
                      <div className="flex items-center" style={{width: '560px'}}>
                        <label className="text-[14px] text-gray-700 font-medium whitespace-nowrap text-left" style={{width:220, marginRight:60}}>
                          IPV4 Network Type (M):
                        </label>
                        <div style={{width: 320}}>
                          <Select
                            value={lan.ipv4Type || 'Static'}
                            onChange={e => handleLanChange(idx, 'ipv4Type', e.target.value)}
                            size="small"
                            variant="outlined"
                            fullWidth
                            sx={select32Sx}
                          >
                            <MenuItem value="Static">Static</MenuItem>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* IP Address */}
                    <div className="flex items-center justify-center" style={{ minHeight: 32 }}>
                      <div className="flex items-center" style={{width: '560px'}}>
                        <label className="text-[14px] text-gray-700 font-medium whitespace-nowrap text-left" style={{width:220, marginRight:60}}>
                          IP Address (I):
                        </label>
                        <div style={{width: 320}}>
                          <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={lan.ipAddress || ''}
                            onChange={e => handleLanChange(idx, 'ipAddress', e.target.value)}
                            sx={inputSx}
                          />
                          {ipErrors[idx] && (
                            <div className="text-red-600 text-sm mt-1">{ipErrors[idx]}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Subnet Mask */}
                    <div className="flex items-center justify-center" style={{ minHeight: 32 }}>
                      <div className="flex items-center" style={{width: '560px'}}>
                        <label className="text-[14px] text-gray-700 font-medium whitespace-nowrap text-left" style={{width:220, marginRight:60}}>
                          Subnet Mask (U):
                        </label>
                        <div style={{width: 320}}>
                          <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={lan.subnetMask || ''}
                            onChange={e => handleLanChange(idx, 'subnetMask', e.target.value)}
                            sx={inputSx}
                          />
                          {subnetErrors[idx] && (
                            <div className="text-red-600 text-sm mt-1">{subnetErrors[idx]}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Default Gateway */}
                    <div className="flex items-center justify-center" style={{ minHeight: 32 }}>
                      <div className="flex items-center" style={{width: '560px'}}>
                        <label className="text-[14px] text-gray-700 font-medium whitespace-nowrap text-left" style={{width:220, marginRight:60}}>
                          Default Gateway (D):
                        </label>
                        <div style={{width: 320}}>
                          <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={lan.defaultGateway || ''}
                            onChange={e => handleLanChange(idx, 'defaultGateway', e.target.value)}
                            sx={inputSx}
                          />
                          {gatewayErrors[idx] && (
                            <div className="text-red-600 text-sm mt-1">{gatewayErrors[idx]}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* IPV6 Address */}
                    <div className="flex items-center justify-center" style={{ minHeight: 32 }}>
                      <div className="flex items-center" style={{width: '560px'}}>
                        <label className="text-[14px] text-gray-700 font-medium whitespace-nowrap text-left" style={{width:220, marginRight:60}}>
                          IPV6 Address (I):
                        </label>
                        <div style={{width: 320}}>
                          <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={lan.ipv6Address || ''}
                            onChange={e => handleLanChange(idx, 'ipv6Address', e.target.value)}
                            sx={inputSx}
                          />
                        </div>
                      </div>
                    </div>

                    {/* IPV6 Address Prefix */}
                    <div className="flex items-center justify-center" style={{ minHeight: 32 }}>
                      <div className="flex items-center" style={{width: '560px'}}>
                        <label className="text-[14px] text-gray-700 font-medium whitespace-nowrap text-left" style={{width:220, marginRight:60}}>
                          IPV6 Address Prefix (U):
                        </label>
                        <div style={{width: 320}}>
                          <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={lan.ipv6Prefix || ''}
                            onChange={e => handleLanChange(idx, 'ipv6Prefix', e.target.value)}
                            sx={inputSx}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* DNS Server Set */}
                <div className="space-y-2">
                  <h3 className="text-[12px] text-gray-600 font-medium mb-2" style={{ paddingLeft: '20px' }}>
                    DNS Server Set
                  </h3>
                  
                  {/* Preferred DNS Server */}
                  <div className="flex items-center justify-center" style={{ minHeight: 32 }}>
                    <div className="flex items-center" style={{width: '460px'}}>
                      <label className="text-[14px] text-gray-700 font-medium whitespace-nowrap text-left" style={{width:160, marginRight:40}}>
                        Preferred DNS Server (P):
                      </label>
                      <div style={{width: 300}}>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={dnsServers[0] || ''}
                          onChange={e => handleDnsChange(0, e.target.value)}
                          sx={inputSx}
                        />
                        {dnsErrors[0] && (
                          <div className="text-red-600 text-sm mt-1">{dnsErrors[0]}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Standby DNS Server */}
                  <div className="flex items-center justify-center" style={{ minHeight: 32 }}>
                    <div className="flex items-center" style={{width: '460px'}}>
                      <label className="text-[14px] text-gray-700 font-medium whitespace-nowrap text-left" style={{width:160, marginRight:40}}>
                        Standby DNS Server (P):
                      </label>
                      <div style={{width: 300}}>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={dnsServers[1] || ''}
                          onChange={e => handleDnsChange(1, e.target.value)}
                          sx={inputSx}
                        />
                        {dnsErrors[1] && (
                          <div className="text-red-600 text-sm mt-1">{dnsErrors[1]}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ARP Mode */}
                <div className="space-y-2">
                  <h3 className="text-[12px] text-gray-600 font-medium mb-2" style={{ paddingLeft: '20px' }}>
                    ARP Mode
                  </h3>
                  
                  {/* Default Mode */}
                  <div className="flex items-center justify-center" style={{ minHeight: 32 }}>
                    <div className="flex items-center" style={{width: '560px'}}>
                      <label className="text-[14px] text-gray-700 font-medium whitespace-nowrap text-left" style={{width:220, marginRight:60}}>
                        Default Mode:
                      </label>
                      <div style={{width: 320}}>
                        <Select
                          value={arpMode}
                          onChange={handleArpChange}
                          size="small"
                          variant="outlined"
                          fullWidth
                          sx={select32Sx}
                        >
                          <MenuItem value="1">1</MenuItem>
                          <MenuItem value="2">2</MenuItem>
                        </Select>
                        {arpError && (
                          <div className="text-red-600 text-sm mt-1">{arpError}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 w-full">
          <Button
            type="submit"
            variant="contained"
            sx={blueButtonSx}
            onClick={handleSave}
            className="sm:w-auto"
            disabled={loading || resetting || networkRestarting}
          >
            {loading && !resetting ? "Saving..." : "Save"}
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={handleReset}
            sx={grayButtonSx}
            className="sm:w-auto"
            disabled={resetting || networkRestarting}
          >
            {resetting ? "Resetting..." : "Reset"}
          </Button>
        </div>
      </div>
      {networkRestarting && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-xl px-10 py-6 flex flex-col items-center gap-4 max-w-sm text-center">
            <CircularProgress />
            <div className="text-gray-700 text-sm whitespace-pre-line">
              {progressMessage || 'Restarting network service...'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickConfig;
