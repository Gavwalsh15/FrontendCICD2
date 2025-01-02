import classes from './HamMenuContent.module.css'
import {useRouter} from 'next/router'
import {useContext, useState} from 'react'
import GlobalContext from "../../pages/store/globalContext"

export default function HamMenuContent(props) {
    const globalCtx = useContext(GlobalContext)
    const router = useRouter()
    let [popupToggle, setPopupToggle] = useState(false)

    if (globalCtx.theGlobalObject.hideHamMenu) {
        return null
    }

    function clicked(webAddress) {
        globalCtx.updateGlobals({cmd: 'hideHamMenu', newVal: true})
        router.push(webAddress)
    }

    function closeMe() {
        globalCtx.updateGlobals({cmd: 'hideHamMenu', newVal: true})
        if (popupToggle == true) {
            setPopupToggle(false)
        } else {
            setPopupToggle(true)
        }
    }

    let contentJsx = props.contents.map((item, index) => (
        <div key={index}>
            <div className={classes.menuItem} onClick={() => clicked(item.webAddress)}>{item.title} </div>
        </div>
    ))

    return (
        <div className={classes.background} onClick={() => closeMe()}>
            <div className={classes.mainContent}>
                <h2 className={classes.menuItem} onClick={() => router.push('/')}>Restaurants</h2>
                {contentJsx}
                {globalCtx.theGlobalObject.user ? (
                    <h2 className={classes.menuItem}>{globalCtx.theGlobalObject.user}</h2>
                ) : (
                    <h2 className={classes.menuItem} onClick={() => router.push('/login')}>Login</h2>
                )}

            </div>
        </div>
    );
}
