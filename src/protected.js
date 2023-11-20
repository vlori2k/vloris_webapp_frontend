import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/header";

function Protected(props){
    const navigate = useNavigate();
    const {Component} = props
    useEffect(()=>{
        let isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn || isLoggedIn === 'false' || isLoggedIn === false) navigate('/')
    }, [])
    return(
        <>
            <Header></Header>
            <div className="container-main" id='afterroot'>
            <Component/>
            </div>            
        </>
    )
}
export default Protected;