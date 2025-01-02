import RestaurantList from "../components/restaurant/RestaurantList";
import {useContext} from "react";
import GlobalContext from "./store/globalContext"

function HomePage() {
    const globalCtx = useContext(GlobalContext)

    if (globalCtx.theGlobalObject.dataLoaded == true) {
        // return <MeetupList meetups={globalCtx.theGlobalObject.meetings} />
        return <RestaurantList restaurants={globalCtx.theGlobalObject.restaurants}/>
    }
    return <div>Loading data from database, please wait . . . </div>
}

export default HomePage;