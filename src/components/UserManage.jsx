import React, { useState, useEffect } from 'react';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import {
  USER_MANAGE_TITLE_USER_INFO,
  USER_MANAGE_TITLE_PAGE,
  USER_MANAGE_TITLE_CHANNEL_STATUS,
  USER_AUTHORITIES_OPTIONS,
  USER_MANAGE_PAGE_SECTIONS,
  USER_MANAGE_PORTS,
} from '../constants/UserManageConstants';
import { PAGE_ID_TO_API_KEY, API_KEY_TO_PAGE_ID } from '../constants/UserManagePageMapping';
import { createUser, getUser, updateUser, listUsers, deleteUser } from '../api/apiService';

function UserManage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authority, setAuthority] = useState('0');
  const [selectedPages, setSelectedPages] = useState(new Set());
  const [selectedPorts, setSelectedPorts] = useState(new Set());

  const [users, setUsers] = useState([]);
  const [mode, setMode] = useState('list'); // 'list' | 'edit'
  const [selectedRows, setSelectedRows] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null); // Store actual user ID from API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTogglePage = (id) => {
    setSelectedPages((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleTogglePort = (id) => {
    setSelectedPorts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCheckAllPages = () => {
    const allIds = USER_MANAGE_PAGE_SECTIONS.flatMap((sec) =>
      sec.items.map((item) => item.id)
    );
    setSelectedPages(new Set(allIds));
  };

  const handleUncheckAllPages = () => {
    setSelectedPages(new Set());
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Loading users...');
      const response = await listUsers();
      console.log('List users response:', response);
      if (response && response.response && response.data) {
        // Filter out admin user - admin has empty pagePermissions or username "Admin"
        const filteredUsers = response.data.filter((user) => {
          const isAdmin = 
            user.username?.toLowerCase() === 'admin' ||
            (user.pagePermissions && Object.keys(user.pagePermissions).length === 0);
          return !isAdmin;
        });
        
        // Transform API data to display format
        const transformedUsers = filteredUsers.map((user) => {
          console.log('Processing user:', user);
          return {
            id: user.id,
            username: user.username || '',
            authority: user.permission === 'write' ? 'Read and Write' : 'Read-only',
            channelInfo: user.channelPermissions 
              ? Object.entries(user.channelPermissions)
                  .filter(([_, enabled]) => enabled)
                  .map(([key]) => key.replace('fxs_', ''))
                  .join(',')
              : '',
            apiData: user, // Store full API data for editing
          };
        });
        console.log('Transformed users for display (excluding admin):', transformedUsers);
        setUsers(transformedUsers);
      } else {
        console.log('No users found or invalid response');
        setUsers([]);
      }
    } catch (err) {
      console.error('Error loading users:', err);
      setError(err.message || 'Failed to load users');
      // If list endpoint doesn't exist, start with empty array
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  const validateForm = () => {
    if (!username.trim()) {
      alert('Please enter a username!');
      return false;
    }
    if (!password.trim()) {
      alert('Please enter your password!');
      return false;
    }

    const pwd = password;

    // API requirement: Password must be at least 8 characters long and consist only of letters, numbers, and underscore (_)
    if (pwd.length < 8) {
      alert('Password must be at least 8 characters long!');
      return false;
    }
    if (pwd.length > 31) {
      alert('The maximum password length does not exceed 31 characters!');
      return false;
    }
    // Check if password contains only letters, numbers, and underscore
    if (!/^[a-zA-Z0-9_]+$/.test(pwd)) {
      alert('Password must be at least 8 characters long and consist only of letters, numbers, and underscore (_)');
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setAuthority('0');
    setSelectedPages(new Set());
    setSelectedPorts(new Set());
    setEditingUserId(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError('');
      
      // Debug: Log current state
      console.log('handleSave - editingUserId:', editingUserId, 'mode:', mode, 'editingIndex:', editingIndex);

      // Convert page IDs to API keys
      const pagePermissions = {};
      selectedPages.forEach((pageId) => {
        const apiKey = PAGE_ID_TO_API_KEY[pageId];
        if (apiKey) {
          pagePermissions[apiKey] = true;
        }
      });

      // Convert port IDs to channel permissions
      const channelPermissions = {};
      selectedPorts.forEach((portId) => {
        const portNum = parseInt(portId.replace('idPort', ''));
        if (!isNaN(portNum)) {
          channelPermissions[`fxs_${portNum + 1}`] = true; // Ports are 1-indexed
        }
      });

      // Prepare payload
      const payload = {
        username: username.trim(),
        password: password,
        permission: authority === '1' ? 'write' : 'read-only',
        pagePermissions,
        channelPermissions,
      };

      let response;
      // Determine if we're updating (check both editingUserId and editingIndex)
      const isUpdate = (editingUserId !== null && editingUserId !== undefined) || 
                       (editingIndex !== null && editingIndex !== undefined && users[editingIndex]);
      
      if (isUpdate) {
        // Update existing user - include ID in payload
        // Try to get ID from editingUserId first, then from users array
        let userIdToUse = editingUserId;
        if (!userIdToUse && editingIndex !== null && editingIndex !== undefined && users[editingIndex]) {
          userIdToUse = users[editingIndex].id;
          console.log('Using ID from users array:', userIdToUse);
        }
        
        console.log('Updating user with ID:', userIdToUse, 'Type:', typeof userIdToUse);
        
        if (!userIdToUse) {
          throw new Error('User ID is missing. Cannot update user.');
        }
        
        // Ensure ID is a number
        const userId = typeof userIdToUse === 'string' ? parseInt(userIdToUse, 10) : Number(userIdToUse);
        
        if (isNaN(userId) || userId <= 0) {
          throw new Error(`Invalid user ID: ${userIdToUse}`);
        }
        
        // Include ID in the payload
        payload.id = userId;
        console.log('Update payload (with ID):', JSON.stringify(payload, null, 2));
        console.log('User ID:', userId);
        response = await updateUser(userId, payload);
      } else {
        // Create new user
        response = await createUser(payload);
        // The createUser function already saves the ID to localStorage
      }

      if (response && response.response) {
        // Reload users list
        await loadUsers();
        setEditingIndex(null);
        setEditingUserId(null);
        resetForm();
        setMode('list');
        alert(editingUserId ? 'User updated successfully!' : 'User created successfully!');
      } else {
        throw new Error(response?.message || 'Operation failed');
      }
    } catch (err) {
      console.error('Error saving user:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to save user';
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = () => {
    resetForm();
    setEditingIndex(null);
    setMode('list');
  };

  const handleAddNew = () => {
    resetForm();
    setEditingIndex(null);
    setMode('edit');
  };

  const handleModify = async (index) => {
    const user = users[index];
    if (!user) return;

    try {
      setLoading(true);
      setError('');

      // Ensure user has an ID
      if (!user.id) {
        throw new Error('User ID is missing. Cannot edit user.');
      }

      console.log('handleModify - user.id:', user.id, 'user:', user);

      // Fetch full user data from API
      const response = await getUser(user.id);
      if (response.response && response.data && response.data.user) {
        const userData = response.data.user;
        const pagePermissions = response.data.pagePermissions || {};
        const channelPermissions = response.data.channelPermissions || {};

        console.log('Fetched user data for editing:', userData);

        setUsername(userData.username);
        setPassword(''); // Don't pre-fill password for security
        setAuthority(userData.permission === 'write' ? '1' : '0');

        // Convert API page permissions back to page IDs
        const pageIds = new Set();
        if (pagePermissions) {
          Object.entries(pagePermissions).forEach(([apiKey, enabled]) => {
            if (enabled) {
              const pageId = API_KEY_TO_PAGE_ID[apiKey];
              if (pageId) {
                pageIds.add(pageId);
              }
            }
          });
        }
        setSelectedPages(pageIds);

        // Convert API channel permissions back to port IDs
        const portIds = new Set();
        if (channelPermissions) {
          Object.entries(channelPermissions).forEach(([key, enabled]) => {
            if (enabled) {
              const portNum = parseInt(key.replace('fxs_', ''));
              if (!isNaN(portNum)) {
                portIds.add(`idPort${portNum - 1}`); // Convert to 0-indexed
              }
            }
          });
        }
        setSelectedPorts(portIds);

        setEditingIndex(index);
        // Ensure ID is set as a number
        const userId = typeof user.id === 'string' ? parseInt(user.id, 10) : user.id;
        console.log('Setting editingUserId to:', userId);
        setEditingUserId(userId);
        setMode('edit');
      } else {
        throw new Error(response.message || 'Failed to load user data');
      }
    } catch (err) {
      console.error('Error loading user:', err);
      setError(err.message || 'Failed to load user data');
      alert(err.message || 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRow = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleCheckAllRows = () => {
    setSelectedRows(users.map((_, idx) => idx));
  };

  const handleUncheckAllRows = () => {
    setSelectedRows([]);
  };

  const handleInverseRows = () => {
    setSelectedRows(
      users.map((_, idx) => (selectedRows.includes(idx) ? null : idx)).filter(
        (i) => i !== null
      )
    );
  };

  const handleClearAllRows = async () => {
    if (!window.confirm('Are you sure to clear all?')) return;
    
    try {
      setLoading(true);
      // Delete all users one by one
      for (const user of users) {
        await deleteUser(user.id);
      }
      await loadUsers();
      setSelectedRows([]);
    } catch (err) {
      console.error('Error clearing users:', err);
      alert(err.message || 'Failed to clear all users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedRows.length === 0) return;
    if (!window.confirm('Are you sure to delete?')) return;

    try {
      setLoading(true);
      // Delete selected users
      for (const index of selectedRows) {
        const user = users[index];
        if (user) {
          await deleteUser(user.id);
        }
      }
      await loadUsers();
      setSelectedRows([]);
    } catch (err) {
      console.error('Error deleting users:', err);
      alert(err.message || 'Failed to delete users');
    } finally {
      setLoading(false);
    }
  };

  const renderEditForm = () => (
    <form onSubmit={handleSave}>
      {/* User Info Title */}
      <div className="flex justify-center">
        <div className="w-full" style={{ maxWidth: '1024px' }}>
          <div className="w-full h-8 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] flex items-center justify-center font-semibold text-lg text-gray-700 shadow mb-0">
            <span>{USER_MANAGE_TITLE_USER_INFO}</span>
          </div>

          {/* User Info Box */}
          <div
            className="border-2 border-gray-400 border-t-0 shadow-sm"
            style={{ backgroundColor: '#dde0e4' }}
          >
            <div className="flex justify-center px-4 py-4">
              <table
                style={{
                  tableLayout: 'fixed',
                  width: '100%',
                  maxWidth: '800px',
                  fontSize: '13px',
                }}
              >
                <colgroup>
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '80%' }} />
                </colgroup>
                <tbody>
                  <tr>
                    <td className="text-left text-gray-700 py-2">Username</td>
                    <td className="py-2">
                      <input
                        type="text"
                        id="user_name"
                        name="user_name"
                        maxLength={64}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                          fontSize: '13px',
                          backgroundColor: '#ffffff',
                          border: '1px solid #999',
                          padding: '3px 6px',
                          width: '220px',
                          height: '26px',
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-left text-gray-700 py-2">Password</td>
                    <td className="py-2">
                      <input
                        type="password"
                        id="user_password"
                        name="user_password"
                        maxLength={31}
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                          fontSize: '13px',
                          backgroundColor: '#ffffff',
                          border: '1px solid #999',
                          padding: '3px 6px',
                          width: '220px',
                          height: '26px',
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-left text-gray-700 py-2">
                      User Authorities:
                    </td>
                    <td className="py-2">
                      <select
                        id="user_authorization"
                        name="user_authorization"
                        value={authority}
                        onChange={(e) => setAuthority(e.target.value)}
                        style={{
                          fontSize: '13px',
                          backgroundColor: '#ffffff',
                          border: '1px solid #999',
                          padding: '3px 6px',
                          width: '155px',
                          height: '28px',
                        }}
                      >
                        {USER_AUTHORITIES_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Page Title */}
      <div className="flex justify-center mt-4">
        <div className="w-full" style={{ maxWidth: '1024px' }}>
          <div className="w-full h-8 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] flex items-center justify-center font-semibold text-lg text-gray-700 shadow mb-0">
            <span>{USER_MANAGE_TITLE_PAGE}</span>
          </div>

          {/* Page Box */}
          <div
            className="border-2 border-gray-400 border-t-0 shadow-sm"
            style={{ backgroundColor: '#dde0e4' }}
          >
            <div className="px-4 py-4">
              {USER_MANAGE_PAGE_SECTIONS.map((section) => {
                // Use 4 columns per row for consistent column alignment
                const itemsPerRow = 4;
                const rows = [];
                for (let i = 0; i < section.items.length; i += itemsPerRow) {
                  rows.push(section.items.slice(i, i + itemsPerRow));
                }
                
                return (
                  <div key={section.title} className="mb-4">
                    <div className="text-gray-800 font-medium mb-1">
                      {section.title}
                    </div>
                    <table style={{ width: '500px', borderCollapse: 'separate', borderSpacing: 0 }}>
                      <colgroup>
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '25%' }} />
                      </colgroup>
                      <tbody>
                        {rows.map((row, rowIdx) => (
                          <tr key={rowIdx}>
                            {Array.from({ length: itemsPerRow }).map((_, colIdx) => (
                              <td key={colIdx} style={{ padding: '2px 4px', verticalAlign: 'top' }}>
                                {row[colIdx] ? (
                                  <label
                                    className="text-[12px] text-gray-800 whitespace-nowrap cursor-pointer"
                                    style={{ display: 'flex', alignItems: 'center' }}
                                  >
                                    <input
                                      type="checkbox"
                                      name="page[]"
                                      value={row[colIdx].id}
                                      checked={selectedPages.has(row[colIdx].id)}
                                      onChange={() => handleTogglePage(row[colIdx].id)}
                                      style={{
                                        marginRight: 4,
                                        backgroundColor: '#ffffff',
                                        flexShrink: 0,
                                      }}
                                    />
                                    {row[colIdx].label}
                                  </label>
                                ) : null}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              })}

              <div className="flex justify-center gap-4 mt-4 mb-2">
                <button
                  type="button"
                  onClick={handleCheckAllPages}
                  style={{
                    background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
                    color: '#222',
                    fontSize: '13px',
                    borderRadius: 4,
                    padding: '4px 18px',
                    border: '1px solid #bbb',
                    cursor: 'pointer',
                  }}
                >
                  Check All
                </button>
                <button
                  type="button"
                  onClick={handleUncheckAllPages}
                  style={{
                    background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
                    color: '#222',
                    fontSize: '13px',
                    borderRadius: 4,
                    padding: '4px 18px',
                    border: '1px solid #bbb',
                    cursor: 'pointer',
                  }}
                >
                  Uncheck All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Check Channel Status Title */}
      <div className="flex justify-center mt-4">
        <div className="w-full" style={{ maxWidth: '1024px' }}>
          <div className="w-full h-8 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] flex items-center justify-center font-semibold text-lg text-gray-700 shadow mb-0">
            <span>{USER_MANAGE_TITLE_CHANNEL_STATUS}</span>
          </div>

          {/* Channel Status Box */}
          <div
            className="border-2 border-gray-400 border-t-0 shadow-sm"
            style={{ backgroundColor: '#dde0e4' }}
          >
            <div className="px-4 py-4">
              <div className="grid grid-cols-4 gap-y-2 max-w-[700px]">
                {USER_MANAGE_PORTS.map((port) => (
                  <label
                    key={port.id}
                    className="text-[12px] text-gray-800 whitespace-nowrap cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      id={port.id}
                      checked={selectedPorts.has(port.id)}
                      onChange={() => handleTogglePort(port.id)}
                      style={{ marginRight: 4, backgroundColor: '#ffffff' }}
                    />
                    {port.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-center gap-6 py-6">
        <button
          type="submit"
          style={{
            background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '16px',
            borderRadius: '6px',
            minWidth: '100px',
            height: '42px',
            textTransform: 'none',
            padding: '6px 24px',
            boxShadow: '0 2px 8px #b3e0ff',
            border: '1px solid #0e8fd6',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleReturn}
          style={{
            background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '16px',
            borderRadius: '6px',
            minWidth: '100px',
            height: '42px',
            textTransform: 'none',
            padding: '6px 24px',
            boxShadow: '0 2px 8px #b3e0ff',
            border: '1px solid #0e8fd6',
            cursor: 'pointer',
          }}
        >
          Return
        </button>
      </div>
    </form>
  );

  const renderEmpty = () => (
    <div className="flex flex-col items-center justify-center h-full py-24">
      <div className="text-gray-600 text-xl md:text-[18px] font-semibold mb-4 text-center">
        No available user info!
      </div>
      <button
        type="button"
        onClick={handleAddNew}
        style={{
          background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
          color: '#fff',
          fontWeight: 600,
          fontSize: '16px',
          borderRadius: '6px',
          minWidth: '120px',
          height: '38px',
          textTransform: 'none',
          padding: '6px 28px',
          boxShadow: '0 2px 8px #b3e0ff',
          border: '1px solid #0e8fd6',
          cursor: 'pointer',
        }}
      >
        Add New
      </button>
    </div>
  );

  const renderList = () => (
    <div className="flex justify-center mt-4">
      <div className="w-full" style={{ maxWidth: '1300px' }}>
        {/* Blue header bar */}
        <div className="w-full h-8 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] flex items-center justify-center font-semibold text-lg text-gray-700 shadow mb-0">
          <span>{USER_MANAGE_TITLE_USER_INFO}</span>
        </div>

        {/* Table container */}
        <div
          style={{
            border: '2px solid #bbb',
            borderTop: 'none',
            borderRadius: 8,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            backgroundColor: '#f8fafd',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 13,
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: '1px solid #bbb',
                    padding: '6px 8px',
                    background: '#ffffff',
                    fontWeight: 600,
                    textAlign: 'center',
                  }}
                >
                  Modify
                </th>
                <th
                  style={{
                    border: '1px solid #bbb',
                    padding: '6px 8px',
                    background: '#ffffff',
                    fontWeight: 600,
                    textAlign: 'center',
                  }}
                >
                  Check
                </th>
                <th
                  style={{
                    border: '1px solid #bbb',
                    padding: '6px 8px',
                    background: '#ffffff',
                    fontWeight: 600,
                    textAlign: 'center',
                  }}
                >
                  Username
                </th>
                <th
                  style={{
                    border: '1px solid #bbb',
                    padding: '6px 8px',
                    background: '#ffffff',
                    fontWeight: 600,
                    textAlign: 'center',
                  }}
                >
                  User Authorities
                </th>
                <th
                  style={{
                    border: '1px solid #bbb',
                    padding: '6px 8px',
                    background: '#ffffff',
                    fontWeight: 600,
                    textAlign: 'center',
                  }}
                >
                  Channel Info
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.id}>
                  <td
                    style={{
                      border: '1px solid #bbb',
                      padding: '6px 8px',
                      textAlign: 'center',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <EditDocumentIcon
                      style={{
                        cursor: 'pointer',
                        color: '#0e8fd6',
                        display: 'block',
                        margin: '0 auto',
                        fontSize: 20,
                      }}
                      onClick={() => handleModify(idx)}
                    />
                  </td>
                  <td
                    style={{
                      border: '1px solid #bbb',
                      padding: '6px 8px',
                      textAlign: 'center',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(idx)}
                      onChange={() => handleSelectRow(idx)}
                    />
                  </td>
                  <td
                    style={{
                      border: '1px solid #bbb',
                      padding: '6px 8px',
                      textAlign: 'center',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    {user.username}
                  </td>
                  <td
                    style={{
                      border: '1px solid #bbb',
                      padding: '6px 8px',
                      textAlign: 'center',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    {user.authority}
                  </td>
                  <td
                    style={{
                      border: '1px solid #bbb',
                      padding: '6px 8px',
                      textAlign: 'center',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    {user.channelInfo || ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action bar */}
        <div
          className="flex flex-wrap items-center gap-2 px-2 py-2 mt-2"
          style={{ background: '#e3e7ef', fontSize: 12 }}
        >
          <button
            type="button"
            onClick={handleCheckAllRows}
            style={{
              background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
              color: '#222',
              borderRadius: 4,
              padding: '2px 10px',
              border: '1px solid #bbb',
              cursor: 'pointer',
            }}
          >
            Check All
          </button>
          <button
            type="button"
            onClick={handleUncheckAllRows}
            style={{
              background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
              color: '#222',
              borderRadius: 4,
              padding: '2px 10px',
              border: '1px solid #bbb',
              cursor: 'pointer',
            }}
          >
            Uncheck All
          </button>
          <button
            type="button"
            onClick={handleInverseRows}
            style={{
              background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
              color: '#222',
              borderRadius: 4,
              padding: '2px 10px',
              border: '1px solid #bbb',
              cursor: 'pointer',
            }}
          >
            Inverse
          </button>
          <button
            type="button"
            disabled={selectedRows.length === 0}
            onClick={handleDeleteSelected}
            style={{
              background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
              color: '#222',
              borderRadius: 4,
              padding: '2px 10px',
              border: '1px solid #bbb',
              cursor: selectedRows.length === 0 ? 'default' : 'pointer',
              opacity: selectedRows.length === 0 ? 0.6 : 1,
            }}
          >
            Delete
          </button>
          <button
            type="button"
            onClick={handleClearAllRows}
            style={{
              background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
              color: '#222',
              borderRadius: 4,
              padding: '2px 10px',
              border: '1px solid #bbb',
              cursor: 'pointer',
            }}
          >
            Clear All
          </button>
          <button
            type="button"
            onClick={handleAddNew}
            style={{
              background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
              color: '#222',
              borderRadius: 4,
              padding: '2px 10px',
              border: '1px solid #bbb',
              cursor: 'pointer',
            }}
          >
            Add New
          </button>
        </div>

        {/* Pagination style footer (static demo) */}
        <div
          className="px-2 py-2 text-[12px]"
          style={{ color: '#555', backgroundColor: '#dde0e4' }}
        >
          <span>
            {users.length || 0} Item Total&nbsp;&nbsp;20 Items/Page
          </span>
          &nbsp;&nbsp;
          <span>1/1&nbsp;&nbsp;</span>
          First&nbsp;&nbsp;Previous&nbsp;&nbsp;Next&nbsp;&nbsp;Last&nbsp;&nbsp;Go to Page{' '}
          <select
            name="topage"
            style={{
              fontSize: 11,
              padding: '1px 4px',
              border: '1px solid #aaa',
              backgroundColor: '#ffffff',
            }}
            defaultValue="1"
          >
            <option value="1">1</option>
          </select>
          &nbsp;&nbsp;1 Pages Total
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="bg-gray-50 min-h-[calc(100vh-128px)] py-2"
      style={{ backgroundColor: '#dde0e4' }}
    >
      {error && (
        <div style={{
          position: 'fixed',
          top: 20,
          right: 20,
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '12px 20px',
          borderRadius: 4,
          zIndex: 9999,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
          {error}
          <button
            onClick={() => setError('')}
            style={{
              marginLeft: 10,
              background: 'none',
              border: 'none',
              fontSize: 18,
              cursor: 'pointer',
              color: '#721c24'
            }}
          >
            ×
          </button>
        </div>
      )}
      {loading && mode === 'list' && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '200px'
        }}>
          <div>Loading users...</div>
        </div>
      )}
      {!loading && mode === 'edit'
        ? renderEditForm()
        : !loading && users.length === 0
        ? renderEmpty()
        : !loading && renderList()}
    </div>
  );
}

export default UserManage;