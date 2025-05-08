import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import download from '../assets/download.jpeg';

function Header({ isCompact, isLoginMode, onToggleMode, isLandingPage }) {
  return (
    <Navbar bg="success" variant="dark" expand="lg" className="px-4 w-100">
      <Navbar.Brand className="fw-bold text-white" style={{ cursor: 'pointer' }}>
        KICK <span className="text-warning">DRUGS</span>
      </Navbar.Brand>

      {!isCompact && (
        <>
          <Nav className="me-auto ms-4">
            <Nav.Link className="text-white">Menu 1</Nav.Link>
            <Nav.Link className="text-white">Menu 2</Nav.Link>
            <Nav.Link className="text-white">Menu 3</Nav.Link>
            <Nav.Link className="text-white">Menu 4</Nav.Link>
          </Nav>

          <div className="d-flex align-items-center text-white">
            <div className="position-relative me-3">
              <i className="fas fa-bell fa-lg" />
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle" />
            </div>
            <img src={download} className="rounded-circle me-2" alt="user" width="40" height="40" />
            {isLandingPage && (
              <div onClick={onToggleMode} style={{ cursor: 'pointer' }}>
                <div>{isLoginMode ? "Logout" : "Logout"}</div>
                <small>Kindly {isLoginMode ? "Click to logout" : "login"} to proceed</small>
              </div>
            )}
          </div>
        </>
      )}

{isCompact && sessionStorage.getItem('userToken') && (
  <div className="ms-auto d-flex align-items-center text-white">
    <img src={download} className="rounded-circle me-2" alt="user" width="40" height="40" />
    <div onClick={onToggleMode} style={{ cursor: 'pointer' }}>
      <div>Logout</div>
      <small>Click here to logout</small>
    </div>
  </div>
)}

    </Navbar>
  );
}

export default Header;
