import axios from 'axios';

const BASE_URL = "https://pixabay.com/api/";
const key = "15175045-77baaaeb3714f44ae698d8195";

export const fetchImages = (query, page ) => axios.get(`${BASE_URL}?q=${query}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`);
