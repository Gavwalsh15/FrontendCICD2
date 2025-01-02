import classes from './RestaurantDetail.module.css';
import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from "../../pages/store/globalContext";

function RestaurantDetail(props) {
    const globalCtx = useContext(GlobalContext);
    const [order, setOrder] = useState({
        restaurantId: '',
        username: '',
        foodselected: [],
        totalprice: 0
    });
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [menuItems, setMenuItems] = useState([]); // Holds menu items fetched from API
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch menu items on component mount
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/restaurant/getMenu/${props.restaurantId}`, {
                    method: 'GET', // Assuming GET, change if necessary
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch menu items');
                }

                const data = await response.json();
                setMenuItems(data); // Store the fetched menu items in state
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMenuItems();
    }, [props.restaurantId]); // Re-fetch if the restaurantId changes

    // Handle item quantity change
    const handleQuantityChange = (quantity, name, price) => {
        setOrder((prevState) => {
            const existingItemIndex = prevState.foodselected.findIndex(item => item.name === name);
            let updatedFoodSelected;

            if (existingItemIndex >= 0) {
                updatedFoodSelected = [...prevState.foodselected];
                updatedFoodSelected[existingItemIndex] = {
                    ...updatedFoodSelected[existingItemIndex],
                    quantity,
                    total: quantity * price
                };
            } else {
                updatedFoodSelected = [
                    ...prevState.foodselected,
                    { name, price, quantity, total: quantity * price }
                ];
            }

            const newTotalPrice = updatedFoodSelected.reduce((acc, item) => acc + item.total, 0);

            return {
                ...prevState,
                foodselected: updatedFoodSelected,
                totalprice: newTotalPrice
            };
        });
    };

    // Handle order submission
    const submitHandler = (event) => {
        event.preventDefault();
        if (!globalCtx.theGlobalObject.user) {
            alert("Please Login before entering order");
            return;
        }
        if (!order.foodselected[0]) {
            alert("Order is empty");
            return;
        }
        order.restaurantId = props.restaurantId; // Pass correct restaurantId
        order.username = globalCtx.theGlobalObject.user;
        console.log('Order submitted:', order);
        props.onSubmitOrder(order);
    };

    // Generate unique categories
    const uniqueCategories = ['All', ...new Set(menuItems.map(item => item.category))];

    return (
        <section className={classes.orderPage}>
            <div className={classes.imageContainer}>
                <img src={props.image} alt={props.title} />
            </div>
            <div className={classes.textContainer}>
                <p>{props.description}</p>
            </div>
            <h1 className={classes.header}>Order from {props.title}</h1>

            {/* Category Filter */}
            <div className={classes.categoryFilterContainer}>
                <label htmlFor="categoryFilter">Filter by Category:</label>
                <select id="categoryFilter" value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}>
                    {uniqueCategories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            {/* Loading and Error Handling */}
            {isLoading ? (
                <p>Loading menu...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <form className={classes.orderForm} onSubmit={submitHandler}>
                    <div className={classes.menuList}>
                        {menuItems
                            .filter(menuItem => selectedCategory === 'All' || menuItem.category === selectedCategory)
                            .map((menuItem, index) => {
                                const currentOrder = order.foodselected.find(item => item.name === menuItem.name) || { quantity: 0 };

                                return (
                                    <div key={index} className={classes.menuItem}>
                                        <p>Category: {menuItem.category}</p>
                                        <p>Name: {menuItem.name}</p>
                                        <p>Price: ${parseFloat(menuItem.price).toFixed(2)}</p>
                                        <label>
                                            Quantity:
                                            <input
                                                className={classes.quantityInput}
                                                type="number"
                                                min="0"
                                                value={currentOrder.quantity}
                                                onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 0, menuItem.name, menuItem.price)}
                                            />
                                        </label>
                                    </div>
                                );
                            })
                        }
                    </div>

                    <h2 className={classes.subheader}>Order Summary</h2>
                    <ul>
                        {order.foodselected.filter(item => item.quantity > 0).map((item, index) => (
                            <li key={index}>
                                {item.quantity} x {item.name}
                            </li>
                        ))}
                    </ul>
                    <p>Total Price: ${order.totalprice.toFixed(2)}</p>
                    <div className={classes.actions}>
                        <button type="submit">Submit Order</button>
                    </div>
                </form>
            )}
        </section>
    );
}

export default RestaurantDetail;
