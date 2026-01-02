import React, { useState } from 'react';
import { FAX_MODE_OPTIONS, FAX_FORM_INITIAL, T38_FIELDS } from '../constants/FaxFaxConstants';
import { Select, MenuItem, Button, Checkbox } from '@mui/material';

const FaxFaxPage = () => {
  const [form, setForm] = useState({ ...FAX_FORM_INITIAL });

  const handleChange = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => setForm({ ...FAX_FORM_INITIAL });

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-140px)] py-0 flex justify-center overflow-x-hidden" style={{ backgroundColor: "#dde0e4" }}>
      <div className="w-full max-w-[1000px] md:w-[1000px] px-2 md:px-0" style={{ margin: '0 auto' }}>
        {/* Header */}
        <div className="w-full h-9 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] flex items-center justify-center font-semibold text-base md:text-xl text-gray-700 shadow mb-0">
          Fax Parameters
        </div>

        {/* Content */}
        <div className="border-2 border-gray-400 border-t-0 shadow-sm flex flex-col" style={{ backgroundColor: "#dde0e4" }}>
          <div className="flex-1 py-6 px-4 md:px-[55px]">
            <div className="space-y-4 max-w-[640px] mx-auto">

              {/* Fax Mode */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-[60px]">
                <label className="text-base text-gray-700 font-medium text-left w-full md:w-[280px] flex-shrink-0">
                  Fax Mode:
                </label>
                <Select
                  value={form.faxMode}
                  onChange={(e) => handleChange('faxMode', e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{
                    width: { xs: '100%', md: '280px' },
                    fontSize: 16,
                    height: 32,
                    backgroundColor: '#ffffff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#999999',
                    },
                    '& .MuiSelect-select': {
                      padding: '4px 10px',
                      lineHeight: '24px',
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {FAX_MODE_OPTIONS.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </Select>
              </div>

              {/* T.38 Fields */}
              {form.faxMode === 'T38' && (
                <>
                  {T38_FIELDS.map((field) => (
                    <div key={field.name} className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-[60px]">
                      {field.type === 'checkbox' ? (
                        <>
                          <label className="text-base text-gray-700 font-medium text-left w-full md:w-[280px] flex-shrink-0">
                            {field.label}:
                          </label>
                          <div className="flex items-center">
                            <Checkbox
                              checked={form[field.name]}
                              onChange={(e) => handleChange(field.name, e.target.checked)}
                              sx={{ p: 0.5 }}
                            />
                            <span className="text-base text-gray-700 font-medium ml-2">Enable</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <label className="text-base text-gray-700 font-medium text-left w-full md:w-[280px] flex-shrink-0">
                            {field.label}:
                          </label>
                          <Select
                            value={form[field.name]}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            variant="outlined"
                            size="small"
                            sx={{
                              width: { xs: '100%', md: '280px' },
                              fontSize: 16,
                              height: 32,
                              backgroundColor: '#ffffff',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#999999',
                              },
                              '& .MuiSelect-select': {
                                padding: '4px 10px',
                                lineHeight: '24px',
                                backgroundColor: 'transparent',
                              },
                            }}
                          >
                            {field.options.map(opt => (
                              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                            ))}
                          </Select>
                        </>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mt-6">
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '14px',
              borderRadius: 1.5,
              minWidth: 100,
              px: 3,
              py: 1,
              boxShadow: '0 2px 8px #b3e0ff',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
                color: '#fff',
              },
            }}
          >Save</Button>

          <Button
            variant="contained"
            onClick={handleReset}
            sx={{
              background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '14px',
              borderRadius: 1.5,
              minWidth: 100,
              px: 3,
              py: 1,
              boxShadow: '0 2px 8px #b3e0ff',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
                color: '#fff',
              },
            }}
          >Reset</Button>
        </div>
      </div>
    </div>
  );
};

export default FaxFaxPage;


