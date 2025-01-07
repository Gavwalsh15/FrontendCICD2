import Orders from '../../../components/restaurant/orders/Orders';
import GlobalContext from '../../store/globalContext';
import { useContext } from 'react';

export default function RestaurantPage() {
    const globalCtx = useContext(GlobalContext);

    async function addOrderHandler(order) {
        await globalCtx.updateGlobals({ cmd: 'findOrders', newVal: {username: globalCtx.theGlobalObject.user} });
        console.log(order);
    }

    return (
        <div>
            <Orders onAddOrder={addOrderHandler} />
        </div>
    );
}