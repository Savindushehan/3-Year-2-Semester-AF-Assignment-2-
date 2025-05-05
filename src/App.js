// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css';
// import Header from './Components/SharedComponents/header'; 
// import ManiSharedPage from './Components/SharedComponents/MainSharedPage';
// import Home from './Components/MainComponents/Home';
// import LoginPage from './Components/MainComponents/LoginPage';
// import SignInPage from './Components/MainComponents/SignInPage';
// import SearchBox from './Components/SharedComponents/SearchBox';
// import CountrySharedpage from './Components/SharedComponents/CountrySharedPage';
// import Main from './Components/MainComponents/Main';
// import CountryPage from './Components/MainComponents/CountryPage';
// import Region from './Components/MainComponents/Region';
// import Code from './Components/MainComponents/Code';
// import RegisteredUserSharedPage from './Components/SharedComponents/RegisteredUserSharedPage';
// import RegisteredHeader from './Components/SharedComponents/RegistredHeader';
// import AddUser from './Components/MainComponents/RegisteredCountry';
// import { AuthProvider } from './Components/SharedComponents/AuthContext';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         {/* Render header */}
//         <Routes>
//         <Route path="/Header" element={<Header />} />
//         <Route path="/ManiSharedPage" element={<ManiSharedPage />} />
//         <Route path="/Home" element={<Home />} />
//         <Route path="/LoginPage" element={<LoginPage />} />
//         <Route path="/SignInPage" element={<SignInPage />} />
//         <Route path="/SearchBox" element={<SearchBox />} />
//         <Route path="/CountrySharedpage" element={<CountrySharedpage />} />
//         <Route path="/Main" element={<Main />} />
//         <Route path="/CountryPage" element={<CountryPage />} />
//         <Route path="/Region" element={<Region />} />
//         <Route path="/Code" element={<Code />} />
//         <Route path="/RegisteredUserSharedPage" element={<RegisteredUserSharedPage />} />
//         <Route path="/RegisteredHeader" element={<RegisteredHeader />} />
//         <Route path="/AddUser" element={<AddUser />} />





//         </Routes>
//       </div>
//     </Router>
//   );
// }


// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/SharedComponents/header'; 
import ManiSharedPage from './Components/SharedComponents/MainSharedPage';
import Home from './Components/MainComponents/Home';
import LoginPage from './Components/MainComponents/LoginPage';
import SignInPage from './Components/MainComponents/SignInPage';
import SearchBox from './Components/SharedComponents/SearchBox';
import CountrySharedpage from './Components/SharedComponents/CountrySharedPage';
import Main from './Components/MainComponents/Main';
import CountryPage from './Components/MainComponents/CountryPage';
import Region from './Components/MainComponents/Region';
import Code from './Components/MainComponents/Code';
import RegisteredUserSharedPage from './Components/SharedComponents/RegisteredUserSharedPage';
import RegisteredHeader from './Components/SharedComponents/RegistredHeader';
import AddUser from './Components/MainComponents/RegisteredCountry';
import { AuthProvider } from './Components/SharedComponents/AuthContext';
import MoreDetails from './Components/MainComponents/MoreDetails';
import ProtectedRoute from './Components/ProtectedRoute'; // import it
import NotFoundPage from './Components/MainComponents/404NotFound';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
          <Route path="*" element={<ManiSharedPage />} />
            <Route path="/Header" element={<Header />} />
            <Route path="/ManiSharedPage" element={<ManiSharedPage />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/SignInPage" element={<SignInPage />} />
            <Route path="/SearchBox" element={<SearchBox />} />
            <Route path="/CountrySharedpage" element={<CountrySharedpage />} />
            <Route path="/Main" element={<Main />} />
            <Route path="/CountryPage" element={<CountryPage />} />
            <Route path="/Region" element={<Region />} />
            <Route path="/Code" element={<Code />} />
            <Route path="/RegisteredHeader" element={<RegisteredHeader />} />
            <Route path="/AddUser" element={<AddUser />} />
            <Route path="/MoreDetails/:countryName" element={<MoreDetails />} />
            {/* Protected Route for Registered User */}
            <Route
              path="/RegisteredUserSharedPage"
              element={
                <ProtectedRoute>
                  <RegisteredUserSharedPage />
                </ProtectedRoute>
              }
            />

            {/* Catch-all Route for 404 */}
            <Route path="/NotFoundPage" element={<NotFoundPage />} />

            </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

