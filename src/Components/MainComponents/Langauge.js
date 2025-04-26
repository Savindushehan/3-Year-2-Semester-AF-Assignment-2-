import React, { useEffect, useState } from 'react';

const Language = ({ language }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!language) return;

    setLoading(true);

    // Fetch countries based on language
    fetch(`https://restcountries.com/v3.1/lang/${language.toLowerCase()}`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
        setCountries([]);
        setLoading(false);
      });
  }, [language]);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '2.5rem', textAlign: 'center', fontFamily: 'Raleway' }}>
        Countries where {language} is spoken
      </h2>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : countries.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No countries found for this language.</p>
      ) : (
        <div style={styles.grid}>
          {countries.map((country) => (
            <div key={country.cca3} style={styles.card}>
              <img
                src={country.flags?.png || country.flags?.svg}
                alt={`Flag of ${country.name?.common}`}
                style={styles.flag}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/180x120?text=No+Flag';
                }}
              />
              <p style={styles.name}>{country.name?.common || 'Unknown'}</p>
              <p style={styles.details}>Capital: {country.capital?.[0] || 'N/A'}</p>
              <p style={styles.details}>Population: {country.population?.toLocaleString() || 'N/A'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '30px',
  },
  card: {
    textAlign: 'center',
    padding: '15px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    backgroundColor: '#f9f9f9',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },
  flag: {
    width: '100%',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '6px',
    marginBottom: '10px',
  },
  name: {
    margin: '5px 0',
    fontSize: '1.1rem',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  details: {
    margin: '3px 0',
    fontSize: '0.9rem',
    color: '#555',
  },
};

export default Language;