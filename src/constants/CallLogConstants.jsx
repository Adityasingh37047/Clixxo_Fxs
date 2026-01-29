// Tab configuration
export const CALL_LOG_TABS = [
  { id: 'calllog', label: 'Call Log' },
  { id: 'siplog', label: 'SIP Log' }
];

// Port options (1-32)
export const PORT_OPTIONS = Array.from({ length: 32 }, (_, i) => ({
  value: (i + 1).toString(),
  label: `Port${i + 1}`
}));

// Default selected port
export const DEFAULT_PORT = '1';

// Textarea heights
export const TEXTAREA_HEIGHTS = {
  IP_CALL_LOG: '250px',
  PORT_CALL_LOG: '250px',
  SIP_LOG: '500px'
};

// Section labels
export const SECTION_LABELS = {
  IP_CHANNEL: 'Call from IP Channel',
  PORT: 'Call from Port',
  SELECT_PORT: 'Select a Port:',
  SIP_LOG: 'SIP Log'
};

// Button labels
export const BUTTON_LABELS = {
  CLEAR_ALL: 'Clear All',
  REFRESH: 'Refresh',
  ENABLE_CALL_LOG: 'Enable Call Log'
};

// Default state values
export const DEFAULT_STATE = {
  enableCallLog: false,
  selectedPort: DEFAULT_PORT,
  ipCallLog: '',
  portCallLog: '',
  sipLog: ''
};

// Confirmation messages
export const CONFIRM_MESSAGES = {
  CLEAR_IP_LOG: 'Are you sure you want to clear IP Call Log?',
  CLEAR_PORT_LOG: 'Are you sure you want to clear Port Call Log?',
  CLEAR_SIP_LOG: 'Are you sure you want to clear SIP Log?'
};
