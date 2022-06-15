import searchfieldStyles from './search-field.module.scss';

export default function SearchField() {
    return (
        <input
            type='text'
            className={searchfieldStyles.searchField}
        ></input>
    )
}