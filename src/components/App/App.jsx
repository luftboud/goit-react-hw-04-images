import { useState, useEffect } from 'react';
import axios from 'axios';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Rings } from 'react-loader-spinner';
import { Modal } from '../Modal/Modal';
import css from './App.module.css'
const API_KEY = '36975406-14cef0b651718033f414d4154';
axios.defaults.baseURL = 'https://pixabay.com/api';

const App = () =>  {

  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [loader_boolean, setBoolean] = useState(false);
  const [button_display, setButton] = useState("unvisible");
  const [modal_img, setImg] = useState("");
  const [modal_display, setModal] = useState(false);
  
  const handleSearch = (q) => {
    setQ(q)
    setHits([])
    setPage(1)
  };
  const handleLoad = () => {
    setPage(page+1)
  };
  const showModal = (img) => {
    console.log(img);
    setImg(img)
    setModal(true)
  }
  const hideModal = () => {
    setModal(false)
  }

  useEffect(() => {
    if (!q) return;
  const fetchData = async () => {
    try {
      setBoolean(true);
      setButton("unvisible");
      console.log(page);

      const response = await axios.get(
        `/?key=${API_KEY}&q=${q}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const new_hits = response.data.hits;
      setHits((prevHits) => 
        [...prevHits, ...new_hits]
      );
      setBoolean(false);
      setButton(page < Math.ceil(response.data.totalHits / 12) ? "visible" : "unvisible" )
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, [page, q]);
    return (
      <div className={css.app}>
        <Searchbar onSubmit={handleSearch}></Searchbar>
        <Rings
          height="160"
          width="160"
          color="#3f51b5"
          radius="6"
          wrapperStyle={{ margin: "auto", paddingTop: 310}}
          wrapperClass=""
          visible={loader_boolean}
          ariaLabel="rings-loading"
        />
        <ImageGallery hits={hits} onClick={showModal}></ImageGallery>
        <Button onClick={handleLoad} display={button_display}></Button>
        {modal_display && <Modal img={modal_img}  onClick={hideModal}></Modal>}
      </div>
    );
  }

export { App };
