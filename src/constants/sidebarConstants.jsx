// constants/sidebarConstants.js
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PhoneIcon from '@mui/icons-material/Phone';
import ComputerIcon from '@mui/icons-material/Computer';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import FaxIcon from '@mui/icons-material/Fax';
import RouteIcon from '@mui/icons-material/Route';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import DnsIcon from '@mui/icons-material/Dns';
import BuildIcon from '@mui/icons-material/Build';
import { ROUTE_PATHS } from './routeConstatns';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import SettingsIcon from '@mui/icons-material/Settings';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const SIDEBAR_SECTIONS = [
  {
    id: 'operationInfo',
    title: 'Operation Info',
    icon: DashboardIcon,
    hasSubmenu: true,
    path: ROUTE_PATHS.OPERATION_INFO,
    submenuItems: [
      { 
        id: 'systemInfo', 
        title: 'System Info',
        path: ROUTE_PATHS.SYSTEM_INFO 
      },
      { 
        id: 'pstnStatus', 
        title: 'PSTN Status',
        path: ROUTE_PATHS.PSTN_STATUS 
      },
    
      { 
        id: 'callCount', 
        title: 'Call Count',
        path: ROUTE_PATHS.CALL_COUNT 
      },
      { 
        id: 'SipMessageCount', 
        title: 'SipMessageCount',
        path: ROUTE_PATHS.SIP_MESSAGE_COUNT
      },
    ]
  },
  {
    id: 'Quick Config',
    title: 'Quick Config',
    icon: QuickreplyIcon,
    hasSubmenu: true,
    path: ROUTE_PATHS.QUICK_CONFIG,
    submenuItems: [
      { id: 'quickConfig', title: 'Quick Config', path: ROUTE_PATHS.QUICK_CONFIG }
    ]
  },
  {
    id: 'VoIP',
    title: 'VoIP',
    icon: PhoneIcon,
    hasSubmenu: true,
    path: ROUTE_PATHS.VOIP,
    submenuItems: [
      { id: 'sipMain', title: 'SIP', path: ROUTE_PATHS.VOIP },
      { id: 'SipCompatibility', title: 'SIP Compatibility', path: ROUTE_PATHS.SIP_COMPATIBILITY },
      { id: 'NAT Setting', title: 'NAT Setting', path: ROUTE_PATHS.NAT_SETTINGS },
      // { id: 'sipTrunk', title: 'SIP Trunk', path: '/sip/trunk' }, // Hidden from navigation
      // { id: 'sipRegister', title: 'SIP Register', path: '/sip/register' },
      // { id: 'sipAccount', title: 'SIP Account', path: '/sip/account' },
      // { id: 'sipToSipAccount', title: 'SIP To SIP Account', path: '/sip/sip-to-sip-account' },
      // { id: 'sipTrunkGroup', title: 'SIP Trunk Group', path: '/sip/trunk-group' },
      { id: 'sipMedia', title: 'Media', path: ROUTE_PATHS.SIP_MEDIA },
    ]
  },
  // {
  //   id: 'pcm',
  //   title: 'PCM',
  //   icon: ComputerIcon,
  //   hasSubmenu: true,
  //   path: ROUTE_PATHS.PCM,
  //   submenuItems: [
  //     { id: 'pcmPstn', title: 'PSTN', path: '/pcm/pstn' },
  //     { id: 'pcmCircuitMaintenance', title: 'Circuit Maintenance', path: '/pcm/circuit-maintenance' },
  //     // { id: 'pcmPcm', title: 'PCM', path: '/pcm/pcm' },
  //     // { id: 'pcmTrunk', title: 'PCM Trunk', path: '/pcm/trunk' },
  //     { id: 'pcmTrunkGroup', title: 'PCM Trunk Group', path: '/pcm/trunk-group' },
  //     { id: 'pcmNumReceivingRule', title: 'Num-Receiving Rule', path: '/pcm/num-receiving-rule' },
  //     { id: 'pcmReceptionTimeout', title: 'Reception Timeout', path: '/pcm/reception-timeout' },
  //   ]
  // },
  // {
  //   id: 'isdn',
  //   title: 'ISDN',
  //   icon: NetworkCheckIcon,
  //   hasSubmenu: true,
  //   path: ROUTE_PATHS.ISDN,
  //   submenuItems: [
  //     { id: 'isdnMain', title: 'ISDN', path: '/isdn/isdn' },
  //     { id: 'isdnNumberParameter', title: 'Number Parameter', path: '/isdn/number-parameter' }
  //   ]
  // },
  {
    id: 'advanced',
    title: 'Advanced',
    icon: SettingsIcon,
    hasSubmenu: true,
    path: ROUTE_PATHS.ADVANCED,
    submenuItems: [
      {id: 'FXS', title: 'FXS', path: ROUTE_PATHS.FXS},
      {id: 'ToneDetecter', title: 'Tone Detecter', path: ROUTE_PATHS.TONE_DETECTER},
      {id: 'ToneGenerator', title: 'Tone Generator', path: ROUTE_PATHS.TONE_GENERATOR},
      {id: 'DTMF', title: 'DTMF', path: ROUTE_PATHS.DTMF},
      {id: 'RingingScheme', title: 'Ringing Scheme', path: ROUTE_PATHS.RINGING_SCHEME},
      {id: 'Fax', title: 'FAX', path: ROUTE_PATHS.FAX},
      {id: 'FunctionKey', title: 'Function Key', path: ROUTE_PATHS.FUNCTION_KEY},
      {id: 'DialingRule', title: 'Dialing Rule', path: ROUTE_PATHS.DIALING_RULE},
      {id: 'DialingTimeout', title: 'Dialing Timeout', path: ROUTE_PATHS.DIALING_TIMEOUT},
      {id: 'CueTone', title: 'Cue Tone', path: ROUTE_PATHS.CUE_TONE},
      {id: 'ColorRing', title: 'Color Ring', path: ROUTE_PATHS.COLOR_RING},
      {id: 'Qos', title: 'Qos', path: ROUTE_PATHS.QOS},
      {id: 'ActionUrl', title:'Action Url', path: ROUTE_PATHS.ACTION_URL},
      {id: 'CdrQuery', title:'CDR Query', path: ROUTE_PATHS.CDR_QUERY},
      {id:'VPN', title:'VPN', path: ROUTE_PATHS.VPN_SETTINGS},
      {id: 'AreaSelect', title:'Area Select', path: ROUTE_PATHS.AREA_SELECT},
    ]
  },
// user manage
{
  id: 'userManage',
  title: 'User Manage',
  icon: PeopleIcon,
  hasSubmenu: true,
  path: ROUTE_PATHS.USER_MANAGE,
  submenuItems: [
    {id: 'usermanage', title: 'User Manage', path: ROUTE_PATHS.USER_MANAGE},

  ]
},

//port
{
  id:'port',
  title:'Port',
  icon: ErrorOutlineIcon,
  hasSubmenu: true,
  path: ROUTE_PATHS.PORT,
  submenuItems: [
    {id: 'fxs', title: 'FXS', path: ROUTE_PATHS.PORT_FXS},
    {id: 'fxsadvanced ', title: 'FXS Advanced', path: ROUTE_PATHS.PORT_FXS_ADVANCED},
    {id: 'portgroup', title: 'Port Group', path: ROUTE_PATHS.PORT_GROUP},
  ]
},

//route

  {
    id: 'route',
    title: 'Route',
    icon: RouteIcon,
    hasSubmenu: true,
    path: ROUTE_PATHS.ROUTE,
    submenuItems: [
      { id: 'routingParameters', title: 'Routing Parameters', path: '/route' },
      { id: 'ipToTel', title: 'IP->Tel', path: '/route/ip-to-tel' },
      
      { id: 'telToIp', title: 'Tel->IP', path: '/route/tel-to-ip' }
    ]
  },

  {
    id: 'manipulate',
    title: 'Num Manipulate',
    icon: EditIcon,
    hasSubmenu: true,
    path: ROUTE_PATHS.NUM_MANIPULATE,
    submenuItems: [
      { id: 'ipCallInCallerID', title: 'IP->Tel CallerID', path: ROUTE_PATHS.IP_CALL_IN_CALLERID },
      { id: 'ipCallInCalleeID', title: 'IP->Tel CalleeID', path: ROUTE_PATHS.IP_CALL_IN_CALLEEID },
      //{ id: 'ipCallInOriCalleeID', title: 'IP Call In OriCalleeID', path: ROUTE_PATHS.IP_CALL_IN_ORICALLEEID },
      { id: 'pstnCallInCallerID', title: 'Tel->IP In CallerID', path: ROUTE_PATHS.PSTN_CALL_IN_CALLERID },
      { id: 'pstnCallInCalleeID', title: 'Tel->IP In CalleeID', path: ROUTE_PATHS.PSTN_CALL_IN_CALLEEID },
      //{ id: 'pstnCallInOriCalleeID', title: 'PSTN Call In OriCalleeID', path: ROUTE_PATHS.PSTN_CALL_IN_ORICALLEEID },
      //{ id: 'callerIDPool', title: 'CallerID Pool', path: ROUTE_PATHS.CALLERID_POOL },
      //{ id: 'callerIDReservePool', title: 'CallerID Reserve Pool', path: ROUTE_PATHS.CALLERID_RESERVE_POOL },
    ]
  },
  // {
  //   id: 'vpn',
  //   title: 'VPN',
  //   icon: VpnKeyIcon,
  //   hasSubmenu: true,
  //   path: '/vpn',
  //   submenuItems: [
  //     { id: 'vpnServerSettings', title: 'VPN Server Settings', path: '/vpn/server-settings' },
  //     { id: 'vpnAccount', title: 'VPN Account', path: '/vpn/account' },
  //   ]
  // },
  // {
  //   id: 'dhcp',
  //   title: 'DHCP',
  //   icon: DnsIcon,
  //   hasSubmenu: true,
  //   path: ROUTE_PATHS.DHCP,
  //   submenuItems: [
  //     { id: 'dhcpServerSettings', title: 'DHCP Server Settings', path: '/dhcp/server-settings' },
  //   ]
  // },
  {
    id: 'systemTools',
    title: 'System Tools',
    icon: BuildIcon,
    hasSubmenu: true,
    path: ROUTE_PATHS.SYSTEM_TOOLS,
    submenuItems: [
      { id: 'network', title: 'Network', path: '/system-tools/network' },
      //{ id: 'authorization', title: 'Authorization', path: '/system-tools/authorization' },
      { id: 'management', title: 'Management', path: '/system-tools/management' },
      //{ id: 'ipRoutingTable', title: 'IP Routing Table', path: '/system-tools/ip-routing-table' },
      { id: 'accessControl', title: 'Access Control', path: '/system-tools/access-control' },
      //{ id: 'idsSettings', title: 'IDS Settings', path: '/system-tools/ids-settings' },
      //{ id: 'ddosSettings', title: 'DDOS Settings', path: '/system-tools/ddos-settings' },
      { id: 'certificateManage', title: 'Certificate Manage', path: '/system-tools/certificate-manage' },
      { id: 'configOptimize', title: 'Config Optimize', path: '/system-tools/config-optimize' },
      { id: 'centralizedManage', title: 'Centralized Manage', path: '/system-tools/centralized-manage' },
      //{ id: 'radius', title: 'Radius', path: '/system-tools/radius' },
      //{ id: 'sipAccountGenerator', title: 'SIP Account Generator', path: '/system-tools/sip-account-generator' },
      { id: 'configFile', title: 'Config File', path: '/system-tools/config-file' },
      { id: 'hosts', title: 'Hosts', path: '/system-tools/hosts' },
      { id: 'signalingCapture', title: 'Signaling Capture', path: '/system-tools/signaling-capture' },
      //{ id: 'signalingCallTest', title: 'Signaling Call Test', path: '/system-tools/signaling-call-test' },
      //{ id: 'signalingCallTrack', title: 'Signaling Call Track', path: '/system-tools/signaling-call-track' },
      { id: 'pingTest', title: 'PING Test', path: '/system-tools/ping-test' },
      { id: 'tracertTest', title: 'TRACERT Test', path: '/system-tools/tracert-test' },
      { id: 'dnsTest', title: 'DNS Test', path: '/system-tools/dns-test' },
      
      { id: 'modificationRecord', title: 'Modification Record', path: '/system-tools/modification-record' },
      { id: 'backupUpload', title: 'Backup & Upload', path: '/system-tools/backup-upload' },
      { id: 'factoryReset', title: 'Factory Reset', path: '/system-tools/factory-reset' },
      { id: 'upgrade', title: 'Upgrade', path: '/system-tools/upgrade' },
      { id: 'callLog', title: 'Call Log', path: '/system-tools/call-log' },
      { id: 'accountManage', title: 'Account Manage', path: '/system-tools/account-manage' },
      { id: 'changePassword', title: 'Change Password', path: '/system-tools/change-password' },
      //{ id: 'deviceLock', title: 'Device Lock', path: '/system-tools/device-lock' },
      { id: 'restart', title: 'Restart', path: '/system-tools/restart' },
      { id: 'systemMonitor', title: 'System Monitor', path: '/system-tools/system-monitor' },
      { id: 'tr069Config', title: 'TR069 Config', path: '/system-tools/tr069-config' },
      //{ id: 'licence', title: 'Licence', path: '/system-tools/licence' },
      { id: 'asteriskCLI', title: 'Asterisk CLI', path: '/system-tools/asterisk-cli' },
      { id: 'linuxCLI', title: 'Linux CLI', path: '/system-tools/linux-cli' },
      //{ id: 'sqlUpload', title: 'SQL Upload', path: '/system-tools/sql-upload' },
    ]
  }
];