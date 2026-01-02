import React from 'react';
import {
  REQUEST_TITLE,
  REQUEST_HEADERS,
  REQUEST_ROWS,
  COMMON_RESPONSE_TITLE,
  COMMON_RESPONSE_HEADERS,
  COMMON_RESPONSE_ROWS
} from '../constants/SipMessageCountConstants';

const SipMessageCount = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleClear = () => {
    if (window.confirm('Are you sure to clear?')) {
      // Handle clear logic here
      console.log('Clear confirmed');
    }
  };

  // Button styling
  const blueButtonStyle = {
    background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
    color: '#fff',
    fontWeight: 600,
    fontSize: '14px',
    borderRadius: '6px',
    minWidth: '100px',
    height: '36px',
    textTransform: 'none',
    padding: '6px 16px',
    boxShadow: '0 2px 8px #b3e0ff',
    border: '1px solid #0e8fd6',
    cursor: 'pointer',
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-128px)] py-2 px-2 sm:px-4" style={{ backgroundColor: '#dde0e4' }}>
      <div className="w-full max-w-full">
        {/* Request Table */}
        <div>
          {/* Title Bar */}
          <div className="w-full h-8 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] flex items-center justify-center font-semibold text-lg text-gray-600 shadow mb-0">
            <span>{REQUEST_TITLE}</span>
          </div>
          
          {/* Table Container */}
          <div className="bg-white border-2 border-gray-400 border-t-0 shadow-sm">
            <div className="overflow-x-auto bg-white">
              <table className="w-full border-collapse text-xs bg-white" style={{ tableLayout: 'auto' }}>
                <thead>
                  <tr>
                    {REQUEST_HEADERS.map((header, index) => (
                      <th
                        key={index}
                        className="border border-gray-400 bg-[#f8fafd] font-medium py-1 px-2 text-center whitespace-nowrap"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {REQUEST_ROWS.map((row, rowIndex) => (
                    <tr key={rowIndex} className="bg-white">
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border border-gray-400 py-1 px-2 bg-white text-center whitespace-nowrap"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Common Response Table */}
        <div className="mt-4">
          {/* Title Bar */}
          <div className="w-full h-8 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] flex items-center justify-center font-semibold text-lg text-gray-600 shadow mb-0">
            <span>{COMMON_RESPONSE_TITLE}</span>
          </div>
          
          {/* Table Container */}
          <div className="bg-white border-2 border-gray-400 border-t-0 shadow-sm">
            <div className="overflow-x-auto bg-white">
              <table className="w-full border-collapse text-xs bg-white" style={{ tableLayout: 'auto' }}>
                <thead>
                  <tr>
                    {COMMON_RESPONSE_HEADERS.map((header, index) => (
                      <th
                        key={index}
                        className="border border-gray-400 bg-[#f8fafd] font-medium py-1 px-2 text-center whitespace-nowrap"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMMON_RESPONSE_ROWS.map((row, rowIndex) => (
                    <tr key={rowIndex} className="bg-white">
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border border-gray-400 py-1 px-2 bg-white text-center whitespace-nowrap"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Buttons - Outside the bordered boxes */}
        <div className="flex justify-center gap-4 py-4">
          <button
            onClick={handleRefresh}
            style={blueButtonStyle}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)';
            }}
          >
            Refresh
          </button>
          <button
            onClick={handleClear}
            style={blueButtonStyle}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)';
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default SipMessageCount;
