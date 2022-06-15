import cardStyles from './station-card.module.scss';
import Image from 'next/image';

export default function StationCard({ id, name, thumbnailUrl, style }) {
    return (
        <li className={`${cardStyles.radioStationCard}`} style={{ ...style, backgroundColor: `url(${thumbnailUrl})` }} >
            { !!thumbnailUrl && <img src={thumbnailUrl} /> }
            { !thumbnailUrl && <span style={{width: "90%", margin: "auto"}}>{name}</span> }
        </li>
    )
}
