import React, { useContext } from 'react';
import { FaBell } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { authData } = useContext(AuthContext);
  const location = useLocation();

  const username = authData?.user?.username;
  const userImage = authData?.user?.image || "https://i.imgur.com/QlRphfQ.png";

  // Choose subtitle based on path
  const getSubtitle = () => {
    if (location.pathname.includes('/details')) return 'Kindly fill your details';
    if (location.pathname.includes('/dashboard')) return 'Here is your analytics';
    return '';
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 30px',
      borderBottom: '1px solid #ddd',
      backgroundColor: '#fff'
    }}>
      {/* Left: Greeting */}
      <div>
        <h2 style={{ margin: 0 }}>Hi {username}!</h2>
        <p style={{ margin: 0, color: '#666' }}>{getSubtitle()}</p>
      </div>

      {/* Right: Notification + Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ position: 'relative' }}>
          <FaBell size={20} />
          <span style={{
            position: 'absolute',
            top: -5,
            right: -5,
            width: '10px',
            height: '10px',
            backgroundColor: 'red',
            borderRadius: '50%'
          }}></span>
        </div>
       
        <span style={{ fontWeight: '500' }}>{username}</span>
        <span style={{ fontSize: '12px' }}>▼</span>
      </div>
    </div>
  );
};

export default Navbar;
