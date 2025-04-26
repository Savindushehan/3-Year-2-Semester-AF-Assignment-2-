import React, { useEffect, useState } from 'react';

const Region = ({ regionName }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!regionName) return;

    setLoading(true);

    // Fetch countries based on dynamic region name
    fetch(`https://restcountries.com/v3.1/region/${regionName.toLowerCase()}`)
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
  }, [regionName]);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '2.5rem', textAlign: 'center', fontFamily: 'Raleway' }}>
        Region: {regionName}
      </h2>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : countries.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No countries found in this region.</p>
      ) : (
        <div style={styles.grid}>
          {countries.map((country) => (
            <div key={country.cca3} style={styles.card}>
              <img
                src={country.flags?.png || country.flags?.svg}
                alt={`Flag of ${country.name?.common}`}
                style={styles.flag}
              />
              <p style={styles.name}>{country.name?.common || 'Unknown'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '30px',
  },
  card: {
    width: '180px',
    textAlign: 'center',
    padding: '10px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    backgroundColor: '#f9f9f9',
  },
  flag: {
    width: '100%',
    height: 'auto',
    borderRadius: '6px',
  },
  name: {
    marginTop: '10px',
    fontSize: '1.1rem',
    fontFamily: 'Roboto',
  },
};

export default Region;