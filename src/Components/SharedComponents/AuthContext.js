// import { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [userId, setUserId] = useState(null);

//     return (
//         <AuthContext.Provider value={{ userId, setUserId }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);


import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Set persistence to LOCAL (survives reloads and tabs)
        setPersistence(auth, browserLocalPersistence).then(() => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUserId(user.uid); // ✅ Maintain session
                } else {
                    setUserId(null);
                }
                setLoading(false);
            });

            return () => unsubscribe(); // cleanup
        }).catch((err) => {
            console.error('Failed to set persistence:', err);
            setLoading(false);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ userId, setUserId }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
