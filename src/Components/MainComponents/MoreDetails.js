import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MoreDetails = () => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const { countryName } = useParams();  // Get from URL

  const buttonStyle = {
    width: "172px",
    height: "55px",
    color: "#FFFFFF",
    backgroundColor: "#6f5ab8",
    borderTopLeftRadius: "40px",
    borderBottomRightRadius: "40px",
    fontSize: "24px",
    border: "2px solid #846DCC",
    fontFamily: "Roboto",
    cursor: "pointer",
    transition: "transform 0.3s ease",
    transform: isHovered ? "scale(1.1)" : "scale(1)",
  };

  useEffect(() => {
    console.log(countryName);
    if (!countryName) return;
    setLoading(true);
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((res) => res.json())
      .then((data) => {
        setCountry(data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch country data:', err);
        setCountry(null);
        setLoading(false);
      });
  }, [countryName]);

  return (
    <div className="main" style={{ padding: '20px' }}>
      {loading ? (
        <p>Loading...</p>
      ) : country ? (
        <div>
          <h2 style={{ fontSize: '3rem', textAlign: 'center', fontWeight: 'normal', fontFamily: 'Raleway' }}>
            {country.name.common}
          </h2>

          {country.latlng && (
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', fontFamily: 'Raleway' }}>
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
                <strong style={styles.label}>Capital City:</strong> {country.capital?.[0]}
              </p>
              <p style={styles.text}>
                <strong style={styles.label}>Region:</strong> {country.region}
              </p>
              <p style={styles.text}>
                <strong style={styles.label}>Population:</strong> {country.population.toLocaleString()}
              </p>
              <p style={styles.text}>
                <strong style={styles.label}>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}
              </p>

              {showMore && (
                <>
                  <p style={styles.text}>
                    <strong style={styles.label}>Top-Level Domain:</strong> {country.tld?.join(', ') || 'N/A'}
                  </p>
                  <p style={styles.text}>
                    <strong style={styles.label}>Currency:</strong> 
                    {country.currencies
                      ? Object.values(country.currencies).map(cur => `${cur.name} (${cur.symbol})`).join(', ')
                      : 'N/A'}
                  </p>
                  <p style={styles.text}>
                    <strong style={styles.label}>IDD Code:</strong> 
                    {country.idd?.root && country.idd?.suffixes
                      ? country.idd.suffixes.map(suffix => `${country.idd.root}${suffix}`).join(', ')
                      : 'N/A'}
                  </p>
                  <p style={styles.text}>
                    <strong style={styles.label}>Timezones:</strong> {country.timezones?.join(', ') || 'N/A'}
                  </p>
                  <p style={styles.text}>
                    <strong style={styles.label}>Borders:</strong> {country.borders?.join(', ') || 'None'}
                  </p>
                  <p style={styles.text}>
                    <strong style={styles.label}>Area:</strong> {country.area ? `${country.area.toLocaleString()} km²` : 'N/A'}
                  </p>
                  <p style={styles.text}>
                    <strong style={styles.label}>Start of Week:</strong> {country.startOfWeek || 'N/A'}
                  </p>
                  <p style={styles.text}>
                    <strong style={styles.label}>Continents:</strong> {country.continents?.join(', ') || 'N/A'}
                  </p>
                </>
              )}
            </div>

            <div style={styles.flag}>
              <img
                src={country.flags.png}
                alt={`${country.name.common} flag`}
                style={styles.image}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <button
              style={buttonStyle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setShowMore(prev => !prev)}
            >
              {showMore ? "Less" : "More"}
            </button>
          </div>
        </div>
      ) : (
        <p>No country data available.</p>
      )}
    </div>
  );
};

const styles = {
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: '30px',
    flexWrap: 'wrap',
  },
  details: {
    flex: 1,
    minWidth: '250px',
  },
  flag: {
    marginLeft: '20px',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '6px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  },
  text: {
    fontSize: '1.2rem',
    fontWeight: 'normal',
    fontFamily: "'Open Sans', sans-serif",
    marginBottom: '10px',
  },
  label: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    fontFamily: 'Raleway',
    marginRight: '5px',
  },
};

export default MoreDetails;
