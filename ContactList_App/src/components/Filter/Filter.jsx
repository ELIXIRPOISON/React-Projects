import propTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ filter, handleChange }) => (
  <div>
    <label className={css.formLabel}>
      Find contacts by name
    </label>
    <input
      className={css.filterInput}
      type='text'
      name='filter'
      placeholder='Enter filter'
      value={filter}
      onChange={handleChange}
    />
  </div>
);

Filter.propTypes = {
  filter: propTypes.string.isRequired,
  handleChange: propTypes.func.isRequired,
};
