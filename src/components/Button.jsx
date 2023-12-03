import PropTypes from 'prop-types';
import css from './styles/Button.module.css'
const Button = ({ onClick, display }) => {
  return (
    <button type="button" onClick={onClick} className={`${css.Button} ${display}`}>
      Load more
    </button>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  display: PropTypes.string.isRequired
}
export { Button };
