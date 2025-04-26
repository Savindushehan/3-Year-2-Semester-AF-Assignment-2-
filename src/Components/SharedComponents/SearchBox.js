import React, { useState } from 'react';

const SearchBox = ({ onSearch }) => {
    const [isHoverBtn1, setIsHoverBtn1] = useState(false);
    const [searchType, setSearchType] = useState("");
    const [inputValue, setInputValue] = useState("");

    const handleSearch = () => {
        if (inputValue.trim() && searchType) {
            onSearch(inputValue.trim(), searchType);
        }
    };

    const getPlaceholder = () => {
        switch (searchType) {
            case "en":
                return "Enter region (e.g., europe, asia)";
            case "country":
                return "Enter country name";
            case "language":
                return "Enter Language name";
            case "code":
                return "Enter Code name";
            default:
                return "Select search type first";
        }
    };

    return (
        <div style={styles.container}>
            <select
                style={styles.select}
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
            >
                <option value="">Select Search Type</option>
                <option value="en">Region</option>
                <option value="country">Country</option>
                <option value="language">Language</option>
                <option value="code">Code</option>


            </select>

            <input
                type="text"
                placeholder={getPlaceholder()}
                style={styles.input}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={!searchType}
            />

            <button
                style={{
                    ...styles.button,
                    backgroundColor: isHoverBtn1 ? "#6f5ab8" : "#846DCC",
                    opacity: (!inputValue.trim() || !searchType) ? 0.6 : 1,
                    cursor: (!inputValue.trim() || !searchType) ? 'not-allowed' : 'pointer'
                }}
                onMouseEnter={() => setIsHoverBtn1(true)}
                onMouseLeave={() => setIsHoverBtn1(false)}
                onClick={handleSearch}
                disabled={!inputValue.trim() || !searchType}
            >
                Search
            </button>
        </div>
    );
};

const styles = {
    container: {
        width: "900px",
        padding: "1.5rem",
        borderBottomLeftRadius: "50px",
        borderTopRightRadius: "50px",
        background: "#f4f4fa",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "2rem auto",
        border: "2px solid #DFD4FE"
    },
    input: {
        width: "250px",
        padding: "0.8rem",
        borderRadius: "12px",
        border: "1px solid #ccc",
        fontSize: "16px",
        margin: "0 1rem"
    },
    button: {
        width: "172px",
        height: "55px",
        color: "#FFFFFF",
        borderTopLeftRadius: "40px",
        borderBottomRightRadius: "40px",
        fontSize: "20px",
        border: "2px solid #846DCC",
        fontFamily: "Roboto",
        transition: "all 0.3s ease",
        margin: "0 1rem"
    },
    select: {
        width: "250px",
        padding: "0.6rem",
        borderRadius: "12px",
        border: "1px solid #ccc",
        fontSize: "16px",
        margin: "0 1rem"
    }
};

export default SearchBox;