import React from 'react';
import CallEndIcon from '@mui/icons-material/CallEnd';
import {
  CHANNEL_STATE_TITLE,
  CHANNEL_STATE_HEADERS,
  CHANNEL_STATE_COLUMN_WIDTHS
} from '../constants/PstnConstants';

// Generate mock data for channels 1-32
const generateChannelData = (startChannel, endChannel) => {
  return Array.from({ length: endChannel - startChannel + 1 }, (_, i) => {
    const channelNum = startChannel + i;
    const number = 7999 + channelNum; // 8000 for channel 1, 8015 for channel 16, etc.
    return {
      channel: channelNum,
      type: 'FXS',
      number: number.toString(),
      voltage: '',
      state: 'idle', // Will show green icon
      forbidOutgoingCall: 'Disable',
      direction: '---',
      callerID: '---',
      calleeID: '---',
      regStatus: 'Failed(No Response)',
      polarityReversalCount: '---'
    };
  });
};

// Green status icon component - square with rounded corners
const StatusIcon = () => (
  <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
    <CallEndIcon style={{ color: 'white', fontSize: '12px' }} />
  </div>
);

// Channel State Table Component
const ChannelStateTable = ({ title, channels }) => {
  return (
    <div className="w-full lg:w-1/2 flex flex-col">
      {/* Table Title - Matching SystemInfo style */}
      <div className="w-full h-8 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] flex items-center justify-center font-semibold text-lg text-gray-600 shadow mb-0">
        <span>{CHANNEL_STATE_TITLE}</span>
        </div>

      {/* Table Container - Properly contained with horizontal scroll */}
      <div className="bg-white border-2 border-gray-400 border-t-0 shadow-sm overflow-x-auto">
        <table className="w-full border-collapse text-[11px]" style={{ tableLayout: 'auto', width: 'auto' }}>
            <thead>
              <tr>
              {CHANNEL_STATE_HEADERS.map((header, index) => (
                <th key={index} className="border border-gray-400 bg-[#f8fafd] font-medium py-1 px-1.5 text-center whitespace-nowrap">
                  {header}
                </th>
                ))}
              </tr>
            </thead>
            <tbody>
            {channels.map((channel) => (
              <tr key={channel.channel} className="hover:bg-gray-50">
                <td className="border border-gray-400 py-1 px-1.5 text-center bg-white whitespace-nowrap">{channel.channel}</td>
                <td className="border border-gray-400 py-1 px-1.5 text-center text-red-600 whitespace-nowrap">{channel.type}</td>
                <td className="border border-gray-400 py-1 px-1.5 text-center whitespace-nowrap">{channel.number}</td>
                <td className="border border-gray-400 py-1 px-1.5 text-center whitespace-nowrap">{channel.voltage || ''}</td>
                <td className="border border-gray-400 py-1 px-1.5">
                  <div className="flex items-center justify-center">
                    <StatusIcon />
                  </div>
                </td>
                <td className="border border-gray-400 py-1 px-1.5 text-center whitespace-nowrap">{channel.forbidOutgoingCall}</td>
                <td className="border border-gray-400 py-1 px-1.5 text-center whitespace-nowrap">{channel.direction}</td>
                <td className="border border-gray-400 py-1 px-1.5 text-center whitespace-nowrap">{channel.callerID}</td>
                <td className="border border-gray-400 py-1 px-1.5 text-center whitespace-nowrap">{channel.calleeID}</td>
                <td className="border border-gray-400 py-1 px-1.5 text-center whitespace-nowrap">{channel.regStatus}</td>
                <td className="border border-gray-400 py-1 px-1.5 text-center whitespace-nowrap">{channel.polarityReversalCount}</td>
              </tr>
            ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
};

const PstnStatus = () => {
  // Generate data for channels 1-16 and 17-32
  const channels1to16 = generateChannelData(1, 16);
  const channels17to32 = generateChannelData(17, 32);

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-128px)] py-2 px-2 sm:px-4">
      <div className="w-full">
        {/* Main Container - Two Tables Side by Side (50% each) */}
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
          {/* First Table: Channels 1-16 */}
          <ChannelStateTable 
            title={CHANNEL_STATE_TITLE} 
            channels={channels1to16} 
          />
          
          {/* Second Table: Channels 17-32 */}
          <ChannelStateTable 
            title={CHANNEL_STATE_TITLE} 
            channels={channels17to32} 
          />
        </div>
      </div>
    </div>
  );
};

export default PstnStatus;
