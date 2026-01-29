// Mapping between UserManage page IDs and API pagePermission keys
export const PAGE_ID_TO_API_KEY = {
  // Operation Info
  '1-1sysinfo': 'system_info',
  '1-4chstatus': 'channel_state',
  '1-3callcount': 'call_count',
  '1-6sipmsgcount': 'sip_message_count',
  
  // Quick Config
  '1-5guideset': 'quick_config',
  
  // VoIP
  '2-1sipset': 'sip',
  '2-3sipcompatibility': 'sip_compatibility',
  '2-4natset': 'nat_setting',
  '2-2mediaset': 'media',
  
  // Advanced
  '3-1-1FXSset': 'fxs',
  '3-8tone': 'tone_detector',
  '3-12callsound': 'tone_generator',
  '3-10dtmf': 'dtmf',
  '3-9ringnum': 'ringing_scheme',
  '3-2faxpara': 'fax',
  '3-3funkey': 'function_key',
  '3-4dialrules': 'dialing_rule',
  '3-5dialtimeout': 'dialing_timeout',
  '3-7tip': 'cue_tone',
  '3-11ringback': 'color_ring',
  '3-8qos': 'qos',
  '3-14actionurl': 'action_url',
  '3-17ModuleArea': 'area_select',
  '3-16vpnset': 'vpn',
  
  // User Manage
  '8-1user': 'user_manage',
  
  // Port
  '4-1fxsset': 'fxs_port',
  '4-1fxsadvance': 'fxs_advanced',
  '4-2groupportset': 'port_group',
  
  // Route
  '5-4RouteParameter': 'routing_parameters',
  '5-1routerulesIP2Tel': 'ip_to_tel',
  '5-2routerulesTel2IP': 'tel_to_ip',
  
  // Num Manipulate
  '7-1manipulateSrcIP2Tel': 'ip_to_tel_callerid',
  '7-2manipulateDstIP2Tel': 'ip_to_tel_calleeid',
  '7-3manipulateSrcTel2IP': 'tel_to_ip_callerid',
  '7-4manipulateDstTel2IP': 'tel_to_ip_calleeid',
  
  // System Tools
  'systemToolsNetwork': 'network',
  'systemToolsManagement': 'management',
  'systemToolsAccessControl': 'access_control',
  'systemToolsCertificateManage': 'certificate_manage',
  'systemToolsConfigOptimize': 'config_optimize',
  'systemToolsCentralizedManage': 'centralized_manage',
  'systemToolsConfigFile': 'config_file',
  'systemToolsHosts': 'hosts',
  'systemToolsSignalingCapture': 'test_tools',
  'systemToolsPingTest': 'ping_test',
  'systemToolsTracertTest': 'tracert_test',
  'systemToolsDnsTest': 'dns_test',
  'systemToolsModificationRecord': 'operation_log',
  'systemToolsBackupUpload': 'backup_upload',
  'systemToolsFactoryReset': 'factory_reset',
  'systemToolsUpgrade': 'upgrade',
  'systemToolsCallLog': 'call_log',
  'systemToolsAccountManage': 'account_manage',
  'systemToolsChangePassword': 'change_password',
  'systemToolsRestart': 'restart',
  'systemToolsSystemMonitor': 'system_monitor',
  'systemToolsTR069Config': 'tr069_config',
  'systemToolsAsteriskCLI': 'asterisk_cli',
  'systemToolsLinuxCLI': 'linux_cli',
};

// Reverse mapping: API key to page ID
export const API_KEY_TO_PAGE_ID = Object.fromEntries(
  Object.entries(PAGE_ID_TO_API_KEY).map(([k, v]) => [v, k])
);
