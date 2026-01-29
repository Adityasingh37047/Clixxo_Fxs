import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { usePermission } from '../hooks/usePermission';

/**
 * Button component that only renders if user has write permission
 * @param {Object} props - Button props
 * @param {boolean} props.hideIfReadOnly - If true, button won't render for read-only users. If false, button will be disabled.
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler (will be prevented for read-only users)
 * @param {boolean} props.disabled - Additional disabled state
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Additional inline styles
 * @param {string} props.type - Button type (button, submit, etc.)
 * @param {string} props.variant - Material-UI variant
 * @param {Object} props.sx - Material-UI sx prop
 * @param {any} props.rest - Other button props
 */
const PermissionButton = ({ 
  hideIfReadOnly = true, 
  children, 
  onClick, 
  disabled = false,
  className = '',
  style = {},
  type = 'button',
  variant,
  sx,
  ...rest 
}) => {
  const { hasWritePermission } = usePermission();
  const canWrite = hasWritePermission();

  // If hideIfReadOnly is true and user is read-only, don't render the button
  if (hideIfReadOnly && !canWrite) {
    return null;
  }

  // Handle click - prevent action if read-only
  const handleClick = (e) => {
    if (!canWrite) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  // If not hiding, disable the button for read-only users
  const isDisabled = disabled || !canWrite;

  // If using Material-UI Button component
  if (variant !== undefined || sx !== undefined) {
    return (
      <MuiButton
        type={type}
        variant={variant}
        onClick={handleClick}
        disabled={isDisabled}
        className={className}
        sx={sx}
        {...rest}
      >
        {children}
      </MuiButton>
    );
  }

  // Regular button element
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isDisabled}
      className={className}
      style={{
        ...style,
        ...(isDisabled && !canWrite ? { 
          opacity: 0.5, 
          cursor: 'not-allowed',
          pointerEvents: 'none'
        } : {})
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

export default PermissionButton;
