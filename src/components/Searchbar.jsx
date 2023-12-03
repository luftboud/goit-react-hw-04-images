import PropTypes  from 'prop-types';
import css from './styles/Searchbar.module.css'
const Searchbar = ({ onSubmit }) => {
 function handleSearch (evt) {
    evt.preventDefault();
    const input = evt.currentTarget.elements[1];
    // console.log(input.value);
    onSubmit(input.value)
       evt.target.reset();
  };
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSearch}>
        <button type="submit" className={css.SearchForm_Button}>
          <span className={css.SearchForm_Button_Label}>Search</span>
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export { Searchbar };
