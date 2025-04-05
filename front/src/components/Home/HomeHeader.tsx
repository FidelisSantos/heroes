import THomeHeaderProps from "../../types/THomeHeaderProps"
import Button from "../../ui/Buttons"
import SearchBar from "../../ui/SearchBar"

function HomeHeader({
onClick,
className,
openModal
}:THomeHeaderProps) {
    return (
        <div className={`${className}__content`}>
            <div className={`${className}__content__add`}>
                <Button 
                    onClick={openModal} 
                    className={`${className}__content__button_btn`} 
                    color={"#e0eff1"}
                    width="100px"
                >
                    Criar
                </Button>
            </div>
            <SearchBar className={`${className}__content__search`} placeholder={"Procurar herói"}/>
            <div className={`${className}__content__button`}>
                <Button 
                    onClick={onClick} 
                    className={`${className}__content__button_btn`} 
                    color={"#56a292"}
                    width="100px"
                >
                    Pesquisar
                </Button>
            </div>
            
        </div>
    )
}

export default HomeHeader