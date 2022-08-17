import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// import ProductItem from "./Productltem";

import Admin from "./components/admin/Admin";
import Owner from "./components/owner/Owner";
export default function Home() {

    const [roleid,setRole] = useState(0);
    const [token,setToken] = useState(0);
    const username = localStorage.getItem("username");

    const checkRole = async () => {
        const response = await fetch(
            "http://localhost:8080/home",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username
                })
            }
        );
        const data = await response.json();
        console.log(data.result)
        if(data.result === false){
            setRole(5);
        }else{
            setRole(data.data)
        }
    }
                          
    useEffect(()=> {
        checkRole();
    },[])


    return (
        <>
                {roleid === 5 && <Navigate to="/" replace />}
                {roleid === 1 && <Admin/>}
                {roleid === 2 && <h1>emp</h1>}
                {roleid === 3 && <h1>manager</h1>}
                {roleid === 4 && <Owner />} 
        </>
       
       // <Navigate to="/" replace />
    );    
}