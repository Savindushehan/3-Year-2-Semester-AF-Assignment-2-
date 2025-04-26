
import Header from './header'; // Make sure you import Header
import Home from '../MainComponents/Home';
import LoginPage from '../MainComponents/LoginPage';
import SignInPage from '../MainComponents/SignInPage';
import { useLocation } from "react-router-dom"; // ✅ Import from react-router-dom
import MoreDetails from '../MainComponents/MoreDetails';

const ManiSharedPage = () => {
    const location = useLocation(); // ✅ useLocation hook, not global location
    const status = location.state?.status;
    
    let PageComponent;
    if(status=="Sign In"){
        PageComponent = SignInPage;
    }else if (status=="Log In"){
        PageComponent = LoginPage;

    }else if(status=="Home"){
        PageComponent = Home;
    }else if(status=="MoreDetails"){
        PageComponent = MoreDetails;
    }
    else{
        PageComponent = Home;
    }


    return(
        <div className="body" style={{width:"100vw",height:"100vh",overflow:"hidden"}}>
         <div className="head" style={{width:"100vw",height:"10vh"}}>
                <Header />
            </div>
            <div className="main" style={{width:"100vw",height:"90vh",margin:"0"}}>
            <PageComponent /> {/* ✅ dynamically rendered component */}
            </div>
        </div>
    )
}


export default ManiSharedPage;
