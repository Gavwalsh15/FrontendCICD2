// our-dimain.com/new-meetup
import {useRouter} from 'next/router';
import GlobalContext from "../../pages/store/globalContext"
import {useContext} from 'react'
import NewRestaurantForm from "../../components/restaurant/NewRestaurantForm";
import restaurantId from "../[restaurantId]";

function NewRestaurantPage() {
    const router = useRouter()
    const globalCtx = useContext(GlobalContext)

    async function addRestaurantHandler(enteredRestaurantData) {
        await globalCtx.updateGlobals({cmd: 'addRestaurant', newVal: enteredRestaurantData})
        router.push('/admin/' + enteredRestaurantData.title.toString().toLowerCase().replace(' ', ''));
    }

    return <NewRestaurantForm onAddResturant={addRestaurantHandler}/>
}

export default NewRestaurantPage