import HomeCard from "../components/Home/HomeCard";
import HomeHeader from "../components/Home/HomeHeader";
import HomeModal from "../components/Home/HomeModal";
import useHero from "../hooks/useHome"

function Home() {
    const {heroes, openModal, hero, toggleModal} = useHero();
    return (
        <>
            <div className="home">
                <div className="home__header">
                    <HomeHeader className={"home__header"} openModal={()=> toggleModal(null)}/>
                </div>
                <div className="home__cards">
                    {
                        heroes.map((hero)=><HomeCard key={hero.id} onClick={()=> toggleModal(hero) } hero={hero} className="home__cards__card"/>)
                    }
                </div>
            </div>
            {openModal && <HomeModal hero={hero} onClick={()=> toggleModal(null)}/> }
        </>
        
    )
}

export default Home