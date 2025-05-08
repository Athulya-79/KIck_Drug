import React, { useContext, useState } from 'react';
import {
  Card, Button, Form, Container, Row, Col, InputGroup
} from 'react-bootstrap';
import Header from '../components/Header';
import { loginAPI, registerAPI } from "../services/allAPI";
import { useNavigate } from 'react-router-dom';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import { AuthContext } from '../contexts/AuthContext';

function Home() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRole('');
    setShowPassword(false);
    setShowConfirm(false);
    setError('');
    setSuccess('');
  };

  const handleToggleMode = () => {
    resetForm();
    setIsLogin(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!email || !password || !role || (!isLogin && (!username || !confirmPassword))) {
      setLoading(false);
      return setError('All fields are required');
    }

    if (!isLogin && password !== confirmPassword) {
      setLoading(false);
      return setError('Passwords do not match');
    }

    const reqBody = isLogin
      ? { email, password, role }
      : { username, email, password, role };

    try {
      const res = isLogin ? await loginAPI(reqBody) : await registerAPI(reqBody);
      setLoading(false);

      if (res.message) {
        setSuccess(res.message);

        if (isLogin && res.token && res.user) {
          login(res.token, res.user);
        }

        setTimeout(() => {
          if (isLogin) {
            navigate('/details');
          } else {
            resetForm();
            setIsLogin(true);
          }
        }, 1000);
      }

    } catch (err) {
      setLoading(false);
      const msg = err?.response?.data?.message || 'Something went wrong';
      setError(msg);
    }
  };

  return (
    <div className="bg-light min-vh-100">
      <Header isLoginMode={isLogin} isCompact={false} onToggleMode={handleToggleMode} />

      <Container className="d-flex justify-content-center align-items-center py-5">
        <Card style={{ width: '100%', maxWidth: '500px' }} className="shadow border-success">
          <Card.Body>
            <Card.Title className="mb-4 text-center">
              {isLogin ? 'Admin Login' : 'Admin Register'}
            </Card.Title>

            <Form onSubmit={handleSubmit}>
              {!isLogin && (
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
              )}

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <InputGroup>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeSlashFill /> : <EyeFill />}
                  </Button>
                </InputGroup>
              </Form.Group>

              {!isLogin && (
                <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <InputGroup>
                    <Form.Control
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowConfirm(!showConfirm)}
                    >
                      {showConfirm ? <EyeSlashFill /> : <EyeFill />}
                    </Button>
                  </InputGroup>
                </Form.Group>
              )}

              <Form.Group className="mb-3" controlId="formSelect">
                <Form.Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Choose Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Moderator">Moderator</option>
                </Form.Select>
              </Form.Group>

              {isLogin && (
                <Row className="mb-3">
                  <Col xs="auto">
                    <Form.Check type="checkbox" label="Remember Me" />
                  </Col>
                  <Col className="text-end" >
                    <a  className="text-danger small"   style={{ cursor: 'pointer' }}>Forgot Password?</a>
                  </Col>
                </Row>
              )}

              {error && <p className="text-danger text-center">{error}</p>}
              {success && <p className="text-success text-center">{success}</p>}

              <Button
                variant="success"
                type="submit"
                className="w-100"
                disabled={loading}
              >
                {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
              </Button>
            </Form>

            <p className="mt-3 text-center">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                onClick={handleToggleMode}
                className="text-primary"
                style={{ cursor: 'pointer' }}
              >
                {isLogin ? "Register here" : "Login here"}
              </span>
            </p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Home;
