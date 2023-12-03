import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem'
import css from './styles/ImageGallery.module.css'
const ImageGallery = ({ hits, onClick }) => {
  function showModal(evt) {
    evt.preventDefault();
    const item = evt.target;
    if (item.src !== undefined) {
      onClick(item)
    }
  }
  return (
    <ul className={css.ImageGallery} onClick={showModal}>
      {hits.map(h => (
        <ImageGalleryItem src={h.webformatURL} alt={h.tags} key={h.id}  />
      ))}
    </ul>
  );
};
ImageGallery.propTypes = {
  hits: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
export { ImageGallery };