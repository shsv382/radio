import searchfieldStyles from './search-field.module.scss';

export default function SearchField({ onChange }) {
    return (
        <input
            type='text'
            className={searchfieldStyles.searchField}
            onChange={onChange}
        ></input>
    )
}