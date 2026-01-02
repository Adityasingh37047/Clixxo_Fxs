import React, { useState } from 'react';
import {
  CALL_COUNT_1_HEADERS,
  CALL_COUNT_1_ROWS,
  CALL_COUNT_2_HEADERS,
  CALL_COUNT_2_COLUMN_WIDTHS,
  CALL_COUNT_2_ROWS,
  CALL_COUNT_2_NOTES
} from '../constants/CallCountConstants';

const CallCount = () => {
  const [activeTab, setActiveTab] = useState(0); // 0 for Call Count 1, 1 for Call Count 2

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleClear = () => {
    if (window.confirm('Are you sure to clear?')) {
      // Handle clear logic here
      console.log('Clear confirmed');
    }
  };

  const handleCheckAll = () => {
    // Handle check all logic here
    console.log('Check All');
  };

  const handleUncheckAll = () => {
    // Handle uncheck all logic here
    console.log('Uncheck All');
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

  const grayButtonStyle = {
    background: 'linear-gradient(to bottom, #e0e0e0 0%, #d0d0d0 100%)',
    color: '#333',
    fontWeight: 500,
    fontSize: '14px',
    borderRadius: '4px',
    minWidth: '100px',
    height: '32px',
    textTransform: 'none',
    padding: '4px 12px',
    border: '1px solid #bbb',
    cursor: 'pointer',
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-128px)] py-2 px-2 sm:px-4" style={{ backgroundColor: '#dde0e4' }}>
      <div className="w-full max-w-full">
        {/* Tabs */}
        <div className="mb-0">
          <div className="flex gap-0">
            <button
              onClick={() => setActiveTab(0)}
              className={`px-2 py-1 font-medium text-sm transition-all ${
                activeTab === 0
                  ? 'bg-blue-400 text-white shadow-md relative z-10'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              style={{
                borderTopLeftRadius: '4px',
                borderTopRightRadius: '4px',
                border: '1px solid #ccc',
                cursor: 'pointer',
                borderBottom: activeTab === 0 ? 'none' : '1px solid #ccc',
              }}
            >
              Call Count 1
            </button>
            <button
              onClick={() => setActiveTab(1)}
              className={`px-2 py-1 font-medium text-sm transition-all ${
                activeTab === 1
                  ? 'bg-blue-400 text-white shadow-md relative z-10'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              style={{
                borderTopLeftRadius: '4px',
                borderTopRightRadius: '4px',
                border: '1px solid #ccc',
                cursor: 'pointer',
                borderBottom: activeTab === 1 ? 'none' : '1px solid #ccc',
                marginLeft: '-1px',
              }}
            >
              Call Count 2
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {/* Call Count 1 Tab */}
        {activeTab === 0 && (
          <>
            {/* Title Bar */}
            <div className="w-full h-8 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] flex items-center justify-center font-semibold text-lg text-gray-600 shadow mb-0">
              <span>Call Count</span>
            </div>
            <div className="bg-white border-2 border-gray-400 border-t-0 shadow-sm">

              {/* Table */}
              <div className="overflow-x-auto bg-white">
                <table className="w-full border-collapse text-xs bg-white" style={{ tableLayout: 'auto' }}>
        <thead>
          <tr>
                      {CALL_COUNT_1_HEADERS.map((header, index) => (
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
                    {CALL_COUNT_1_ROWS.map((row, rowIndex) => (
                      <tr key={rowIndex} className="bg-white">
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="border border-gray-400 py-1 px-2 text-center whitespace-nowrap bg-white"
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

            {/* Buttons - Outside the bordered box */}
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
          </>
        )}

        {/* Call Count 2 Tab */}
        {activeTab === 1 && (
          <>
            {/* Title Bar */}
            <div className="w-full h-8 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] flex items-center justify-center font-semibold text-lg text-gray-600 shadow mb-0">
              <span>Call Statistics</span>
        </div>
            <div className="bg-white border-2 border-gray-400 border-t-0 shadow-sm">

              {/* Table */}
              <div className="overflow-x-auto bg-white">
                <table className="w-full border-collapse text-xs bg-white min-w-[1000px]" style={{ tableLayout: 'auto' }}>
                  <thead>
                    <tr>
                      {CALL_COUNT_2_HEADERS.map((header, index) => (
                        <th
                          key={index}
                          className={`border border-gray-400 bg-[#f8fafd] font-medium py-1 px-2 whitespace-nowrap ${
                            index === 0 ? 'text-center' : index === 1 ? 'text-left' : 'text-center'
                          }`}
                          style={index === 0 ? { width: '3%' } : index === 1 ? { width: '5%' } : {}}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {CALL_COUNT_2_ROWS.map((row, rowIndex) => (
                      <tr key={rowIndex} className="bg-white">
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className={`border border-gray-400 py-1 px-2 bg-white ${
                              cellIndex === 0 ? 'text-center' : cellIndex === 1 ? 'text-left' : 'text-center'
                            } whitespace-nowrap`}
                          >
                            {cellIndex === 0 ? <span>&nbsp;</span> : cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
        </div>

            {/* Buttons - Outside the bordered box */}
            <div className="flex flex-wrap items-center gap-2 py-4 px-4">
              <button
                onClick={handleCheckAll}
                style={grayButtonStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(to bottom, #d0d0d0 0%, #e0e0e0 100%)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(to bottom, #e0e0e0 0%, #d0d0d0 100%)';
                }}
              >
                Check All
              </button>
              <span className="text-gray-500" style={{ fontSize: '14px' }}>|</span>
              <button
                onClick={handleUncheckAll}
                style={grayButtonStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(to bottom, #d0d0d0 0%, #e0e0e0 100%)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(to bottom, #e0e0e0 0%, #d0d0d0 100%)';
                }}
              >
                Uncheck All
              </button>
              <span className="text-gray-500" style={{ fontSize: '14px' }}>|</span>
              <button
                onClick={handleClear}
                style={grayButtonStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(to bottom, #d0d0d0 0%, #e0e0e0 100%)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(to bottom, #e0e0e0 0%, #d0d0d0 100%)';
                }}
              >
                Clear
              </button>
              <span className="text-gray-500" style={{ fontSize: '14px' }}>|</span>
              <button
                onClick={handleRefresh}
                style={grayButtonStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(to bottom, #d0d0d0 0%, #e0e0e0 100%)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(to bottom, #e0e0e0 0%, #d0d0d0 100%)';
                }}
              >
                Refresh
              </button>
        </div>

            {/* Notes - Outside the bordered box */}
            <div className="px-4 pb-4">
              {CALL_COUNT_2_NOTES.map((note, index) => (
                <p key={index} className="text-red-600 text-sm mb-1" style={{ color: '#dc2626' }}>
                  {note}
                </p>
              ))}
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CallCount;
