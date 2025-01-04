import {useContext} from 'react';
import {useRouter} from "next/router";
import GlobalContext from "../../../store/globalContext"
import NewMenuItemForm from "../../../../components/restaurant/menus/NewMenuForm";

export default function RestaurantPage() {
    const router = useRouter()
    const {restaurantId} = router.query
    const globalCtx = useContext(GlobalContext)


    async function addMenuItemHandler(menuItemData) {
        const newMenuItemData = {
            ...menuItemData,
            restaurantId: restaurantId  // Use the restaurantId from the router query
        };

        await globalCtx.updateGlobals({cmd: 'addMenuItem', newVal: newMenuItemData})
        router.push('/admin/' + restaurantId);
    }

    return (
        <div>
            <h1>Add a New Menu Item</h1>
            <NewMenuItemForm onAddMenuItem={addMenuItemHandler}/>
        </div>
    );
}