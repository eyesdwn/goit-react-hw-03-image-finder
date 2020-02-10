import React, { Component } from "react";
import * as imageAPI from "../../helpers/imageAPI";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";
import ErrorNotification from "../ErrorNotification/ErrorNotification";
import styles from "./App.module.css";


export default class App extends Component {
    state = {
        isLoading: false,
        query: '',
        images: [],
        error: null,
        page: 1,
        isModalOpen: false,
        imageId: null,
    };

    componentDidUpdate(prevProps, prevState) {
        const { page, query, images } = this.state;

        if (prevState.query !== query || prevState.page !== page) {
            this.fetchImages(query, page);
        };

        if (prevState.images !== images && images.length > 12) {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
            });
        };
    };

    fetchImages = (query, page) => {
        this.setState({ isLoading: true});

        imageAPI
           .fetchImages(query, page)
           .then(res => this.setState(prevState => ({
               images: [...prevState.images, ...res.data.hits],
           })),
           )
           .catch(error => this.setState({error}))
           .finally(() => this.setState({ isLoading: false}));
    };

    handleSubmit = query => {
        this.setState({
            query,
            images: [],
            page: 1
        });
    };

    onLoadMore = () => {
      const { page } = this.state;

      this.setState({
          page: page + 1,
          isLoading: true,
        });
    };

    handleOpenModal = id => {
        this.setState({
          isModalOpen: true,
          imageId: id,
        });
    };

    handleCloseModal = e => {
        this.setState({
          isModalOpen: false,
          imageId: '',
        });
    };


    render() {
        const { images, isLoading, error, isModalOpen, imageId } = this.state;

        return (
            <div className={styles.App}>
                <Searchbar onSubmit={this.handleSubmit} />
                {isModalOpen && <Modal imageId={imageId} images={images} onCloseModal={this.handleCloseModal} />}
                <ImageGallery items={images} openModal={this.handleOpenModal} />
                {error && <ErrorNotification text={error.message} />}
                {isLoading && <Loader />}
                {images.length > 0 && <Button onLoadMore={this.onLoadMore} />}

            </div>
        );
    };
}