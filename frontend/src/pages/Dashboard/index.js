import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api';
import './styles.css';
export default function Dashboard(){

    const [spots,setSpot] = useState([]);

    useEffect(() => {
    async function loadSpots(){
        const user_id = localStorage.getItem('user');
        const response = await api.get('/dashboard',{
            headers:{
                user_id
            }
        } )

        setSpot(response.data)
    }        
        loadSpots();
    }, [])
    return (
        <>
            <ul className="spot-list">
                {spots.map( spot => (
                    <li key= {spot._id}>
                        <header style = {{backgroundImage: `url(${spot.thumbnail_url})`}}/>
                            
                        <strong>{spot.company}</strong>
                        <span> {spot.price ? `R$ ${spot.price}/dia` : 'GRATUITO'} R$ </span>
                    </li>
                ))}
            </ul>
            <Link to="/new">
                <button type="submit" className="btn" >Novo Spot</button>
            </Link>
        </>
    );
}