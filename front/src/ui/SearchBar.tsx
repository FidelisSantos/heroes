import { Icons } from "../icons";
import TSearchBarProps from "../types/TSearchBarProps";

function SearchBar({className, placeholder}:TSearchBarProps) {
    return (
        <div className={`searchBar ${className}`}>
            <input type="text" className={`searchBar__input ${className}__input`} placeholder={placeholder}/>
            <div className={`searchBar__icon ${className}__icon`}>
                <Icons.Search/>
            </div>
        </div>
    )
}

export default SearchBar;