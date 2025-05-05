import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Redirect to home page
  };

  return (
    <div style={styles.notFoundContainer}>
      <div style={styles.notFoundContent}>
        <h1 style={styles.errorTitle}>Oops! Page Not Found</h1>
        <p style={styles.errorMessage}>Looks like you wandered off the path. Let's get you back on track.</p>
        <button style={styles.goHomeBtn} onClick={handleGoHome}>
          Go Back Home
        </button>
      </div>
    </div>
  );
};

const styles = {
  notFoundContainer: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(45deg, #ff5f6d, #ffc3a0)',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  },
  notFoundContent: {
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '40px',
    borderRadius: '10px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
  },
  errorTitle: {
    fontSize: '4rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  errorMessage: {
    fontSize: '1.2rem',
    marginBottom: '30px',
  },
  goHomeBtn: {
    padding: '12px 30px',
    backgroundColor: '#fff',
    color: '#ff5f6d',
    border: 'none',
    borderRadius: '30px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
  },
};

export default NotFoundPage;
