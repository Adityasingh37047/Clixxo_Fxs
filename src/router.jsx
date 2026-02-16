// router.jsx
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import { ROUTE_PATHS } from './constants/routeConstatns';
import SystemInfo from './components/SystemInfo';
import PstnStatus from './components/PstnStatus';
import CallCount from './components/CallCount';
import SipPage from './components/SipPage';
import PcmPage from './components/PcmPage';

import FaxPage from './components/FaxPage';
import FaxFaxPage from './components/FaxFaxPage';
import RoutePage from './components/RoutePage';

import NumManipulatePage from './components/NumManipulatePage';
import VpnPage from './components/VpnPage';
import DhcpPage from './components/DhcpPage';
import SystemToolsPage from './components/SystemToolsPage';
import LoginPage from './components/LoginPage';
import SipSipPage from './components/SipSipPage';
import SipCompatibilityPage from './components/SipCompatibilityPage';
import SipMediaPage from './components/SipMediaPage';
import NatSettingsPage from './components/NatSettingsPage';
import ProtectedRoute from './components/ProtectedRoute';
import PcmStatusPage from './components/PcmStatusPage';
import PcmSettingsPage from './components/PcmSettingsPage';

import PcmPcmPage from './components/PcmPcmPage';
import PcmTrunkPage from './components/PcmTrunkPage';



import RouteRoutingParameterPage from './components/RouteRoutingParameterPage';
import RouteIpToTelPage from './components/RouteIpToTelPage';
import RouteTelToIpPage from './components/RouteTelToIPpage';



import IPCallInCallerID from './components/IPCallInCallerID';
import IPCallInCalleeID from './components/IPCallInCalleeID';
import IPCallInOriCalleeID from './components/IPCallInOriCalleeID';
import PSTNCallInCallerID from './components/PSTNCallInCallerID';
import PSTNCallInCalleeID from './components/PSTNCallInCalleeID';
import PSTNCallInOriCalleeID from './components/PSTNCallInOriCalleeID';
import CallerIDPool from './components/CallerIDPool';
import CallerIDReservePool from './components/CallerIDReservePool';
import VpnServerSettings from './components/VpnServerSettings';
import VpnAccount from './components/VpnAccount';
import DhcpServerSettings from './components/DhcpServerSettings';
import Network from './components/Network';
import Authorization from './components/Authorization';
import Management from './components/Management';
import IPRoutingTable from './components/IPRoutingTable';
import AccessControl from './components/AccessControl';
import IDSSettings from './components/IDSSettings';
import DDOSSettings from './components/DDOSSettings';
import SystemToolsVPN from './components/SystemToolsVPN';
import CertificateManage from './components/CertificateManage';
import CentralizedManage from './components/CentralizedManage';
import Radius from './components/Radius';
import SIPAccountGenerator from './components/SIPAccountGenerator';
import ConfigFile from './components/ConfigFile';
import SignalingCapture from './components/SignalingCapture';
import SignalingCallTest from './components/SignalingCallTest';
import SignalingCallTrack from './components/SignalingCallTrack';
import PINGTest from './components/PINGTest';
import TRACERTTest from './components/TRACERTTest';
import AsteriskCLI from './components/AsteriskCLI';
import LinuxCLI from './components/LinuxCLI';
import ModificationRecord from './components/ModificationRecord';
import BackupUpload from './components/BackupUpload';
import FactoryReset from './components/FactoryReset';
import Upgrade from './components/Upgrade';
import AccountManage from './components/AccountManage';
import ChangePassword from './components/ChangePassword';
import DeviceLock from './components/DeviceLock';
import Restart from './components/Restart';
import Licence from './components/Licence';
import SystemToolsSqlUpload from './components/SystemToolsSqlUpload';
import Hosts from './components/Hosts';
import SipMessageCount from './components/SipMessageCount';
import QuickConfig from './components/QuickConfig';
import FxsPage from './components/FxsPage';
import ToneDetecterPage from './components/ToneDetecterPage';
import ToneGeneratorPage from './components/ToneGeneratorPage';
import DtmfPage from './components/DtmfPage';
import RingingSchemePage from './components/RingingSchemePage';
import FunctionKeyPage from './components/FunctionKeyPage';
import DialingRulePage from './components/DialingRulePage';
import DialingTimeoutPage from './components/DialingTimeoutPage';
import CueTonePage from './components/CueTonePage';
import ColorRingPage from './components/ColorRingPage';
import QosPage from './components/QosPage';
import ActionUrlPage from './components/ActionUrlPage';
import CdrQueryPage from './components/CdrQueryPage';
import VpnSettingsPage from './components/VpnSettingsPage';
import AreaSelectPage from './components/AreaSelectPage';
import UserManage from './components/UserManage';
import PortGroupPage from './components/PortGroupPage';
import PortFxsAdvancedPage from './components/PortFxsAdvancedPage';
import PortFxsPage from './components/PortFxsPage';
import PortFxsBatchModifyPage from './components/PortFxsBatchModifyPage';
import PortFxsModifyPage from './components/PortFxsModifyPage';
import ConfigOptimizePage from './components/ConfigOptimize';
import CallLogPage from './components/CallLog';
import SystemMonitor from './components/SystemMonitor';
import TR069Config from './components/TR069Config';
import DnsTest from './components/DnsTest';
// Error Boundary Component
const ErrorBoundary = ({ error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h1>
        <p className="text-gray-600 mb-4">{error?.message || 'An unexpected error occurred'}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

// 404 Not Found Component
const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-gray-600 mb-4">Page not found</p>
        <a 
          href="/" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <SystemInfo />,
      },
      // Operation Info nested routes
      {
        path: ROUTE_PATHS.SYSTEM_INFO,
        element: <SystemInfo />,
      },
      {
        path: ROUTE_PATHS.PSTN_STATUS,
        element: <PstnStatus />,
      },
     
      {
        path: ROUTE_PATHS.CALL_COUNT,
        element: <CallCount />,
      },
      {
        path: ROUTE_PATHS.SIP_MESSAGE_COUNT,
        element: <SipMessageCount />,
      },
      {
        path: ROUTE_PATHS.QUICK_CONFIG,
        element: <QuickConfig />,
      },

//Advanced Routes
          {
            path: ROUTE_PATHS.FXS,
            element: <FxsPage />,
          },
          
          {
            path: ROUTE_PATHS.TONE_DETECTER,
            element: <ToneDetecterPage />,
          },
          {
            path: ROUTE_PATHS.TONE_GENERATOR,
            element: <ToneGeneratorPage />,
          },
          {
            path: ROUTE_PATHS.DTMF,
            element: <DtmfPage />,
          },
          {
            path: ROUTE_PATHS.RINGING_SCHEME,
            element: <RingingSchemePage />,
          },
          {
            path: ROUTE_PATHS.FAX,
            element: <FaxFaxPage />,
          },
          {
            path: ROUTE_PATHS.FUNCTION_KEY,
            element: <FunctionKeyPage />,
          },
          {
            path: ROUTE_PATHS.DIALING_RULE,
            element: <DialingRulePage />,
          },
          {
            path: ROUTE_PATHS.DIALING_TIMEOUT,
            element: <DialingTimeoutPage />,
          },
          {
            path: ROUTE_PATHS.CUE_TONE,
            element: <CueTonePage />,
          },
          {
            path: ROUTE_PATHS.COLOR_RING,
            element: <ColorRingPage />,
          },
          {
            path: ROUTE_PATHS.QOS,
            element: <QosPage />,
          },
          {
            path: ROUTE_PATHS.ACTION_URL,
            element: <ActionUrlPage />,
          },
          {
            path: ROUTE_PATHS.CDR_QUERY,
            element: <CdrQueryPage />,
          },
          {
            path: ROUTE_PATHS.VPN_SETTINGS,
            element: <SystemToolsVPN />,
          },
          {
            path: ROUTE_PATHS.AREA_SELECT,
            element: <AreaSelectPage />,
          },
      {
        path: ROUTE_PATHS.USER_MANAGE,
        element: <UserManage />,
      },
      // Main feature routes
      {
        path: ROUTE_PATHS.PCM,
        element: <PcmPage />,
      },

      {
        path: ROUTE_PATHS.PORT_GROUP,
        element: <PortGroupPage />,
      },

      {
        path: ROUTE_PATHS.PORT_FXS,
        element: <PortFxsPage />,
      },
      {
        path: ROUTE_PATHS.PORT_FXS_ADVANCED,
        element: <PortFxsAdvancedPage />,
      },
      {
        path: ROUTE_PATHS.PORT_FXS_BATCH_MODIFY,
        element: <PortFxsBatchModifyPage />,
      },
      {
        path: ROUTE_PATHS.PORT_FXS_MODIFY,
        element: <PortFxsModifyPage />,
      },
     
      {
        path: '/route',
        element: <RouteRoutingParameterPage />,
      },
      {
        path: '/route/ip-to-tel',
        element: <RouteIpToTelPage />,
      },
      
      {
        path: '/route/tel-to-ip',
        element: <RouteTelToIpPage />,
      },
     
      {
        path: ROUTE_PATHS.NUM_MANIPULATE,
        element: <NumManipulatePage />,
      },
      {
        path: ROUTE_PATHS.VPN,
        element: <VpnPage />,
      },
      {
        path: '/vpn/server-settings',
        element: <VpnServerSettings />,
      },
      {
        path: '/vpn/account',
        element: <VpnAccount />,
      },
      {
        path: ROUTE_PATHS.DHCP,
        element: <DhcpPage />,
      },
      {
        path: '/dhcp/server-settings',
        element: <DhcpServerSettings />,
      },
      {
        path: ROUTE_PATHS.SYSTEM_TOOLS,
        element: <SystemToolsPage />,
      },
      // SIP submenu routes
      { path: '/voip', element: <SipSipPage /> },
      { path: '/voip/sip-compatibility', element: <SipCompatibilityPage /> },
      { path: '/voip/nat-settings', element: <NatSettingsPage /> },
      { path: '/voip/media', element: <SipMediaPage /> },
      {
        path: '/pcm/status',
        element: <PcmStatusPage />,
      },
      {
        path: '/pcm/settings',
        element: <PcmSettingsPage />,
      },
      
     
      {
        path: '/pcm/pcm',
        element: <PcmPcmPage />,
      },
      {
        path: '/pcm/trunk',
        element: <PcmTrunkPage />,
      },
     
  
    
      {
        path: ROUTE_PATHS.IP_CALL_IN_CALLERID,
        element: <IPCallInCallerID />,
      },
      {
        path: ROUTE_PATHS.IP_CALL_IN_CALLEEID,
        element: <IPCallInCalleeID />,
      },
      {
        path: ROUTE_PATHS.IP_CALL_IN_ORICALLEEID,
        element: <IPCallInOriCalleeID />,
      },
      {
        path: ROUTE_PATHS.PSTN_CALL_IN_CALLERID,
        element: <PSTNCallInCallerID />,
      },
      {
        path: ROUTE_PATHS.PSTN_CALL_IN_CALLEEID,
        element: <PSTNCallInCalleeID />,
      },
      {
        path: ROUTE_PATHS.PSTN_CALL_IN_ORICALLEEID,
        element: <PSTNCallInOriCalleeID />,
      },
      {
        path: ROUTE_PATHS.CALLERID_POOL,
        element: <CallerIDPool />,
      },
      {
        path: ROUTE_PATHS.CALLERID_RESERVE_POOL,
        element: <CallerIDReservePool />,
      },
      {
        path: '/system-tools/network',
        element: <Network />,
      },
      {
        path: '/system-tools/authorization',
        element: <Authorization />,
      },
      {
        path: '/system-tools/management',
        element: <Management />,
      },
      {
        path: '/system-tools/ip-routing-table',
        element: <IPRoutingTable />,
      },
      {
        path: '/system-tools/access-control',
        element: <AccessControl />,
      },
      {
        path: '/system-tools/ids-settings',
        element: <IDSSettings />,
      },
      {
        path: '/system-tools/ddos-settings',
        element: <DDOSSettings />,
      },
      {
        path: '/system-tools/certificate-manage',
        element: <CertificateManage />,
      },
      {
        path: '/system-tools/centralized-manage',
        element: <CentralizedManage />,
      },
      {
        path: '/system-tools/radius',
        element: <Radius />,
      },
      {
        path: '/system-tools/sip-account-generator',
        element: <SIPAccountGenerator />,
      },
      {
        path: '/system-tools/config-file',
        element: <ConfigFile />,
      },
      {
        path: '/system-tools/signaling-capture',
        element: <SignalingCapture />,
      },
      {
        path: '/system-tools/signaling-call-test',
        element: <SignalingCallTest />,
      },
      {
        path: '/system-tools/signaling-call-track',
        element: <SignalingCallTrack />,
      },
      {
        path: '/system-tools/ping-test',
        element: <PINGTest />,
      },
      {
        path: '/system-tools/tracert-test',
        element: <TRACERTTest />,
      },
      {
        path: '/system-tools/dns-test',
        element: <DnsTest />,
      },
      {
        path: '/system-tools/modification-record',
        element: <ModificationRecord />,
      },
      {
        path: '/system-tools/backup-upload',
        element: <BackupUpload />,
      },
      {
        path: '/system-tools/factory-reset',
        element: <FactoryReset />,
      },
      {
        path: '/system-tools/upgrade',
        element: <Upgrade />,
      },
      {
        path: '/system-tools/account-manage',
        element: <AccountManage />,
      },
      {
        path: '/system-tools/change-password',
        element: <ChangePassword />,
      },
      {
        path: '/system-tools/device-lock',
        element: <DeviceLock />,
      },
      {
        path: '/system-tools/restart',
        element: <Restart />,
      },
      {
        path: '/system-tools/licence',
        element: <Licence />,
      },
      {
        path: '/system-tools/asterisk-cli',
        element: <AsteriskCLI />,
      },
      {
        path: '/system-tools/linux-cli',
        element: <LinuxCLI />,
      },
      {
        path: '/system-tools/sql-upload',
        element: <SystemToolsSqlUpload />,
      },
      {
        path: '/system-tools/hosts',
        element: <Hosts />,
      },
      {
        path: '/system-tools/config-optimize',
        element: <ConfigOptimizePage />,
      },
      {
        path: '/system-tools/call-log',
        element: <CallLogPage />,
      },
      {
        path: '/system-tools/system-monitor',
        element: <SystemMonitor />,
      },
      {
        path: '/system-tools/tr069-config',
        element: <TR069Config />,
      },
    ],
  },
  // 404 route - should be last
  {
    path: "*",
    element: <NotFound />,
  },
] 
);