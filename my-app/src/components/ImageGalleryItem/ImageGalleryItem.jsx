import React from "react";
import PropTypes from 'prop-types';
import styles from "../ImageGallery/ImageGallery.module.css";

const ImageGalleryItem = ({ item, onClick}) => {
    return (
        <li
           onClick={() => onClick(item.id)}
           className={styles.ImageGalleryItem}
        >
           <img
             src={item.webformatURL}
             alt={item.tags}
             className={styles.ImageGalleryItemImage}
           />
        </li>
    );
};

ImageGalleryItem.propTypes = {
    item: PropTypes.shape({
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
      id: PropTypes.number,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;