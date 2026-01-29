import React, { useState, useRef, useEffect } from 'react';
import {
  CALL_LOG_TABS,
  PORT_OPTIONS,
  DEFAULT_PORT,
  TEXTAREA_HEIGHTS,
  SECTION_LABELS,
  BUTTON_LABELS,
  DEFAULT_STATE,
  CONFIRM_MESSAGES
} from '../constants/CallLogConstants';

const CallLog = () => {
  const [activeTab, setActiveTab] = useState(CALL_LOG_TABS[0].id);
  const [enableCallLog, setEnableCallLog] = useState(DEFAULT_STATE.enableCallLog);
  const [selectedPort, setSelectedPort] = useState(DEFAULT_STATE.selectedPort);
  const [ipCallLog, setIpCallLog] = useState(DEFAULT_STATE.ipCallLog);
  const [portCallLog, setPortCallLog] = useState(DEFAULT_STATE.portCallLog);
  const [sipLog, setSipLog] = useState(DEFAULT_STATE.sipLog);
  
  const ipLogRef = useRef(null);
  const portLogRef = useRef(null);
  const sipLogRef = useRef(null);

  // Auto-scroll to bottom when content changes
  useEffect(() => {
    if (ipLogRef.current) {
      ipLogRef.current.scrollTop = ipLogRef.current.scrollHeight;
    }
  }, [ipCallLog]);

  useEffect(() => {
    if (portLogRef.current) {
      portLogRef.current.scrollTop = portLogRef.current.scrollHeight;
    }
  }, [portCallLog]);

  useEffect(() => {
    if (sipLogRef.current) {
      sipLogRef.current.scrollTop = sipLogRef.current.scrollHeight;
    }
  }, [sipLog]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleEnableCallLog = (e) => {
    setEnableCallLog(e.target.checked);
    // Submit form logic here if needed
  };

  const handleClearIpLog = () => {
    if (window.confirm(CONFIRM_MESSAGES.CLEAR_IP_LOG)) {
      setIpCallLog(DEFAULT_STATE.ipCallLog);
    }
  };

  const handleClearPortLog = () => {
    if (window.confirm(CONFIRM_MESSAGES.CLEAR_PORT_LOG)) {
      setPortCallLog(DEFAULT_STATE.portCallLog);
    }
  };

  const handleClearSipLog = () => {
    if (window.confirm(CONFIRM_MESSAGES.CLEAR_SIP_LOG)) {
      setSipLog(DEFAULT_STATE.sipLog);
    }
  };

  const handleRefreshSipLog = () => {
    // Refresh logic here
    console.log('Refreshing SIP Log...');
  };

  const handlePortChange = (e) => {
    setSelectedPort(e.target.value);
    // Load port log for selected port
  };

  return (
    <div
      className="bg-gray-50"
      style={{ backgroundColor: '#dde0e4', height: 'calc(100vh - 128px)', overflow: 'auto' }}
    >
      <div className="main" style={{ marginRight: '25px', height: '100%' }}>
        <div className="clearfix">
          <div className="relative" style={{ marginTop: '2px' }}>
            <div className="tab">
              <div className="tab_menu">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: 0 }}>
                  {CALL_LOG_TABS.map((tab, index) => (
                    <li
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={activeTab === tab.id ? 'selected' : ''}
                      style={{
                        padding: '6px 16px',
                        cursor: 'pointer',
                        backgroundColor: activeTab === tab.id ? '#60a5fa' : '#e5e7eb',
                        color: activeTab === tab.id ? '#ffffff' : '#374151',
                        borderTopLeftRadius: index === 0 ? '4px' : '0',
                        borderTopRightRadius: '4px',
                        border: '1px solid #ccc',
                        borderBottom: activeTab === tab.id ? 'none' : '1px solid #ccc',
                        marginLeft: index > 0 ? '-1px' : '0',
                        fontSize: '12px',
                        fontWeight: 500,
                      }}
                    >
                      {tab.label}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ marginLeft: '200px', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '-24px' }}>
                <input
                  type="checkbox"
                  id="enableCallLog"
                  name="OpenCallLog"
                  checked={enableCallLog}
                  onChange={handleEnableCallLog}
                  style={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #999',
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer',
                  }}
                />
                <label htmlFor="enableCallLog" className="text-gray-700 cursor-pointer whitespace-nowrap" style={{ fontSize: '11px', marginLeft: '4px' }}>
                  {BUTTON_LABELS.ENABLE_CALL_LOG}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab_box" style={{ height: '95%', backgroundColor: '#dde0e4' }}>
            {/* Call Log Tab */}
            <div id="calllogpage" style={{ display: activeTab === CALL_LOG_TABS[0].id ? 'block' : 'none' }}>
                <table width="100%" align="center" style={{ borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                    <td>
                      <table width="100%" style={{ borderCollapse: 'collapse' }}>
                        <tbody>
                        <tr>
                          <td width="80%">&nbsp;</td>
                          <td width="20%">&nbsp;</td>
                        </tr>
                        <tr>
                          <td height="25px" style={{ fontSize: '11px' }}>
                            {SECTION_LABELS.IP_CHANNEL}
                          </td>
                          <td align="right">
                            <input
                              className="btn4"
                              name="clearIpLog"
                              id="clearIpLog"
                              type="button"
                              onClick={handleClearIpLog}
                              value={BUTTON_LABELS.CLEAR_ALL}
                              style={{
                                padding: '4px 12px',
                                fontSize: '11px',
                                backgroundColor: '#e5e7eb',
                                border: '1px solid #999',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                color: '#374151',
                              }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" align="left">
                            <textarea
                              ref={ipLogRef}
                              wrap="off"
                              name="IPChCallLog"
                              id="IPChCallLog"
                              value={ipCallLog}
                              onChange={(e) => setIpCallLog(e.target.value)}
                              readOnly
                              cols="200"
                              rows="20"
                              style={{
                                padding: '5px',
                                wrap: 'off',
                                overflow: 'auto',
                                width: '100%',
                                height: TEXTAREA_HEIGHTS.IP_CALL_LOG,
                                fontSize: '11px',
                                fontFamily: 'monospace',
                                backgroundColor: '#ffffff',
                                border: '1px solid #999',
                                resize: 'none',
                              }}
                              onInput={(e) => {
                                e.target.scrollTop = e.target.scrollHeight;
                              }}
                            />
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <table width="100%" style={{ borderCollapse: 'collapse' }}>
                        <tbody>
                          <tr>
                            <td width="20%">&nbsp;</td>
                            <td width="10%">&nbsp;</td>
                            <td width="50%">&nbsp;</td>
                            <td width="20%">&nbsp;</td>
                          </tr>
                          <tr>
                            <td height="25px" style={{ fontSize: '11px' }}>
                              {SECTION_LABELS.PORT}
                            </td>
                            <td style={{ fontSize: '11px' }}>
                              {SECTION_LABELS.SELECT_PORT}
                            </td>
                            <td>
                              <select
                                name="port"
                                id="port"
                                value={selectedPort}
                                onChange={handlePortChange}
                                style={{
                                  width: '100px',
                                  fontSize: '11px',
                                  backgroundColor: '#ffffff',
                                  border: '1px solid #999',
                                  padding: '2px',
                                  height: '24px',
                                }}
                              >
                                {PORT_OPTIONS.map((port) => (
                                  <option key={port.value} value={port.value}>
                                    {port.label}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td align="right">
                              <input
                                className="btn4"
                                name="clearPortLog"
                                id="clearPortLog"
                                type="button"
                                onClick={handleClearPortLog}
                                value={BUTTON_LABELS.CLEAR_ALL}
                                style={{
                                  padding: '4px 12px',
                                  fontSize: '11px',
                                  backgroundColor: '#e5e7eb',
                                  border: '1px solid #999',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  color: '#374151',
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="4" align="left">
                              <textarea
                                ref={portLogRef}
                                wrap="off"
                                name="PortCallLog"
                                id="PortCallLog"
                                value={portCallLog}
                                onChange={(e) => setPortCallLog(e.target.value)}
                                readOnly
                                cols="200"
                                rows="20"
                                style={{
                                  padding: '5px',
                                  wrap: 'off',
                                  overflow: 'auto',
                                  width: '100%',
                                  height: TEXTAREA_HEIGHTS.PORT_CALL_LOG,
                                  fontSize: '11px',
                                  fontFamily: 'monospace',
                                  backgroundColor: '#ffffff',
                                  border: '1px solid #999',
                                  resize: 'none',
                                }}
                                onInput={(e) => {
                                  e.target.scrollTop = e.target.scrollHeight;
                                }}
                              />
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>

            {/* SIP Log Tab */}
            <div id="siplogpage" style={{ display: activeTab === CALL_LOG_TABS[1].id ? 'block' : 'none' }}>
                <table width="100%" align="center" style={{ borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      <td>
                        <table width="100%" style={{ borderCollapse: 'collapse' }}>
                          <tbody>
                            <tr>
                              <td width="80%">&nbsp;</td>
                              <td width="20%">&nbsp;</td>
                            </tr>
                            <tr>
                              <td height="25px" style={{ fontSize: '11px' }}>
                                {SECTION_LABELS.SIP_LOG}
                              </td>
                              <td align="right">
                                <input
                                  className="btn4"
                                  name="RefreshSipLog"
                                  id="RefreshSipLog"
                                  type="button"
                                  onClick={handleRefreshSipLog}
                                  value={BUTTON_LABELS.REFRESH}
                                  style={{
                                    padding: '4px 12px',
                                    fontSize: '11px',
                                    backgroundColor: '#e5e7eb',
                                    border: '1px solid #999',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    color: '#374151',
                                    marginRight: '4px',
                                  }}
                                />
                                <input
                                  className="btn4"
                                  name="clearSipLog"
                                  id="clearSipLog"
                                  type="button"
                                  onClick={handleClearSipLog}
                                  value={BUTTON_LABELS.CLEAR_ALL}
                                  style={{
                                    padding: '4px 12px',
                                    fontSize: '11px',
                                    backgroundColor: '#e5e7eb',
                                    border: '1px solid #999',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    color: '#374151',
                                  }}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="2" align="left">
                                <textarea
                                  ref={sipLogRef}
                                  wrap="off"
                                  name="SipLog"
                                  id="SipLog"
                                  value={sipLog}
                                  onChange={(e) => setSipLog(e.target.value)}
                                  readOnly
                                  cols="200"
                                  rows="20"
                                  style={{
                                    padding: '5px',
                                    wrap: 'off',
                                    overflow: 'auto',
                                    width: '100%',
                                    height: TEXTAREA_HEIGHTS.SIP_LOG,
                                    fontSize: '11px',
                                    fontFamily: 'monospace',
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #999',
                                    resize: 'none',
                                  }}
                                  onInput={(e) => {
                                    e.target.scrollTop = e.target.scrollHeight;
                                  }}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CallLog;
