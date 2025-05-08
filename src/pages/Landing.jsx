import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear(); // Log the user out by clearing session storage
    navigate('/home'); // Redirect to home page after logout
  };

  const isLoggedIn = sessionStorage.getItem('userToken'); // Check if user is logged in

  return (
    <>
    
      
      {/* Hero Section */}
      <section style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '5rem 0', textAlign: 'center' }}>
        <h1 className="display-4 fw-bold">Fight Against Drugs</h1>
        <p className="lead mb-4">Join the fight and help build a drug-free world.</p>
        <Button
          size="lg"
          style={{
            backgroundColor: '#a5d6a7',
            border: 'none',
            color: '#2e7d32',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease-in-out',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          onClick={() => navigate('/home')} // navigate to home
        >
          Get Involved
        </Button>
      </section>

      {/* About Section */}
      <section style={{ backgroundColor: '#f1f8e9', padding: '5rem 0' }}>
        <div className="container">
          <div className="row">
            {["About Us", "Mission", "Get Involved"].map((title, i) => (
              <div className="col-md-4" key={i}>
                <Card
                  style={{ transition: 'transform 0.3s ease' }}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-10px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0px)'}
                >
                  <Card.Body>
                    <Card.Title className="fw-semibold text-primary">{title}</Card.Title>
                    <Card.Text>
                      {title === "About Us" && "We are a non-profit organization focused on raising awareness about the harmful effects of drugs."}
                      {title === "Mission" && "Our mission is to educate people about the dangers of drug abuse and offer resources for rehabilitation."}
                      {title === "Get Involved" && "Become a volunteer, donate, or join our awareness programs to help make a difference."}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section style={{ backgroundColor: '#c8e6c9', color: '#2e7d32', textAlign: 'center', padding: '5rem 0' }}>
        <div className="container">
          <h2 className="mb-4">Take Action Now</h2>
          <Button
            size="lg"
            style={{
              backgroundColor: '#81c784',
              border: 'none',
              color: '#1b5e20',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.3s ease-in-out',
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Donate Now
          </Button>
        </div>
      </section>

      {/* Footer Section */}
      <footer style={{ backgroundColor: '#333', color: 'white', padding: '2rem 0', textAlign: 'center' }}>
        <p className="mb-0">&copy; 2025 Anti-Drug Campaign</p>
      </footer>
    </>
  );
};

export default Landing;
