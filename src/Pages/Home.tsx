import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        
        <><Header />
        
        <div className="">
            <h1>Home page</h1>
            <button onClick={() => navigate("/login")}>Go to login</button>
        </div></>
    );
};

export default HomePage;
