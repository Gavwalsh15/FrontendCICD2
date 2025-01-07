import classes from './Orders.module.css';
import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from "../../../pages/store/globalContext";

function OrdersDetail(props) {
    const globalCtx = useContext(GlobalContext);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch orders using global context
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Call updateGlobals to fetch the orders using the user's username
                const fetchedOrders = await globalCtx.updateGlobals({
                    cmd: 'findOrders',
                    newVal: { username: globalCtx.theGlobalObject.user }
                });

                setOrders(fetchedOrders); // Update state with fetched orders
            } catch (error) {
                setError('Failed to fetch orders');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [globalCtx]); // Re-fetch orders if the global context changes

    return (
        <section className={classes.ordersPage}>
            <h1 className={classes.header}>Your Orders</h1>

            {/* Loading and Error Handling */}
            {isLoading ? (
                <p>Loading your orders...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className={classes.ordersList}>
                    {orders.length === 0 ? (
                        <p>No orders available.</p>
                    ) : (
                        orders.map((order, index) => (
                            <div key={index} className={classes.orderItem}>
                                <h2>Restaurant: {order.restaurantId}</h2>
                                <p>Status: {order.status}</p>
                                <p>Address: {order.customerAddress}</p>
                                <ul>
                                    {order.foodSelected.map((food, foodIndex) => (
                                        <li key={foodIndex}>
                                            {food.quantity || 0} x {food.name} (${food.price} each)
                                        </li>
                                    ))}
                                </ul>
                                <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </section>
    );
}

export default OrdersDetail;
