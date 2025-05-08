import React from 'react';
import { Nav } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const isProfileActive = () => {
    return location.pathname.includes('/profile') || location.pathname.includes('/details');
  };

  return (
    <div className="d-flex flex-column justify-content-between bg-success bg-opacity-10 vh-100 p-3" style={{ width: '250px' }}>
      <div>
        <div className="mb-4 text-center">
          <h4 className="fw-bold text-white">
            KICK <span className="text-warning">DRUGS</span>
          </h4>
        </div>

        <Nav className="flex-column gap-3">
          <Nav.Link
            href="/dashboard"
            className={`d-flex align-items-center gap-2 ${isActive('/dashboard') ? 'bg-success text-white rounded px-2 py-1' : 'text-dark'}`}
          >
            <i className="fas fa-th-large"></i>
            Dashboard
          </Nav.Link>

          {/* Other Menu Items */}
          <Nav.Link href="#" className="text-dark d-flex align-items-center gap-2">
            <i className="fas fa-map-marker-alt"></i>
            Menu 02
          </Nav.Link>
          <Nav.Link href="#" className="text-dark d-flex align-items-center gap-2">
            <i className="fas fa-box"></i>
            Menu 03
          </Nav.Link>
          <Nav.Link href="#" className="text-dark d-flex align-items-center gap-2">
            <i className="fas fa-warehouse"></i>
            Menu 04
          </Nav.Link>
          <Nav.Link href="#" className="text-dark d-flex align-items-center gap-2">
            <i className="fas fa-link"></i>
            Menu 05
          </Nav.Link>
          <Nav.Link href="#" className="text-dark d-flex align-items-center gap-2">
            <i className="fas fa-award"></i>
            Menu 06
          </Nav.Link>
          <Nav.Link href="#" className="text-dark d-flex align-items-center gap-2">
            <i className="fas fa-download"></i>
            Downloads
          </Nav.Link>
        </Nav>
      </div>

      <div className="d-flex flex-column gap-2">
        <Nav.Link
          href="/details"
          className={`d-flex align-items-center gap-2 ${isProfileActive() ? 'bg-success text-white rounded px-2 py-1' : 'text-dark'}`}
        >
          <i className="fas fa-user me-2"></i>
          My Profile
        </Nav.Link>
        <Nav.Link href="#" className="text-dark d-flex align-items-center gap-2">
          <i className="fas fa-cog"></i>
          Settings
        </Nav.Link>
        <Nav.Link
          onClick={handleLogout}
          className="text-dark d-flex align-items-center gap-2"
          style={{ cursor: 'pointer' }}
        >
          <i className="fas fa-sign-out-alt"></i>
          Logout
        </Nav.Link>
      </div>
    </div>
  );
};

export default Sidebar;
