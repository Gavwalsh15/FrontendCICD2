// Lets do all database stuff here and just share this global context with the rest of the App
// - so no database code anywhere else in our App
// - every CRUD function the App needs to do is in here, in one place
// - makes debugging etc so much easier
// - all external connections still have to go through /api routes

import {createContext, useEffect, useState} from 'react'
import {error} from "next/dist/build/output/log";

const GlobalContext = createContext()

export function GlobalContextProvider(props) {
    const [globals, setGlobals] = useState({
        aString: 'init val',
        count: 0,
        hideHamMenu: true,
        restaurants: [],
        dataLoaded: false,
        user: null
    })

    useEffect(() => {
        getAllRestaurants()
    }, []);

    async function getAllRestaurants() {
        const response = await fetch('/api/get-restaurants', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json(); // Parse the response body
        setGlobals((previousGlobals) => {
            const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
            newGlobals.restaurants = data || [];
            newGlobals.dataLoaded = true;
            return newGlobals;
        });
    }

    async function login(username, password) {
        const response = await fetch('/api/login-user', {
            method: 'POST',
            body: JSON.stringify(username, password),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let loginDetails;
        if (response.ok) {
            loginDetails = await response.json();
        }else{
            return error(response);
        }
        console.log(loginDetails);

        setGlobals((previousGlobals) => {
            const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
            newGlobals.user = loginDetails;
            return newGlobals
        })
    }


    async function editGlobalData(command) { // {cmd: someCommand, newVal: 'new text'}
        if (command.cmd == 'hideHamMenu') { // {cmd: 'hideHamMenu', newVal: false}
            //  WRONG (globals object reference doesn't change) and react only looks at its 'value' aka the reference, so nothing re-renders:
            //    setGlobals((previousGlobals) => { let newGlobals = previousGlobals; newGlobals.hideHamMenu = command.newVal; return newGlobals })
            // Correct, we create a whole new object and this forces a re-render:
            setGlobals((previousGlobals) => {
                const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
                newGlobals.hideHamMenu = command.newVal;
                return newGlobals
            })
        }

        if (command.cmd == 'addRestaurant') {
            const response = await fetch('/api/new-restaurant', {
                method: 'POST',
                body: JSON.stringify(command.newVal),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json(); // Should check here that it worked OK
            setGlobals((previousGlobals) => {
                const newGlobals = JSON.parse(JSON.stringify(previousGlobals))
                newGlobals.restaurants.push(data);
                return newGlobals;
            })
        }

        if (command.cmd == 'addMenuItem') {
            const response = await fetch('/api/new-menu', {
                method: 'POST',
                body: JSON.stringify(command.newVal),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
        }

        if (command.cmd == 'addOrder') {
            const response = await fetch('/api/new-order', {
                method: 'POST',
                body: JSON.stringify(command.newVal),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
        }

        if (command.cmd == 'findOrders') {
            const response = await fetch(`/api/get-order`, {
                method: 'POST',
                body: JSON.stringify(command.newVal),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return await response.json();
        }
    }

    const context = {
        updateGlobals: editGlobalData,
        theGlobalObject: globals,
        login: login,
    }

    return <GlobalContext.Provider value={context}>
        {props.children}
    </GlobalContext.Provider>
}


export default GlobalContext
