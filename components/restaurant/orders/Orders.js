import Card from '../../ui/Card';
import classes from './Orders.module.css';
import {useContext} from "react";
import GlobalContext from "../../../pages/store/globalContext";

function Orders(props) {
    const globalCtx = useContext(GlobalContext)
    let orders;

    async function fetchOrdersHandler() {
        orders = await globalCtx.updateGlobals({ cmd: 'findOrders', newVal: {username: globalCtx.theGlobalObject.user} });

    }

    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.image}>
                    <img src={props.image} alt={props.title}/>
                </div>
                <div className={classes.content}>
                    <h2>{props.title}</h2>
                    <address>{props.address}</address>
                    <h3>{props.foodType}</h3>
                </div>
                <div className={classes.actions}>
                    <button onClick={fetchOrdersHandler}>Show Orders</button>
                    <ul className={classes.orderList}>
                        {props.orders && props.orders.length > 0
                            ? props.orders.map((order) => (
                                  <li key={order.id}>
                                      {order.itemName} - {order.quantity}
                                  </li>
                              ))
                            : <li>No orders available.</li>}
                    </ul>
                </div>
            </Card>
        </li>
    );
}

export default Orders;
