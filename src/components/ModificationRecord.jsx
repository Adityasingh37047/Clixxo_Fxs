import React, { useState } from 'react';
import {
  MR_TITLE,
  MR_BUTTONS,
  MR_NOTE,
  MR_PLACEHOLDER,
} from '../constants/ModificationRecordConstants';
import Button from '@mui/material/Button';
import { postLinuxCmd } from '../api/apiService';

const blueBar = (title) => (
  <div className="rounded-t-lg h-8 flex items-center justify-center font-semibold text-[18px] text-[#444] shadow-sm mt-0"
    style={{background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 50%, #3b8fd6 100%)', boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)'}}>
    {title}
  </div>
);

const buttonSx = {
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
  color: '#fff',
  fontWeight: 600,
  fontSize: '16px',
  minWidth: 100,
  minHeight: 42,
  px: 2,
  py: 0.5,
  boxShadow: '0 2px 8px #b3e0ff',
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
    color: '#fff',
  },
};

const ModificationRecord = () => {
  const [record, setRecord] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle check button click
  const handleCheck = async () => {
    try {
      setLoading(true);
      
      // Try multiple common log file locations for modification records
      const logPaths = [
        '/var/log/modification.log',
        '/var/log/modification_record.log', 
        '/var/log/system.log',
        '/var/log/messages',
        '/var/log/syslog',
        '/opt/logs/modification.log',
        '/home/admin/logs/modification.log'
      ];
      
      // Check which log files exist and get the most recent one
      const checkCmd = `for log in ${logPaths.join(' ')}; do [ -f "$log" ] && echo "$log"; done | head -1`;
      const logFileResponse = await postLinuxCmd({ cmd: checkCmd });
      const logFile = String(logFileResponse?.responseData || '').trim();
      
      if (!logFile) {
        setRecord('No modification log files found on the system.');
        return;
      }
      
      // Get the last 100 lines from the log file (as mentioned in the note)
      const fetchCmd = `tail -n 100 "${logFile}" 2>/dev/null || echo "Error reading log file"`;
      const response = await postLinuxCmd({ cmd: fetchCmd });
      const logData = String(response?.responseData || '').trim();
      
      if (logData.includes('Error reading log file')) {
        setRecord('Error: Could not read the modification log file.');
      } else if (logData) {
        setRecord(logData);
      } else {
        setRecord('No modification records found in the log file.');
      }
      
    } catch (error) {
      console.error('Error fetching modification records:', error);
      setRecord('Error: Failed to fetch modification records. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle download button click
  const handleDownload = async () => {
    try {
      setLoading(true);
      
      // Get all modification records (not just last 100)
      const logPaths = [
        '/var/log/modification.log',
        '/var/log/modification_record.log', 
        '/var/log/system.log',
        '/var/log/messages',
        '/var/log/syslog',
        '/opt/logs/modification.log',
        '/home/admin/logs/modification.log'
      ];
      
      const checkCmd = `for log in ${logPaths.join(' ')}; do [ -f "$log" ] && echo "$log"; done | head -1`;
      const logFileResponse = await postLinuxCmd({ cmd: checkCmd });
      const logFile = String(logFileResponse?.responseData || '').trim();
      
      if (!logFile) {
        window.alert('No modification log files found on the system.');
        return;
      }
      
      // Get all records from the log file
      const fetchCmd = `cat "${logFile}" 2>/dev/null || echo "Error reading log file"`;
      const response = await postLinuxCmd({ cmd: fetchCmd });
      const logData = String(response?.responseData || '').trim();
      
      if (logData.includes('Error reading log file')) {
        window.alert('Error: Could not read the modification log file.');
        return;
      }
      
      if (!logData) {
        window.alert('No modification records found in the log file.');
        return;
      }
      
      // Create and download the file
      const blob = new Blob([logData], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `modification_records_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error downloading modification records:', error);
      window.alert('Error: Failed to download modification records. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-200px)] flex flex-col items-center box-border" style={{backgroundColor: "#dde0e4"}}>
      <div className="w-full max-w-5xl mx-auto py-6 px-4">
        {blueBar(MR_TITLE)}
        <div className="w-full border-2 border-gray-400 border-t-0 shadow-sm flex flex-col bg-white">
          <div className="p-6">
            <div
              className="w-full min-h-[400px] max-h-[60vh] bg-white text-sm p-4 font-mono overflow-auto border-0 outline-none"
              style={{ 
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                resize: 'none'
              }}
            >
              {record || MR_PLACEHOLDER}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row justify-center gap-6 my-6">
          <Button 
            variant="contained" 
            sx={buttonSx}
            onClick={handleCheck}
            disabled={loading}
          >
            {loading ? 'Loading...' : MR_BUTTONS.check}
          </Button>
          <Button 
            variant="contained" 
            sx={buttonSx}
            onClick={handleDownload}
            disabled={loading}
          >
            {loading ? 'Loading...' : MR_BUTTONS.download}
          </Button>
        </div>
        <div className="w-full flex flex-row justify-center mt-2 mb-4">
          <span className="text-red-600 text-sm font-medium text-center">{MR_NOTE}</span>
        </div>
      </div>
    </div>
  );
};

export default ModificationRecord; 