import {useRef} from 'react';
import Card from '../../ui/Card';
import classes from './NewMenuForm.module.css';

function NewMenuItemForm(props) {
    const nameInputRef = useRef();
    const priceInputRef = useRef();
    const categoryInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredPrice = priceInputRef.current.value;
        const enteredCategory = categoryInputRef.current.value;

        const menuItemData = {
            name: enteredName,
            price: enteredPrice,
            category: enteredCategory
        };

        props.onAddMenuItem(menuItemData);
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='name'>Item Name</label>
                    <input type='text' required id='name' ref={nameInputRef}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='price'>Price</label>
                    <input type='number' required id='price' ref={priceInputRef} step="0.01"/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='category'>Category</label>
                    <select id='category' required ref={categoryInputRef}>
                        <option value="">Select a category</option>
                        <option value="Drink">Drink</option>
                        <option value="Starter">Starter</option>
                        <option value="Main">Main</option>
                        <option value="Desert">Desert</option>
                    </select>
                </div>
                <div className={classes.actions}>
                    <button>Add Menu Item</button>
                </div>
            </form>
        </Card>
    );
}

export default NewMenuItemForm;