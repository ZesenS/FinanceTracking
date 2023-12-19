import mainCss from './main.module.css'

function Main() {

    return (
        <div className={mainCss.container}>
            <div className={mainCss.coin_body}>
                <div className={mainCss.inner_body}>
                    <div className={mainCss.eyes}>
                        <div id={mainCss.left_eye}>
                            <div className={mainCss.sclera}></div>
                        </div>
                        <div id={mainCss.right_eye}>
                            <div className={mainCss.sclera}></div>
                        </div>
                    </div>

                    <div className={mainCss.blash}>
                        <div id={mainCss.left_blash}></div>
                        <div id={mainCss.right_blash}></div>
                    </div>

                    <div className={mainCss.month}></div>
                </div>
            </div>
            {/* <div className={mainCss.hands} id={mainCss.left_hand}></div>
            <div className={mainCss.hands} id={mainCss.right_hand}></div>
            <div id={mainCss.left_leg}></div>
            <div id={mainCss.right_leg}></div> */}


        </div>
    )
}

export default Main