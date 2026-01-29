// Mapping between Sidebar item IDs and API pagePermission keys
export const SIDEBAR_ID_TO_API_KEY = {
  // Operation Info
  'systemInfo': 'system_info',
  'pstnStatus': 'channel_state', // Assuming PSTN Status maps to channel_state
  'callCount': 'call_count',
  'SipMessageCount': 'sip_message_count',
  
  // Quick Config
  'quickConfig': 'quick_config',
  
  // VoIP
  'sipMain': 'sip',
  'SipCompatibility': 'sip_compatibility',
  'NAT Setting': 'nat_setting',
  'sipMedia': 'media',
  
  // Advanced
  'FXS': 'fxs',
  'ToneDetecter': 'tone_detector',
  'ToneGenerator': 'tone_generator',
  'DTMF': 'dtmf',
  'RingingScheme': 'ringing_scheme',
  'Fax': 'fax',
  'FunctionKey': 'function_key',
  'DialingRule': 'dialing_rule',
  'DialingTimeout': 'dialing_timeout',
  'CueTone': 'cue_tone',
  'ColorRing': 'color_ring',
  'Qos': 'qos',
  'ActionUrl': 'action_url',
  'VPN': 'vpn',
  'AreaSelect': 'area_select',
  
  // User Manage
  'usermanage': 'user_manage',
  
  // Port
  'fxs': 'fxs_port',
  'fxsadvanced ': 'fxs_advanced',
  'portgroup': 'port_group',
  
  // Route
  'routingParameters': 'routing_parameters',
  'ipToTel': 'ip_to_tel',
  'telToIp': 'tel_to_ip',
  
  // Num Manipulate
  'ipCallInCallerID': 'ip_to_tel_callerid',
  'ipCallInCalleeID': 'ip_to_tel_calleeid',
  'pstnCallInCallerID': 'tel_to_ip_callerid',
  'pstnCallInCalleeID': 'tel_to_ip_calleeid',
  
  // System Tools
  'network': 'network',
  'management': 'management',
  'accessControl': 'access_control',
  'certificateManage': 'certificate_manage',
  'configOptimize': 'config_optimize',
  'centralizedManage': 'centralized_manage',
  'configFile': 'config_file',
  'hosts': 'hosts',
  'signalingCapture': 'test_tools',
  'pingTest': 'ping_test',
  'tracertTest': 'tracert_test',
  'dnsTest': 'dns_test',
  'modificationRecord': 'operation_log',
  'backupUpload': 'backup_upload',
  'factoryReset': 'factory_reset',
  'upgrade': 'upgrade',
  'callLog': 'call_log',
  'accountManage': 'account_manage',
  'changePassword': 'change_password',
  'restart': 'restart',
  'systemMonitor': 'system_monitor',
  'tr069Config': 'tr069_config',
  'asteriskCLI': 'asterisk_cli',
  'linuxCLI': 'linux_cli',
};
