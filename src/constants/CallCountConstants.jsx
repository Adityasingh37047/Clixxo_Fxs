// Call Count 1 - Table Headers
export const CALL_COUNT_1_HEADERS = [
  'Call Direction',
  'Total Calls',
  'Successful Calls',
  'Busy',
  'No Answer',
  'Call Forward',
  'Routing Failure',
  'Dialing Failure',
  'Caller Cancel',
  'No Resource',
  'Unknown Failure'
];

// Call Count 1 - Table Rows
export const CALL_COUNT_1_ROWS = [
  ['IP->Tel', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
  ['Tel->IP', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
];

// Call Count 2 (Call Statistics) - Table Headers
export const CALL_COUNT_2_HEADERS = [
  'Check',
  'Port',
  'Total Calls in Cycle',
  'Total Call-ins',
  'Connected Call-ins',
  'Call-in Connection Rate',
  'Total Call-in Length(Min)',
  'Total Call-outs',
  'Connected Call-outs',
  'Call-out Connection Rate',
  'Total Call-out Length(Min)'
];

// Call Count 2 - Column Widths
export const CALL_COUNT_2_COLUMN_WIDTHS = [
  '3%',  // Check
  '5%',  // Port
  '11%', // Total Calls in Cycle
  '9%',  // Total Call-ins
  '9%',  // Connected Call-ins
  '11%', // Call-in Connection Rate
  '12%', // Total Call-in Length(Min)
  '10%', // Total Call-outs
  '10%', // Connected Call-outs
  '12%', // Call-out Connection Rate
  '12%'  // Total Call-out Length(Min)
];

// Call Count 2 - Table Rows
export const CALL_COUNT_2_ROWS = [
  ['', 'Total', '0', '0', '0', '0%', '0', '0', '0', '0%', '0']
];

// Call Count 2 - Notes
export const CALL_COUNT_2_NOTES = [
  'Note: The FXO Call-out count feature will get valid only when the Polarity Reversal service is enabled.',
  'Note: The number of calls in the cycle will not be emptied during the clearance statistics'
];
