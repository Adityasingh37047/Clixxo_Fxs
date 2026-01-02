// Table headers for the PSTN Status page


// Channel State Table Constants
export const CHANNEL_STATE_TITLE = 'Channel State';

export const CHANNEL_STATE_HEADERS = [
  'Channel',
  'Type',
  'Number',
  'Voltage(v)',
  'State',
  'Forbid Outgoing Call',
  'Direction',
  'CallerID',
  'CalleeID',
  'Reg Status',
  'Polarity Reversal Count'
];

export const CHANNEL_STATE_COLUMN_WIDTHS = [
  '5%',  // Channel
  '4%',  // Type
  '5%',  // Number
  '5%',  // Voltage(v)
  '5%',  // State
  '10%', // Forbid Outgoing Call
  '6%', // Direction
  '6%', // CallerID
  '6%', // CalleeID
  '8%', // Reg Status
  '10%'  // Polarity Reversal Count
];
