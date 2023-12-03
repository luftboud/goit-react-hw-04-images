import { Component } from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Rings } from 'react-loader-spinner';
import { Modal } from './Modal';
import css from './styles/App.module.css'
const API_KEY = '36975406-14cef0b651718033f414d4154';
axios.defaults.baseURL = 'https://pixabay.com/api';
class App extends Component {
  state = {
    q: 'random',
    page: 1,
    hits: [],
    loader_boolean: false,
    button_display: "unvisible",
    modal_img: "",
    showModal: false
  };
  handleSearch = (q) => {
    this.setState({ q: q, hits: [], page: 1 });
  };
  handleLoad = () => {
    this.setState({ page: this.state.page + 1 });
  };
  showModal = (img) => {
    console.log(img);
    this.setState({ modal_img: img, showModal: true})
    }
  hideModal = () => {
    this.setState({showModal: false})
  }
  async componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page || this.state.q !== prevState.q) {
      this.setState({loader_boolean: true})
          console.log(this.state.page);
      const response = await axios.get(
        `/?key=${API_KEY}&q=${this.state.q}&page=${this.state.page}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const hits = response.data.hits;
      this.setState(prevState => ({
        hits: [...prevState.hits, ...hits],
      }));
      this.setState({ loader_boolean: false })
      if (this.state.hits.length + hits.length >= this.state.page * 12) {
      this.setState({button_display: "visible"})
      } else {
      this.setState({button_display: "unvisible"})
      }   
    }
  }
  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearch}></Searchbar>
        <Rings
          height="160"
          width="160"
          color="#3f51b5"
          radius="6"
          wrapperStyle={{ margin: "auto", paddingTop: 310}}
          wrapperClass=""
          visible={this.state.loader_boolean}
          ariaLabel="rings-loading"
        />
        <ImageGallery hits={this.state.hits} onClick={this.showModal}></ImageGallery>
        <Button onClick={this.handleLoad} display={this.state.button_display}></Button>
        {this.state.showModal && <Modal img={this.state.modal_img}  onClick={this.hideModal}></Modal>}
      </div>
    );
  }
}
export { App };
