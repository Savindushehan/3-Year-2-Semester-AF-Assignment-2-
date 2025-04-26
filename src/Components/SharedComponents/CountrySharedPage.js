import React, { useState } from 'react';
import Header from './header';
import SearchBox from './SearchBox';
import Region from '../MainComponents/Region';
import CountryPage from '../MainComponents/CountryPage';
import Language from '../MainComponents/Langauge'; 
import Code from '../MainComponents/Code';

const CountrySharedpage = () => {
    const [searchValue, setSearchValue] = useState("");
    const [searchType, setSearchType] = useState("");

    // Handle search based on type
    const handleSearch = (value, type) => {
        setSearchValue(value);
        setSearchType(type);
    };

    return (
        <div className="body" style={{ width: "100vw", height: "100vh", overflowX: "hidden" }}>
            <div className="head" style={{ width: "100vw", height: "10vh" }}>
                <Header />
            </div>
            <div className="search" style={{ width: "100vw", height: "10vh" }}>
                <SearchBox 
                    onSearch={handleSearch}
                />
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
                ): searchType === "code" ? (
                    <Code code={searchValue} />
                )
                 : (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <p>Invalid search type</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CountrySharedpage;