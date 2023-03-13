import React, { useEffect, useState } from "react";
import axios from "axios";



export const Dashboard = () => {

    const [name, setName] = useState('')

    useEffect(() => {
        axios
        .get('http://localhost:3001/api/v1/users')
        .then((response) => setName(response.data))
        .catch((error) => error)
    },[])

    const renderData = () => {
        const data = name? name : [];
        const dataJsx = data.map((item) => {
            return(
                <div key={item.id} className="ui two segment">
                    <h4>Name: {item.name}</h4>
                </div>
            )
        })
        return dataJsx;
    }

    return(
<div>
    <h4>
        Welcome to home page
    </h4>
    <h1>
       {renderData()} 
    </h1>
</div>
    )
}