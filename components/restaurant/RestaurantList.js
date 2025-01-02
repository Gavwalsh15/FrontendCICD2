import RestaurantItem from './RestaurantItem';
import classes from './RestaurantList.module.css';

function RestaurantList(props) {
    console.log(props)
    return (
        <ul className={classes.list}>
            {props.restaurants.map((restaurant) => (
                <RestaurantItem
                    key={restaurant._id}
                    id={restaurant.restaurantId}
                    image={restaurant.image}
                    title={restaurant.title}
                    foodType={restaurant.foodType}
                    address={restaurant.address}
                    menuItems={restaurant.menuItems}
                />
            ))}
        </ul>
    );
}

export default RestaurantList;
