import React from 'react';
import { FR_TITLE, FR_INSTRUCTION, FR_BUTTON } from '../constants/FactoryResetConstants';
import Button from '@mui/material/Button';

const blueBar = (title) => (
  <div className="w-full bg-gradient-to-b from-[#b3e0ff] via-[#7ecbfa] to-[#3b8fd6] h-10 rounded-t-lg flex items-center justify-center text-[20px] font-semibold text-gray-800 shadow mb-0 border-b border-[#b3e0ff]">
    {title}
  </div>
);

const buttonSx = {
  background: 'linear-gradient(to bottom, #5dc6f8 0%, #299fd6 100%)',
  color: '#fff',
  fontWeight: 600,
  fontSize: '16px',
  borderRadius: 0,
  minWidth: 90,
  px: 2,
  py: 0.5,
  boxShadow: '0 2px 8px #b3e0ff',
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(to bottom, #299fd6 0%, #5dc6f8 100%)',
  },
};

const FactoryReset = () => {
  return (
      <div className="w-full min-h-[calc(100vh-80px)] bg-gray-50 flex flex-col items-center py-6 px-2">
      <div className="w-full max-w-4xl">
        {blueBar(FR_TITLE)}
        <div className="border border-gray-400 bg-white p-4 flex flex-col items-center justify-center text-center">
          <span className="text-[17px] text-gray-700">{FR_INSTRUCTION}</span>
        </div>
        <div className="w-full flex flex-row justify-center mt-8">
          <Button variant="contained" sx={buttonSx}>{FR_BUTTON}</Button>
        </div>
      </div>
    </div>
  );
};

export default FactoryReset; 