import React, { useState } from 'react';
import { CONFIG_OPTIMIZE_OPTIONS } from '../constants/ConfigOptimizeConstants';

const getInitialState = () => {
  const state = {};
  CONFIG_OPTIMIZE_OPTIONS.forEach(option => {
    state[option.key] = option.defaultValue || '1';
  });
  return state;
};

function ConfigOptimize() {
  const [form, setForm] = useState(getInitialState());

  const handleRadioChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (window.confirm("Please confirm to modify parameters by Config Optmize.")) {
      alert('Settings saved successfully!');
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all settings?")) {
      setForm(getInitialState());
    }
  };

  return (
    <div
      className="bg-gray-50 min-h-[calc(100vh-128px)] py-2"
      style={{ backgroundColor: '#dde0e4' }}
    >
      <div className="flex justify-center">
        <div className="w-full" style={{ maxWidth: '1024px' }}>
          {/* Page Title Bar */}
          <div className="w-full h-8 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] flex items-center justify-center font-semibold text-lg text-gray-700 shadow mb-0">
            <span>Config Optimize</span>
          </div>
        
          {/* Main Card */}
          <div className="bg-[#dde0e4] border-2 border-gray-400 border-t-0 shadow-sm py-6" style={{ fontSize: '11px' }}>
            <div className="flex justify-center pl-8">
              <table style={{ tableLayout: 'fixed', width: '750px', fontSize: '11px' }}>
                <colgroup>
                  <col style={{ width: '55%' }} />
                  <col style={{ width: '45%' }} />
                </colgroup>
                <tbody>
                  {/* Options Header */}
                  <tr>
                    <td colSpan="2" className="text-gray-700 text-left pb-4" style={{ fontSize: '11px' }}>
                      Options
                    </td>
                  </tr>
                  
                  {/* Configuration Options */}
                  {CONFIG_OPTIMIZE_OPTIONS.map((option, idx) => (
                    <React.Fragment key={option.key}>
                      {/* Spacer row before each field */}
                      {idx > 0 && <tr className="h-3" />}
                      
                      <tr>
                        <td className="align-middle text-gray-700 pr-8 text-left pl-4 whitespace-nowrap" style={{ fontSize: '11px' }}>
                          {option.label}
                        </td>
                        <td className="align-middle text-left">
                          <div className="flex items-center gap-3">
                            <label className="flex items-center gap-1.5 cursor-pointer whitespace-nowrap">
                              <input
                                type="radio"
                                name={option.key}
                                value="1"
                                checked={form[option.key] === '1'}
                                onChange={(e) => handleRadioChange(option.key, e.target.value)}
                                className="h-3.5 w-3.5 accent-blue-600"
                                style={{ backgroundColor: '#ffffff' }}
                              />
                              <span className="text-gray-700" style={{ fontSize: '11px' }}>Yes</span>
                            </label>
                            <label className="flex items-center gap-1.5 cursor-pointer whitespace-nowrap">
                              <input
                                type="radio"
                                name={option.key}
                                value="0"
                                checked={form[option.key] === '0'}
                                onChange={(e) => handleRadioChange(option.key, e.target.value)}
                                className="h-3.5 w-3.5 accent-blue-600"
                                style={{ backgroundColor: '#ffffff' }}
                              />
                              <span className="text-gray-700" style={{ fontSize: '11px' }}>No</span>
                            </label>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}

                  {/* Spacer at the end */}
                  <tr className="h-4" />
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Buttons - Outside the bordered box */}
          <div className="flex justify-center gap-6 py-6">
            <button
              type="button"
              onClick={handleSave}
              style={{
                background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '16px',
                borderRadius: '6px',
                minWidth: '100px',
                height: '42px',
                textTransform: 'none',
                padding: '6px 24px',
                boxShadow: '0 2px 8px #b3e0ff',
                border: '1px solid #0e8fd6',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)';
              }}
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleReset}
              style={{
                background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '16px',
                borderRadius: '6px',
                minWidth: '100px',
                height: '42px',
                textTransform: 'none',
                padding: '6px 24px',
                boxShadow: '0 2px 8px #b3e0ff',
                border: '1px solid #0e8fd6',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)';
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfigOptimize;
