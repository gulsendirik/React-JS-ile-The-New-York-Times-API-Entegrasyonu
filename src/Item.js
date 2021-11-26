import React from "react";

const Item = ({item}) => {
    return <div className="item">
        <img src={item.multimedia != null ? item.multimedia.src : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'} width={210} height={140} />
        <h3>{item.headline}</h3>
        <div className="info">
            <span>{item.byline}</span>
            <span>{item.publication_date}</span>
        </div>
        <p>{item.summary_short.substring(0,200)}</p>
        <a href={item.link.url} target="_blank">Bağlantıya Git</a>
    </div>
}

export default Item;