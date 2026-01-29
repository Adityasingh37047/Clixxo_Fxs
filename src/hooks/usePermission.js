import { useAuth } from '../context/AuthContext';

/**
 * Hook to check user permissions
 * @returns {Object} Permission utilities
 */
export const usePermission = () => {
  const { user } = useAuth();

  /**
   * Check if current user has write permission
   * @returns {boolean} True if user has write permission
   */
  const hasWritePermission = () => {
    if (!user) return false;
    
    // Check permission field (can be 'write', 'read-only', 'read', etc.)
    const permission = user.permission || user.role || '';
    const permissionLower = permission.toLowerCase();
    
    // Admin always has write permission
    if (user.username?.toLowerCase() === 'admin') {
      return true;
    }
    
    // Check if permission includes 'write'
    return permissionLower === 'write' || permissionLower.includes('write');
  };

  /**
   * Check if current user has read-only permission
   * @returns {boolean} True if user has read-only permission
   */
  const hasReadOnlyPermission = () => {
    if (!user) return false;
    
    const permission = user.permission || user.role || '';
    const permissionLower = permission.toLowerCase();
    
    return permissionLower === 'read-only' || 
           permissionLower === 'read' || 
           permissionLower.includes('read-only');
  };

  /**
   * Check if user can access a specific page
   * @param {string} pageKey - The page API key (e.g., 'network', 'sip')
   * @returns {boolean} True if user can access the page
   */
  const canAccessPage = (pageKey) => {
    if (!user) return false;
    
    // Admin can access all pages
    if (user.username?.toLowerCase() === 'admin') {
      return true;
    }
    
    // Check pagePermissions if available
    if (user.pagePermissions && user.pagePermissions[pageKey] !== undefined) {
      return user.pagePermissions[pageKey] === true;
    }
    
    // Default to true if pagePermissions not available (backward compatibility)
    return true;
  };

  return {
    hasWritePermission,
    hasReadOnlyPermission,
    canAccessPage,
    user,
    isAdmin: user?.username?.toLowerCase() === 'admin'
  };
};
