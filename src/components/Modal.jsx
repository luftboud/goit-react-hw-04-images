import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './styles/Modal.module.css'
const Modal = ({ img, onClick }) => {
    function modalClick(evt) {
        evt.preventDefault();
        onClick()
    }
    function escape(evt) {
        evt.preventDefault();
            if (evt.key === "Escape") {
            onClick()
            }
    }
     useEffect(() => {
    document.addEventListener('keydown', escape);

    return () => {
      document.removeEventListener('keydown', escape);
    };
  }); 
    return (
        <div className={css.Overlay} onClick={modalClick}>
            <div className={css.Modal}>
                <img src={img.src} alt={img.alt} className={css.Image} />
            </div>
        </div>)
};
Modal.propTypes = {
    img: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};
export { Modal };