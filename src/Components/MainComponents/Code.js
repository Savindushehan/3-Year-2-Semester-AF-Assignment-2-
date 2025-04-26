import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Code = ({ code }) => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate(); 
const [inputValue, setInputValue] = useState("");



  useEffect(() => {
    if (!code) return; 
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        
        if (!response.ok) {
          throw new Error(`Country with code ${code} not found`);
        }
        
        const data = await response.json();
        setCountry(data[0]);
      } catch (err) {
        setError(err.message);
        setCountry(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [code]);

  const buttonStyle = {
    width: "172px",
    height: "55px",
    color: "#FFFFFF",
    backgroundColor: isHovered ? "#846DCC" : "#6f5ab8",
    borderTopLeftRadius: "40px",
    borderBottomRightRadius: "40px",
    fontSize: "24px",
    border: "2px solid #846DCC",
    fontFamily: "Roboto",
    cursor: "pointer",
    transition: "all 0.3s ease",
    transform: isHovered ? "scale(1.1)" : "scale(1)",
  };

  if (!code) {
    return <p style={styles.message}>Please enter a country code to search</p>;
  }

  if (loading) {
    return <p style={styles.message}>Loading...</p>;
  }

  if (error) {
    return <p style={styles.message}>Error: {error}</p>;
  }

  if (!country) {
    return <p style={styles.message}>No country found with code: {code}</p>;
  }

  const handleCustomizeClick = () => {
    console.log('Navigating to:', `/MoreDetails/${code}`); // Debug log
    try {
      navigate(`/MoreDetails/${code}`); 
    } catch (err) {
      console.error('Navigation error:', err);
    }
  };
  return (
    <div className="main" style={{ padding: '20px' }}>
      <h2 style={styles.title}>
        {country.name.common}
      </h2>

      {country.latlng && (
        <div style={{ marginTop: '20px' }}>
          <h3 style={styles.subtitle}>
            Map Location:
          </h3>
          <iframe
            title="Google Map"
            width="100%"
            height="400"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://maps.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}&z=6&output=embed`}
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div style={styles.flexContainer}>
        <div style={styles.details}>
          <p style={styles.text}>
            <strong style={styles.label}>Capital City:</strong> {country.capital?.[0] || 'N/A'}
          </p>
          <p style={styles.text}>
            <strong style={styles.label}>Region:</strong> {country.region}
          </p>
          <p style={styles.text}>
            <strong style={styles.label}>Population:</strong> {country.population.toLocaleString()}
          </p>
          <p style={styles.text}>
            <strong style={styles.label}>Official Languages:</strong> 
            {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}
          </p>
        </div>

        <div style={styles.flag}>
          <img
            src={country.flags.png}
            alt={`${country.name.common} flag`}
            style={styles.image}
          />
        </div>
      </div>

      <div style={styles.buttonContainer}>
        <button
          style={buttonStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleCustomizeClick}
          >
          More
        </button>
      </div>
    </div>
  );
};

const styles = {
  message: {
    textAlign: 'center',
    fontSize: '1.2rem',
    marginTop: '2rem',
  },
  title: {
    fontSize: '3rem',
    textAlign: 'center',
    fontWeight: 'normal',
    fontFamily: 'Raleway',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    fontFamily: 'Raleway',
    marginBottom: '0.5rem',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: '2rem',
    flexWrap: 'wrap',
    gap: '2rem',
  },
  details: {
    flex: 1,
    minWidth: '250px',
  },
  flag: {
    flex: 1,
    minWidth: '250px',
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '6px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  },
  text: {
    fontSize: '1.2rem',
    fontFamily: "'Open Sans', sans-serif",
    marginBottom: '1rem',
    lineHeight: '1.6',
  },
  label: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    fontFamily: 'Raleway',
    marginRight: '0.5rem',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem',
  },
};

export default Code;