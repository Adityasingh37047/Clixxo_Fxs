import React, { useState } from 'react';
import {
  QUICK_CONFIG_TITLE,
  NET_MODE_OPTIONS,
  LAN1_NETWORK_TYPES,
  LAN2_NETWORK_TYPES,
  LABELS_LAN1,
  LABELS_LAN2,
} from '../constants/QuickConfigConstants';

function QuickConfig() {
  const [networkTypeLan1, setNetworkTypeLan1] = useState('Static');
  const [autoDnsLan1, setAutoDnsLan1] = useState(false);
  const [ipv6EnabledLan1, setIpv6EnabledLan1] = useState(false);
  const [lan2Enabled, setLan2Enabled] = useState(false);
  const [networkTypeLan2, setNetworkTypeLan2] = useState('Static');
  const [autoDnsLan2, setAutoDnsLan2] = useState(false);
  const [ipv6EnabledLan2, setIpv6EnabledLan2] = useState(true);

  return (
    <div
      className="bg-gray-50 min-h-[calc(100vh-128px)] py-2 px-2 sm:px-4 flex justify-center"
      style={{ backgroundColor: '#dde0e4' }}
    >
      <div className="w-full max-w-5xl">
        {/* Page Title Bar */}
        <div className="w-full h-8 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] flex items-center justify-center font-semibold text-lg text-gray-700 shadow mb-0">
          <span>{QUICK_CONFIG_TITLE}</span>
        </div>

        {/* Main Card */}
        <div className="bg-[#dde0e4] border border-gray-600 border-t-0 shadow-sm px-6 py-4 text-sm">
          <form className="w-full">
            <table className="w-full text-sm" style={{ tableLayout: 'auto' }}>
              <colgroup>
                <col style={{ width: '15%' }} />
                <col style={{ width: '35%' }} />
                <col style={{ width: '50%' }} />
              </colgroup>
              <tbody>
                {/* Spacer row */}
                <tr className="h-2" />

                {/* Net Mode */}
                <tr>
                  <td colSpan={2} className="align-middle font-medium text-gray-800 pl-2">Net Mode:</td>
                  <td className="align-middle pl-4">
                    <select
                      className="border border-gray-400 rounded-sm h-6 px-1 text-sm bg-white"
                      style={{ width: '160px' }}
                      defaultValue={NET_MODE_OPTIONS[0]}
                    >
                      {NET_MODE_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>

                {/* Spacer */}
                <tr className="h-4" />

                {/* LAN 1 title */}
                <tr>
                  <td colSpan={3} className="font-semibold text-gray-800 pl-2 pb-1">
                    {LABELS_LAN1.sectionTitle}
                  </td>
                </tr>

                {/* LAN1 Network Type */}
                <tr className="h-8">
                  <td />
                  <td className="text-gray-800 align-middle">{LABELS_LAN1.networkType}</td>
                  <td className="pl-4">
                    <select 
                      className="border border-gray-400 rounded-sm h-6 px-1 text-sm bg-white" 
                      style={{ width: '160px' }} 
                      value={networkTypeLan1}
                      onChange={(e) => setNetworkTypeLan1(e.target.value)}
                    >
                      {LAN1_NETWORK_TYPES.map(opt => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>

                {/* Username / Password - Only show for PPPoE */}
                {networkTypeLan1 === 'PPPoE' && (
                  <>
                    <tr className="h-3" />
                    <tr>
                      <td />
                      <td className="text-gray-800 align-middle">{LABELS_LAN1.username}</td>
                      <td className="pl-4">
                        <input
                          type="text"
                          className="border border-gray-400 rounded-sm h-6 px-2 bg-white"
                          style={{ width: '250px' }}
                          defaultValue=""
                        />
                      </td>
                    </tr>
                    <tr className="h-3" />
                    <tr>
                      <td />
                      <td className="text-gray-800 align-middle">{LABELS_LAN1.password}</td>
                      <td className="pl-4">
                        <input
                          type="password"
                          className="border border-gray-400 rounded-sm h-6 px-2 bg-white"
                          style={{ width: '250px' }}
                          defaultValue=""
                        />
                      </td>
                    </tr>
                  </>
                )}

                {/* LAN1 IPv4 settings */}
                <tr className="h-3" />
                <tr>
                  <td />
                  <td className="text-gray-800 align-middle">{LABELS_LAN1.ipAddress}</td>
                  <td className="pl-4">
                    <input
                      type="text"
                      className={`border border-gray-400 rounded-sm h-6 px-2 ${
                        networkTypeLan1 === 'DHCP' || networkTypeLan1 === 'PPPoE' ? 'bg-gray-200' : 'bg-white'
                      }`}
                      style={{ width: '250px' }}
                      defaultValue="192.168.1.101"
                      disabled={networkTypeLan1 === 'DHCP' || networkTypeLan1 === 'PPPoE'}
                    />
                  </td>
                </tr>
                <tr className="h-3" />
                <tr>
                  <td />
                  <td className="text-gray-800 align-middle">{LABELS_LAN1.subnetMask}</td>
                  <td className="pl-4">
                    <input
                      type="text"
                      className={`border border-gray-400 rounded-sm h-6 px-2 ${
                        networkTypeLan1 === 'DHCP' || networkTypeLan1 === 'PPPoE' ? 'bg-gray-200' : 'bg-white'
                      }`}
                      style={{ width: '250px' }}
                      defaultValue="255.255.255.0"
                      disabled={networkTypeLan1 === 'DHCP' || networkTypeLan1 === 'PPPoE'}
                    />
                  </td>
                </tr>

                {/* Default Gateway - Hide for PPPoE */}
                {networkTypeLan1 !== 'PPPoE' && (
                  <>
                    <tr className="h-3" />
                    <tr>
                      <td />
                      <td className="text-gray-800 align-middle">{LABELS_LAN1.defaultGateway}</td>
                      <td className="pl-4">
                        <input
                          type="text"
                          className={`border border-gray-400 rounded-sm h-6 px-2 ${
                            networkTypeLan1 === 'DHCP' ? 'bg-gray-200' : 'bg-white'
                          }`}
                          style={{ width: '250px' }}
                          defaultValue="192.168.1.1"
                          disabled={networkTypeLan1 === 'DHCP'}
                        />
                      </td>
                    </tr>
                  </>
                )}
                {/* Auto Obtain DNS - Only show for DHCP */}
                {networkTypeLan1 === 'DHCP' && (
                  <>
                    <tr className="h-3" />
                    <tr>
                      <td />
                      <td className="text-gray-800 align-middle">Auto Obtain DNS Server Addr(B):</td>
                      <td className="pl-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="h-4 w-4" 
                            checked={autoDnsLan1}
                            onChange={(e) => setAutoDnsLan1(e.target.checked)}
                          />
                          <span>Enable</span>
                        </label>
                      </td>
                    </tr>
                  </>
                )}

                <tr className="h-3" />
                <tr>
                  <td />
                  <td className="text-gray-800 align-middle">{LABELS_LAN1.dnsServer}</td>
                  <td className="pl-4">
                    <input
                      type="text"
                      className={`border border-gray-400 rounded-sm h-6 px-2 ${
                        (networkTypeLan1 === 'DHCP' && autoDnsLan1) || networkTypeLan1 === 'PPPoE' ? 'bg-gray-200' : 'bg-white'
                      }`}
                      style={{ width: '250px' }}
                      defaultValue="0.0.0.0"
                      disabled={(networkTypeLan1 === 'DHCP' && autoDnsLan1) || networkTypeLan1 === 'PPPoE'}
                    />
                  </td>
                </tr>

                {/* Spare DNS Server - Hide for PPPoE */}
                {networkTypeLan1 !== 'PPPoE' && (
                  <>
                    <tr className="h-3" />
                    <tr>
                      <td />
                      <td className="text-gray-800 align-middle">{LABELS_LAN1.spareDnsServer}</td>
                      <td className="pl-4">
                        <input
                          type="text"
                          className={`border border-gray-400 rounded-sm h-6 px-2 ${
                            networkTypeLan1 === 'DHCP' && autoDnsLan1 ? 'bg-gray-200' : 'bg-white'
                          }`}
                          style={{ width: '250px' }}
                          defaultValue=""
                          disabled={networkTypeLan1 === 'DHCP' && autoDnsLan1}
                        />
                      </td>
                    </tr>
                  </>
                )}

                {/* LAN1 IPv6 toggle and fields */}
                <tr className="h-3" />
                <tr>
                  <td />
                  <td className="text-gray-800 align-middle">{LABELS_LAN1.ipv6AddressCheckbox}</td>
                  <td className="pl-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4" 
                        checked={ipv6EnabledLan1}
                        onChange={(e) => setIpv6EnabledLan1(e.target.checked)}
                      />
                      <span>Enable</span>
                    </label>
                  </td>
                </tr>

                {ipv6EnabledLan1 && (
                  <>
                    <tr className="h-3" />
                    <tr>
                      <td />
                      <td className="text-gray-800 align-middle">{LABELS_LAN1.ipv6IpAddress}</td>
                      <td className="pl-4">
                        <input
                          type="text"
                          className={`border border-gray-400 rounded-sm h-6 px-2 ${
                            networkTypeLan1 === 'DHCP' || networkTypeLan1 === 'PPPoE' ? 'bg-gray-200' : 'bg-white'
                          }`}
                          style={{ width: '250px' }}
                          defaultValue=""
                          disabled={networkTypeLan1 === 'DHCP' || networkTypeLan1 === 'PPPoE'}
                        />
                      </td>
                    </tr>
                    <tr className="h-3" />
                    <tr>
                      <td />
                      <td className="text-gray-800 align-middle">{LABELS_LAN1.ipv6SubnetPrefix}</td>
                      <td className="pl-4">
                        <input
                          type="text"
                          className={`border border-gray-400 rounded-sm h-6 px-2 ${
                            networkTypeLan1 === 'DHCP' || networkTypeLan1 === 'PPPoE' ? 'bg-gray-200' : 'bg-white'
                          }`}
                          style={{ width: '250px' }}
                          defaultValue=""
                          disabled={networkTypeLan1 === 'DHCP' || networkTypeLan1 === 'PPPoE'}
                        />
                      </td>
                    </tr>

                    {/* Default IPv6 Gateway - Hide for PPPoE */}
                    {networkTypeLan1 !== 'PPPoE' && (
                      <>
                        <tr className="h-3" />
                        <tr>
                          <td />
                          <td className="text-gray-800 align-middle">{LABELS_LAN1.ipv6Gateway}</td>
                          <td className="pl-4">
                            <input
                              type="text"
                              className={`border border-gray-400 rounded-sm h-6 px-2 ${
                                networkTypeLan1 === 'DHCP' ? 'bg-gray-200' : 'bg-white'
                              }`}
                              style={{ width: '250px' }}
                              defaultValue=""
                              disabled={networkTypeLan1 === 'DHCP'}
                            />
                          </td>
                        </tr>
                      </>
                    )}

                    {/* IPv6 DNS Server - Hide for PPPoE */}
                    {networkTypeLan1 !== 'PPPoE' && (
                      <>
                        <tr className="h-3" />
                        <tr>
                          <td />
                          <td className="text-gray-800 align-middle">{LABELS_LAN1.ipv6DnsServer}</td>
                          <td className="pl-4">
                            <input
                              type="text"
                              className={`border border-gray-400 rounded-sm h-6 px-2 ${
                                networkTypeLan1 === 'DHCP' ? 'bg-gray-200' : 'bg-white'
                              }`}
                              style={{ width: '250px' }}
                              defaultValue=""
                              disabled={networkTypeLan1 === 'DHCP'}
                            />
                          </td>
                        </tr>
                      </>
                    )}
                  </>
                )}

                {/* Spacer before LAN 2 */}
                <tr className="h-8" />

                {/* LAN 2 title + enable */}
                <tr>
                  <td colSpan={2} className="font-semibold text-gray-800 pl-2">
                    {LABELS_LAN2.sectionTitle}
                  </td>
                  <td className="text-sm text-gray-800 pl-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4" 
                        checked={lan2Enabled}
                        onChange={(e) => setLan2Enabled(e.target.checked)}
                      />
                      <span>{LABELS_LAN2.enable}</span>
                    </label>
                  </td>
                </tr>

                {lan2Enabled && (
                  <>
                    {/* LAN2 Network Type */}
                    <tr className="h-8">
                      <td />
                      <td className="text-gray-800 align-middle">{LABELS_LAN2.networkType}</td>
                      <td className="pl-4">
                        <select 
                          className="border border-gray-400 rounded-sm h-6 px-1 text-sm bg-white" 
                          style={{ width: '160px' }} 
                          value={networkTypeLan2}
                          onChange={(e) => setNetworkTypeLan2(e.target.value)}
                        >
                          {LAN2_NETWORK_TYPES.map(opt => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>

                    {/* LAN2 Username / Password - Only show for PPPoE */}
                    {networkTypeLan2 === 'PPPoE' && (
                      <>
                        <tr className="h-3" />
                        <tr>
                          <td />
                          <td className="text-gray-800 align-middle">{LABELS_LAN2.username}</td>
                          <td className="pl-4">
                            <input
                              type="text"
                              className="border border-gray-400 rounded-sm h-6 px-2 bg-white"
                              style={{ width: '250px' }}
                              defaultValue=""
                            />
                          </td>
                        </tr>
                        <tr className="h-3" />
                        <tr>
                          <td />
                          <td className="text-gray-800 align-middle">{LABELS_LAN2.password}</td>
                          <td className="pl-4">
                            <input
                              type="password"
                              className="border border-gray-400 rounded-sm h-6 px-2 bg-white"
                              style={{ width: '250px' }}
                              defaultValue=""
                            />
                          </td>
                        </tr>
                      </>
                    )}

                    {/* LAN2 IPv4 settings */}
                    <tr className="h-3" />
                    <tr>
                      <td />
                      <td className="text-gray-800 align-middle">{LABELS_LAN2.ipAddress}</td>
                      <td className="pl-4">
                        <input
                          type="text"
                          className={`border border-gray-400 rounded-sm h-6 px-2 ${
                            networkTypeLan2 === 'DHCP' || networkTypeLan2 === 'PPPoE' ? 'bg-gray-200' : 'bg-white'
                          }`}
                          style={{ width: '250px' }}
                          defaultValue="192.168.0.104"
                          disabled={networkTypeLan2 === 'DHCP' || networkTypeLan2 === 'PPPoE'}
                        />
                      </td>
                    </tr>
                    <tr className="h-3" />
                    <tr>
                      <td />
                      <td className="text-gray-800 align-middle">{LABELS_LAN2.subnetMask}</td>
                      <td className="pl-4">
                        <input
                          type="text"
                          className={`border border-gray-400 rounded-sm h-6 px-2 ${
                            networkTypeLan2 === 'DHCP' || networkTypeLan2 === 'PPPoE' ? 'bg-gray-200' : 'bg-white'
                          }`}
                          style={{ width: '250px' }}
                          defaultValue="255.255.255.0"
                          disabled={networkTypeLan2 === 'DHCP' || networkTypeLan2 === 'PPPoE'}
                        />
                      </td>
                    </tr>

                    {/* LAN2 DHCP Server settings - Only show for DHCP server */}
                    {networkTypeLan2 === 'DHCP server' && (
                      <>
                        <tr className="h-3" />
                        <tr>
                          <td />
                          <td className="text-gray-800 align-middle">{LABELS_LAN2.startIp}</td>
                          <td className="pl-4">
                            <input
                              type="text"
                              className="border border-gray-400 rounded-sm h-6 px-2 bg-white"
                              style={{ width: '250px' }}
                              defaultValue="192.168.2.2"
                            />
                          </td>
                        </tr>
                        <tr className="h-3" />
                        <tr>
                          <td />
                          <td className="text-gray-800 align-middle">{LABELS_LAN2.endIp}</td>
                          <td className="pl-4">
                            <input
                              type="text"
                              className="border border-gray-400 rounded-sm h-6 px-2 bg-white"
                              style={{ width: '250px' }}
                              defaultValue="192.168.2.254"
                            />
                          </td>
                        </tr>
                        <tr className="h-3" />
                        <tr>
                          <td />
                          <td className="text-gray-800 align-middle">{LABELS_LAN2.leaseTime}</td>
                          <td className="pl-4">
                            <input
                              type="text"
                              className="border border-gray-400 rounded-sm h-6 px-2 bg-white"
                              style={{ width: '250px' }}
                              defaultValue="1440"
                            />
                          </td>
                        </tr>
                        <tr className="h-3" />
                        <tr>
                          <td />
                          <td className="text-gray-800 align-middle">{LABELS_LAN2.dnsServer}</td>
                          <td className="pl-4">
                            <input
                              type="text"
                              className="border border-gray-400 rounded-sm h-6 px-2 bg-white"
                              style={{ width: '250px' }}
                              defaultValue="0.0.0.0"
                            />
                          </td>
                        </tr>
                      </>
                    )}

                    {/* Default Gateway - Hide for PPPoE and DHCP server */}
                    {networkTypeLan2 !== 'PPPoE' && networkTypeLan2 !== 'DHCP server' && (
                      <>
                        <tr className="h-3" />
                        <tr>
                          <td />
                          <td className="text-gray-800 align-middle">{LABELS_LAN2.defaultGateway}</td>
                          <td className="pl-4">
                            <input
                              type="text"
                              className={`border border-gray-400 rounded-sm h-6 px-2 ${
                                networkTypeLan2 === 'DHCP' ? 'bg-gray-200' : 'bg-white'
                              }`}
                              style={{ width: '250px' }}
                              defaultValue="192.168.0.1"
                              disabled={networkTypeLan2 === 'DHCP'}
                            />
                          </td>
                        </tr>
                      </>
                    )}

                    {/* Auto Obtain DNS - Only show for DHCP (not DHCP server) */}
                    {networkTypeLan2 === 'DHCP' && (
                      <>
                        <tr className="h-3" />
                        <tr>
                          <td />
                          <td className="text-gray-800 align-middle">Auto Obtain DNS Server Addr(B):</td>
                          <td className="pl-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="h-4 w-4" 
                                checked={autoDnsLan2}
                                onChange={(e) => setAutoDnsLan2(e.target.checked)}
                              />
                              <span>Enable</span>
                            </label>
                          </td>
                        </tr>
                      </>
                    )}

                    {/* Regular DNS Server - Hide for DHCP server and PPPoE */}
                    {networkTypeLan2 !== 'DHCP server' && networkTypeLan2 !== 'PPPoE' && (
                      <>
                        <tr className="h-3" />
                        <tr>
                          <td />
                          <td className="text-gray-800 align-middle">{LABELS_LAN2.dnsServer}</td>
                          <td className="pl-4">
                            <input
                              type="text"
                              className={`border border-gray-400 rounded-sm h-6 px-2 ${
                                networkTypeLan2 === 'DHCP' && autoDnsLan2 ? 'bg-gray-200' : 'bg-white'
                              }`}
                              style={{ width: '250px' }}
                              defaultValue="0.0.0.0"
                              disabled={networkTypeLan2 === 'DHCP' && autoDnsLan2}
                            />
                          </td>
                        </tr>
                      </>
                    )}

                    {/* Spare DNS Server - Hide for PPPoE and DHCP server */}
                    {networkTypeLan2 !== 'PPPoE' && networkTypeLan2 !== 'DHCP server' && (
                      <>
                        <tr className="h-3" />
                        <tr>
                          <td />
                          <td className="text-gray-800 align-middle">{LABELS_LAN2.spareDnsServer}</td>
                          <td className="pl-4">
                            <input
                              type="text"
                              className={`border border-gray-400 rounded-sm h-6 px-2 ${
                                networkTypeLan2 === 'DHCP' && autoDnsLan2 ? 'bg-gray-200' : 'bg-white'
                              }`}
                              style={{ width: '250px' }}
                              defaultValue=""
                              disabled={networkTypeLan2 === 'DHCP' && autoDnsLan2}
                            />
                          </td>
                        </tr>
                      </>
                    )}

                    {/* LAN2 IPv6 settings */}
                    <tr className="h-3" />
                    <tr>
                      <td />
                      <td className="text-gray-800 align-middle">{LABELS_LAN2.ipv6AddressCheckbox}</td>
                      <td className="pl-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={ipv6EnabledLan2}
                            onChange={(e) => setIpv6EnabledLan2(e.target.checked)}
                            className="h-4 w-4" 
                          />
                          <span className="capitalize">enable</span>
                        </label>
                      </td>
                    </tr>

                    {ipv6EnabledLan2 && (
                      <>
                        {/* IPv6 IP Address and Subnet - Hide for DHCP server */}
                        {networkTypeLan2 !== 'DHCP server' && (
                          <>
                            <tr className="h-3" />
                            <tr>
                              <td />
                              <td className="text-gray-800 align-middle">{LABELS_LAN2.ipv6IpAddress}</td>
                              <td className="pl-4">
                                <input
                                  type="text"
                                  className={`border border-gray-400 rounded-sm h-6 px-2 ${
                                    networkTypeLan2 === 'DHCP' || networkTypeLan2 === 'PPPoE' ? 'bg-gray-200' : 'bg-white'
                                  }`}
                                  style={{ width: '250px' }}
                                  defaultValue="111:2222:3333:4444::104"
                                  disabled={networkTypeLan2 === 'DHCP' || networkTypeLan2 === 'PPPoE'}
                                />
                              </td>
                            </tr>
                            <tr className="h-3" />
                            <tr>
                              <td />
                              <td className="text-gray-800 align-middle">{LABELS_LAN2.ipv6SubnetPrefix}</td>
                              <td className="pl-4">
                                <input
                                  type="text"
                                  className={`border border-gray-400 rounded-sm h-6 px-2 ${
                                    networkTypeLan2 === 'DHCP' || networkTypeLan2 === 'PPPoE' ? 'bg-gray-200' : 'bg-white'
                                  }`}
                                  style={{ width: '250px' }}
                                  defaultValue="64"
                                  disabled={networkTypeLan2 === 'DHCP' || networkTypeLan2 === 'PPPoE'}
                                />
                              </td>
                            </tr>
                          </>
                        )}

                        {/* Default IPv6 Gateway - Hide for PPPoE, Show for DHCP server */}
                        {networkTypeLan2 !== 'PPPoE' && (
                          <>
                            <tr className="h-3" />
                            <tr>
                              <td />
                              <td className="text-gray-800 align-middle">{LABELS_LAN2.ipv6Gateway}</td>
                              <td className="pl-4">
                                <input
                                  type="text"
                                  className={`border border-gray-400 rounded-sm h-6 px-2 ${
                                    networkTypeLan2 === 'DHCP' ? 'bg-gray-200' : 'bg-white'
                                  }`}
                                  style={{ width: '250px' }}
                                  defaultValue="111:2222:3333:4444::100"
                                  disabled={networkTypeLan2 === 'DHCP'}
                                />
                              </td>
                            </tr>
                          </>
                        )}

                        {/* IPv6 DNS Server - Hide for PPPoE, Show for DHCP server */}
                        {networkTypeLan2 !== 'PPPoE' && (
                          <>
                            <tr className="h-3" />
                            <tr>
                              <td />
                              <td className="text-gray-800 align-middle">{LABELS_LAN2.ipv6DnsServer}</td>
                              <td className="pl-4">
                                <input
                                  type="text"
                                  className={`border border-gray-400 rounded-sm h-6 px-2 ${
                                    networkTypeLan2 === 'DHCP' ? 'bg-gray-200' : 'bg-white'
                                  }`}
                                  style={{ width: '250px' }}
                                  defaultValue=""
                                  disabled={networkTypeLan2 === 'DHCP'}
                                />
                              </td>
                            </tr>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}

                {/* Spacer before bottom */}
                <tr className="h-8" />
              </tbody>
            </table>
          </form>
        </div>

        {/* Next button - Outside the bordered box */}
        <div className="flex justify-center py-4">
          <button
            type="button"
            style={{
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
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)';
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuickConfig;

