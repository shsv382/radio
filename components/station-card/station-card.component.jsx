import cardStyles from './station-card.module.scss';
import Image from 'next/image';

export default function StationCard({ id, name, thumbnailUrl, style, onClick, isFiltered }) {
    return (
        <li 
            onClick={onClick} 
            className={`${cardStyles.radioStationCard} 
                        ${!!isFiltered && cardStyles.actionFilter}`} 
            style={{ ...style, backgroundColor: `url(${thumbnailUrl})` }} 
        >
            { !!thumbnailUrl && <img src={thumbnailUrl} /> }
    { /* !thumbnailUrl && <span style={{width: "90%", margin: "auto"}}>{name}</span> */ }
            <span style={{width: "90%", margin: "auto"}}>{
                name.length > 8 ? name.slice(0, 6) + "..." : name
            }</span>
        </li>
    )
}
