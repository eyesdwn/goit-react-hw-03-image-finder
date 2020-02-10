import React, { Component } from "react";
import styles from "./Modal.module.css";
import PropTypes from "prop-types";

export default class Modal extends Component {
    static propTypes = {
        onCloseModal: PropTypes.func.isRequired,
        imageId: PropTypes.number.isRequired,
        images: PropTypes.array.isRequired,
    };

    componentDidMount() {
        window.addEventListener('keydown', this.handleESC);
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleESC);
    };

    handleESC = e => {
        if(e.keyCode === 27) {
            this.props.onCloseModal();
        }
    };


    render() {
        const { imageId, images, onCloseModal } = this.props;

        const largeImage = images.find(image => {
            if (image.id === imageId) {
                return image.largeImageURL;
            }
        });

        return (
            <div className={styles.Overlay} onClick={onCloseModal}>
              <div className={styles.Modal}>
                <img src={largeImage.largeImageURL} alt={largeImage.tags} />
              </div>
            </div>
        );
    };
}
