import {useRouter} from "next/router";
import Link from 'next/link';
import GlobalContext from "../../pages/store/globalContext";
import {useContext} from "react";
import classes from "../../components/restaurant/RestaurantDetail.module.css";

export default function RestaurantPage() {
    const router = useRouter();
    const {restaurantId} = router.query;
    const globalCtx = useContext(GlobalContext);
    let restaurant = {};

    globalCtx.theGlobalObject.restaurants.forEach(element => {
        if (element.restaurantId === restaurantId) {
            restaurant = element;
        }
    });

    return (
        <div className={classes.orderPage}>
            <div className={classes.imageContainer}>
                <img src={restaurant.image} alt={restaurant.title} className={classes.detail}/>
            </div>
            <div className={classes.textContainer}>
                <h1 className={classes.header}>Restaurant Details</h1>
                <p>Restaurant ID: {restaurantId}</p>
                <p className={classes.address}>Restaurant Type: {restaurant.foodType}</p>
                <p className={classes.address}>Restaurant Address: {restaurant.address}</p>
            </div>

            <h2 className={classes.subheader}>Menu</h2>
            <ul className={classes.menuList}>
                {restaurant.menuItems && restaurant.menuItems.map((menuItem, index) => (
                    <ul key={index} className={classes.menuItem}>
                        <p>Name: {menuItem.name}</p>
                        <p>Category: {menuItem.category}</p>
                        <p>Price: ${parseFloat(menuItem.price).toFixed(2)}</p>
                    </ul>
                ))}
            </ul>


            <div className={classes.textContainer}>
                <Link href={`/admin/${restaurantId}/add_menu`}>
                    <a className={classes.header}>Add Menu Item</a>
                </Link>
            </div>
        </div>
    );
}