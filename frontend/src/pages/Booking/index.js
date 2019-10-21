import React, {useEffect,useState} from 'react';

import api from '../../services/api';
import './styles.css';

export default function Booking({history,match}){
    
    const [bookings, setBookings] = useState([]);
    const {spotId} = match.params;

    useEffect(() => {
        async function loadBookings(){
            const response = await api.get(`spots/${spotId}/bookings`)
            
            setBookings(response.data)
  
        }        
            loadBookings();
        }, [spotId]);

        function handleVoltar(){
            history.push(`/update/${spotId}`);
        }
        return (
        <>
            <ul className="bookings">
            {   bookings.length?
                    bookings.map(book =>(
                        
                        <li key={book._id}>
                            <p>
                            
                                <strong>{book.user? book.user.email: 'Anônimo'} </strong> 
                                tem uma reserva para: <strong> {book.date}</strong>
                            </p>
                        </li>
                    

                ))
                :
                    <p className = "empty"><strong>Não há reservas para este Spot</strong></p>
            }
            </ul>
            
            <button className="btn" onClick={handleVoltar}>Voltar</button>  
            
        </>   
           );


}