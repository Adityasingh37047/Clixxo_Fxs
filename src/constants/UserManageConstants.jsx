// UserManage page constants

export const USER_MANAGE_TITLE_USER_INFO = 'User Info';
export const USER_MANAGE_TITLE_PAGE = 'Page';
export const USER_MANAGE_TITLE_CHANNEL_STATUS = 'Check Channel Status';

export const USER_AUTHORITIES_OPTIONS = [
  { value: '0', label: 'Read-only' },
  { value: '1', label: 'Read and Write' },
];

// Page permission sections and items
export const USER_MANAGE_PAGE_SECTIONS = [
  {
    title: 'Operation Info',
    items: [
      { id: '1-1sysinfo', label: 'System Info' },
      { id: '1-4chstatus', label: 'Channel State' },
      { id: '1-3callcount', label: 'Call Count' },
      { id: '1-6sipmsgcount', label: 'SIP Message Count' },
    ],
  },
  {
    title: 'Quick Config',
    items: [{ id: '1-5guideset', label: 'Quick Config' }],
  },
  {
    title: 'VoIP',
    items: [
      { id: '2-1sipset', label: 'SIP' },
      { id: '2-3sipcompatibility', label: 'SIP Compatibility' },
      { id: '2-4natset', label: 'NAT Setting' },
      { id: '2-2mediaset', label: 'Media' },
    ],
  },
  {
    title: 'Advanced',
    items: [
      { id: '3-1-1FXSset', label: 'FXS' },
      { id: '3-8tone', label: 'Tone Detector' },
      { id: '3-12callsound', label: 'Tone Generator' },
      { id: '3-10dtmf', label: 'DTMF' },
      { id: '3-9ringnum', label: 'Ringing Scheme' },
      { id: '3-2faxpara', label: 'Fax' },
      { id: '3-3funkey', label: 'Function Key' },
      { id: '3-4dialrules', label: 'Dialing Rule' },
      { id: '3-5dialtimeout', label: 'Dialing Timeout' },
      { id: '3-7tip', label: 'Cue Tone' },
      { id: '3-11ringback', label: 'Color Ring' },
      { id: '3-8qos', label: 'QoS' },
      { id: '3-14actionurl', label: 'Action URL' },
      { id: '3-17ModuleArea', label: 'Area Select' },
      { id: '3-16vpnset', label: 'VPN' },
    ],
  },
  {
    title: 'User Manage',
    items: [{ id: '8-1user', label: 'User Manage' }],
  },
  {
    title: 'Port',
    items: [
      { id: '4-1fxsset', label: 'FXS' },
      { id: '4-1fxsadvance', label: 'FXS Advanced' },
      { id: '4-2groupportset', label: 'Port Group' },
    ],
  },
  {
    title: 'Route',
    items: [
      { id: '5-4RouteParameter', label: 'Routing Parameters' },
      { id: '5-1routerulesIP2Tel', label: 'IP-->Tel' },
      { id: '5-2routerulesTel2IP', label: 'Tel-->IP' },
    ],
  },
  {
    title: 'Num Manipulate',
    items: [
      { id: '7-1manipulateSrcIP2Tel', label: 'IP->Tel CallerID' },
      { id: '7-2manipulateDstIP2Tel', label: 'IP->Tel CalleeID' },
      { id: '7-3manipulateSrcTel2IP', label: 'Tel->IP CallerID' },
      { id: '7-4manipulateDstTel2IP', label: 'Tel->IP CalleeID' },
    ],
  },
  {
    title: 'System Tools',
    items: [
      // Synced with System Tools submenu in sidebarConstants.jsx / router.jsx
      { id: 'systemToolsNetwork', label: 'Network' },
      { id: 'systemToolsManagement', label: 'Management' },
      { id: 'systemToolsAccessControl', label: 'Access Control' },
      { id: 'systemToolsCertificateManage', label: 'Certificate Manage' },
      { id: 'systemToolsConfigOptimize', label: 'Config Optimize' },
      { id: 'systemToolsCentralizedManage', label: 'Centralized Manage' },
      { id: 'systemToolsConfigFile', label: 'Config File' },
      { id: 'systemToolsHosts', label: 'Hosts' },
      { id: 'systemToolsSignalingCapture', label: 'Signaling Capture' },
      { id: 'systemToolsPingTest', label: 'PING Test' },
      { id: 'systemToolsTracertTest', label: 'TRACERT Test' },
      { id: 'systemToolsDnsTest', label: 'DNS Test' },
      { id: 'systemToolsModificationRecord', label: 'Modification Record' },
      { id: 'systemToolsBackupUpload', label: 'Backup & Upload' },
      { id: 'systemToolsFactoryReset', label: 'Factory Reset' },
      { id: 'systemToolsUpgrade', label: 'Upgrade' },
      { id: 'systemToolsCallLog', label: 'Call Log' },
      { id: 'systemToolsAccountManage', label: 'Account Manage' },
      { id: 'systemToolsChangePassword', label: 'Change Password' },
      { id: 'systemToolsRestart', label: 'Restart' },
      { id: 'systemToolsSystemMonitor', label: 'System Monitor' },
      { id: 'systemToolsTR069Config', label: 'TR069 Config' },
      { id: 'systemToolsAsteriskCLI', label: 'Asterisk CLI' },
      { id: 'systemToolsLinuxCLI', label: 'Linux CLI' },
    ],
  },
];

// Port checkboxes 1..32 (FXS)
export const USER_MANAGE_PORTS = Array.from({ length: 32 }, (_, i) => ({
  id: `idPort${i}`,
  label: `${i + 1}(FXS)`,
}));

