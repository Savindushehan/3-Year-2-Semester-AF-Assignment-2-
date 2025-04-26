import React, { useState, useEffect } from 'react';
import Header from './header';
import SearchBox from './SearchBox';
import Region from '../MainComponents/Region';
import CountryPage from '../MainComponents/CountryPage';
import Language from '../MainComponents/Langauge';
import Code from '../MainComponents/Code';
import RegisteredHeader from './RegistredHeader';
import { useAuth } from './AuthContext';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import app from '../../firebase'; // Make sure this exports your Firebase app

const db = getFirestore(app);

const RegisteredUserSharedPage = () => {
    const [searchValue, setSearchValue] = useState("");
    const [searchType, setSearchType] = useState("");
    const { userId } = useAuth();

    useEffect(() => {
        const fetchUserCountry = async () => {
            if (!userId) return;
            console.log("Fetching for UID:", userId); // 👈 Add this

            try {
                const q = query(collection(db, 'UserCountry'), where('userID', '==', userId));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0];
                    const data = doc.data();
                    if (data.countryName) {
                        setSearchValue(data.countryName);
                        setSearchType("country");
                    }
                } else {
                    console.log("No country found for this user.");
                }
            } catch (error) {
                console.error("Error fetching user country:", error);
            }
        };

        fetchUserCountry();
    }, [userId]);

    const handleSearch = (value, type) => {
        setSearchValue(value);
        setSearchType(type);
    };

    return (
        <div className="body" style={{ width: "100vw", height: "100vh", overflowX: "hidden" }}>
            <div className="head" style={{ width: "100vw", height: "10vh" }}>
                <RegisteredHeader />
            </div>
            <div className="search" style={{ width: "100vw", height: "10vh" }}>
                <SearchBox onSearch={handleSearch} />
            </div>
            <div className="main" style={{ width: "100vw", height: "80vh", margin: "0", overflowX: "hidden" }}>
                {!searchType ? (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <p>Please select a search type and enter a value</p>
                    </div>
                ) : searchType === "en" ? (
                    <Region regionName={searchValue} />
                ) : searchType === "country" ? (
                    <CountryPage countryName={searchValue} />
                ) : searchType === "language" ? (
                    <Language language={searchValue} />
                ) : searchType === "code" ? (
                    <Code code={searchValue} />
                ) : (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <p>Invalid search type</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegisteredUserSharedPage;
