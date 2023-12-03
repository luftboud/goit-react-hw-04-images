import PropTypes from 'prop-types';
import css from './styles/ImageGalleryItem.module.css'
const ImageGalleryItem = ({ src, alt }) => {
  return (
    <li className={css.ImageGalleryItem} >
      <img className={css.ImageGalleryItem_image} src={src} alt={alt} />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};
export { ImageGalleryItem };
