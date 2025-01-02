import RestaurantDetail from '../../components/restaurant/RestaurantDetail'
import {useRouter} from 'next/router'
import GlobalContext from "../../pages/store/globalContext"
import {useContext} from 'react'

export default function () {
    const globalCtx = useContext(GlobalContext)
    const router = useRouter();

    async function addOrderHandler(order) {
        await globalCtx.updateGlobals({cmd: 'addOrder', newVal: order})
        router.push('/orders/' + order.username)
    }

    // Back to basics, a simple for loop. Also trim() comes into play as it usually does!
    let returnVal = null
    for (let ii = 0; ii < globalCtx.theGlobalObject.restaurants.length; ii++) {
        let temp = globalCtx.theGlobalObject.restaurants[ii]
        if (temp.restaurantId.trim() == router.query.restaurantId.trim()) {
            returnVal = <RestaurantDetail onSubmitOrder={addOrderHandler} image={temp.image} title={temp.title} description={temp.description} restaurantId={temp.restaurantId} />
        }
    }
    // In the real world, we'd put the code above in the store context module. 
    return returnVal
}
