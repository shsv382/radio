import searchfieldStyles from './search-field.module.scss';

export default function SearchField({ onSearchFieldChange }) {
    return (
        <input
            type='text'
            className={searchfieldStyles.searchField}
            onChange={onSearchFieldChange}
        ></input>
    )
}