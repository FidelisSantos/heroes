import { Icons } from "../../icons"
import THomeCardProps from "../../types/THomeCardProps"
import Card from "../../ui/Card"
import { Tooltip } from 'react-tooltip'

function HomeCard({
hero,
className,
onClick
}:THomeCardProps) {
    return (
        <Card className={`${className} ${hero.is_active ? 'active' : 'disabled'}`} >
            <>
                <img onClick={onClick} src={hero.avatar_url} alt="" className={`${className}__img ${hero.is_active ? 'active' : 'disabled'}`} data-tooltip-id={`open-hero-${hero.id}`}/>
                <Tooltip id={`open-hero-${hero.id}`} place="top" content="Ver Herói" />
            </>
            
            <div className={`${className}__content`}>
                <h2 className={`${className}__content__title`}>{hero.name}</h2>
                <div className={`${className}__content__actions`}>
                    { hero.is_active && (
                        <>
                            <Icons.EditHero data-tooltip-id={`edit-hero-${hero.id}`}/>
                            <Tooltip id={`edit-hero-${hero.id}`} place="top" content="Editar Herói" />
                        </>
                      
                    ) }
                    { hero.is_active ?  (
                        <>
                            <Icons.HeroLock data-tooltip-id={`lock-hero-${hero.id}`} color="#2c6b74"/>
                            <Tooltip id={`lock-hero-${hero.id}`} place="top" content="Desabilitar Herói" />
                        </>
                        
                        ) : (
                            <>
                                <Icons.HeroUnlock data-tooltip-id={`unlock-hero-${hero.id}`}/>
                                <Tooltip id={`unlock-hero-${hero.id}`} place="top" content="Habilitar Herói" />
                            </>
                        )
                    }
                    <>
                        <Icons.DeleteHero data-tooltip-id={`delete-hero-${hero.id}`} color="red"/>
                        <Tooltip id={`delete-hero-${hero.id}`} place="top" content="Excluir Herói" />
                    </>
                    
                </div>
                
            </div>
        </Card>
    )
}

export default HomeCard