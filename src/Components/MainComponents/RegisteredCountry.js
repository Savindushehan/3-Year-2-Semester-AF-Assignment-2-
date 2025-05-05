import React, { useState, useEffect } from 'react';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { useAuth } from '../SharedComponents/AuthContext';
import app from '../../firebase';
import CountryImage from '../../Asserts/Images/Country.png'; // adjust the path if needed

const db = getFirestore(app);

export default function AddUser() {
  const { userId } = useAuth();
  const [countryName, setCountryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [existingDocId, setExistingDocId] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const fetchUserCountry = async () => {
      if (!userId) return;

      try {
        const q = query(collection(db, 'UserCountry'), where('userID', '==', userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0];
          setExistingDocId(docData.id);
          setCountryName(docData.data().countryName);
        }
      } catch (err) {
        console.error('Error fetching user country:', err);
        setError('Failed to load your country data.');
      }
    };

    fetchUserCountry();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError('No user authenticated');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (existingDocId) {
        const docRef = doc(db, 'UserCountry', existingDocId);
        await updateDoc(docRef, {
          countryName,
          updatedAt: new Date(),
        });
        alert('✅ Country updated successfully!');
      } else {
        await addDoc(collection(db, 'UserCountry'), {
          userID: userId,
          countryName,
          createdAt: new Date(),
        });
        alert('✅ Country added successfully!');
      }
    } catch (err) {
      console.error('Error saving country:', err);
      setError(`Failed to save country: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Inline styles
  const styles = {
    page: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff', // white background
      padding: '24px',
    },
    
    card: {
      width: '100%',
      maxWidth: '500px',
      background: '#ffffff', // solid white card
      borderRadius: '20px',
      padding: '32px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)', // soft shadow
      border: '1px solid #ff9b00', // orange border
    },
    
    iconCircle: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: 'linear-gradient(to right, #22d3ee, #ec4899)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 24px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1f2937', // dark gray
      textAlign: 'center',
      marginBottom: '8px',
    },
    subtitle: {
      fontSize: '14px',
      color: '#6b7280', // gray-500
      textAlign: 'center',
      marginBottom: '32px',
    },
    errorBox: {
      width: '100%',
      padding: '12px',
      background: 'rgba(239, 68, 68, 0.2)',
      color: '#fecaca',
      borderRadius: '12px',
      border: '1px solid rgba(248, 113, 113, 0.5)',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },
    label: {
      display: 'block',
      fontSize: '12px',
      fontWeight: '500',
      color: '#374151', // gray-700
      marginBottom: '8px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    input: {
      width: '87%',
      padding: '12px 16px',
      background: '#f9fafb', // light background
      color: '#111827', // dark text
      borderRadius: '12px',
      border: '1px solid #d1d5db', // gray-300
      outline: 'none',
      paddingRight: '48px',
      ...(isFocused && {
        background: '#fff',
        border: '1px solid #6366f1', // focus with indigo border
        boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)',
      }),
    },
    inputContainer: {
      position: 'relative',
      marginBottom: '24px',
      transition: 'all 0.3s ease',
    },
    
    inputIcon: {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'rgba(255, 255, 255, 0.5)',
    },
    button: {
      width: '100%',
      padding: '12px 24px',
      fontWeight: '500',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      ...(loading
        ? {
            background: 'rgba(236, 72, 153, 0.7)',
            cursor: 'not-allowed',
          }
        : {
            background: 'linear-gradient(to right, #ec4899, #7c3aed)',
            cursor: 'pointer',
            ':hover': {
              background: 'linear-gradient(to right, #ec4899, #6d28d9)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            },
          }),
    },
  };

  return (
    <div style={styles.page}>
       <img
                src={CountryImage}
                alt="Illustration"
                style={{ maxWidth: "35%", height: "auto" , position:"absolute",zIndex:"1", left:"10%",border:"none" }}
            />
      <div style={styles.card}>
        <div style={styles.iconCircle}>
          <span style={{ fontSize: '32px' }}>🌍</span>
        </div>
        
        <h1 style={styles.title}>
          {existingDocId ? 'Update Your Country' : 'Add Your Country'}
        </h1>
        <p style={styles.subtitle}>
          {existingDocId ? 'Edit your current country information' : 'Tell us where you\'re from'}
        </p>

        {error && (
          <div style={styles.errorBox}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label style={styles.label}>Country Name</label>
            <div style={styles.inputContainer}>
              <input
                type="text"
                value={countryName}
                onChange={(e) => setCountryName(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="e.g. Japan, France, Brazil..."
                style={styles.input}
                required
              />
              <div style={styles.inputIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? (
              <>
                <svg
                  style={{ animation: 'spin 1s linear infinite' }}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Processing...</span>
              </>
            ) : existingDocId ? (
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                <span>Update Country</span>
              </>
            ) : (
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Add Country</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}