import {useRef} from 'react';
import Card from '../ui/Card';
import classes from './NewRestaurantForm.module.css';

function NewRestaurantForm(props) {
    const titleInputRef = useRef();
    const imageInputRef = useRef();
    const addressInputRef = useRef();
    const descriptionInputRef = useRef();
    const foodTypeRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredImage = imageInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const enteredFoodType = foodTypeRef.current.value;


        const restaurantData = {
            title: enteredTitle,
            image: enteredImage,
            address: enteredAddress,
            foodType: enteredFoodType,
            description: enteredDescription
        };

        props.onAddResturant(restaurantData);
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='title'>Restaurant Name (Must be unique)</label>
                    <input type='text' required id='title' ref={titleInputRef}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='image'>Restaurant Logo Link</label>
                    <input type='url' required id='image' ref={imageInputRef}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='address'>Address</label>
                    <input type='text' required id='address' ref={addressInputRef}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        id='description'
                        required
                        rows='5'
                        ref={descriptionInputRef}
                    ></textarea>
                </div>
                <div className={classes.control}>
                    <label htmlFor='foodType'>Food Type</label>
                    <input type='text' required id='foodType' ref={foodTypeRef}/>
                </div>
                <div className={classes.actions}>
                    <button>Add Restaurant</button>
                </div>
            </form>
        </Card>
    );
}

export default NewRestaurantForm;
