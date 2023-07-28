import React, { createContext } from 'react'
import 'react-toastify/dist/ReactToastify.css';

export const PurchaseContext = createContext();

const PurchaseProvider = ({children}) =>{

    const generateTicket = async (id) =>{
        try{
            const token = localStorage.getItem('token');
            const url = `http://localhost:8080/api/ticket/${id}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                },
            });
            if (response.ok) {
                const data = await response.json();
                return data
            } else {
                window.location.href = 'http://localhost:3000/'
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            console.log(error)
        };
    };

    const finalizeTicket = async (ticketData) =>{
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/ticket/finalizePurchase`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(ticketData),
            });
            if (response.ok) {
                const resJson = await response.json()
                
            } else {
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            console.log(error)
        };
    };

    return(
        <PurchaseContext.Provider value={{ generateTicket, finalizeTicket}}>
        {children}
        </PurchaseContext.Provider>
    )
}



export default PurchaseProvider;  