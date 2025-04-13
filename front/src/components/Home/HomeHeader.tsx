import THomeHeaderProps from "../../types/THomeHeaderProps"
import Button from "../../ui/Buttons"
import SearchBar from "../../ui/SearchBar"

function HomeHeader({
className,
openModal,
onChange
}:THomeHeaderProps) {
    return (
        <div className={`${className}__content`}>
            <div className={`${className}__content__add`}>
              <Button 
                onClick={openModal} 
                className={`${className}__content__add__button_btn`} 
                color={"#56a292"}
                width="100px"
              >
                  Criar
              </Button>
            </div>
            <SearchBar 
              className={`${className}__content__search`} 
              placeholder={"Procurar herói"} 
              onChange={(search: string) => onChange(search)}
            />
        </div>
    )
}

export default HomeHeader