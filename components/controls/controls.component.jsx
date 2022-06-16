import Head from "next/head";
import controlsStyles from './controls.module.scss';

export default function Controls() {
    return (
        <>
            <Head>
                <link href='https://css.gg/play-button-o.css' rel='stylesheet' />
                <link href='https://css.gg/heart.css' rel='stylesheet' />
            </Head>
            <div className={`${controlsStyles.controlsBlock}`}>
                <i className="gg-play-button-o"></i>
                <i className="gg-heart"></i>
                <i className="gg-play-button-o"></i>
                <i className="gg-heart"></i>
            </div>
        </>
    )
}