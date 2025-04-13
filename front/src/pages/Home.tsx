import HomeCard from "../components/Home/HomeCard";
import HomeHeader from "../components/Home/HomeHeader";
import HomeModal from "../components/Home/HomeModal";
import useHero from "../hooks/useHome"
import THeroRequest from "../types/THeroRequest";

function Home() {
    const {
      heroes,
      openModal,
      hero,
      toggleModal,
      addHero, 
      editHero,
      isEditing,
      loadHeroes,
      setSearch,
      removeHero,
      toggleHeroStatus} = useHero();
    return (
        <>
            <div className="home">
                <div className="home__header">
                    <HomeHeader 
                      className={"home__header"} 
                      openModal={()=> toggleModal(null, false)}
                      onClick={() => loadHeroes()}
                      onChange={(search: string) => setSearch(search)}
                      />
                </div>
                <div className="home__cards">
                    {
                        heroes.map((hero)=> 
                          <HomeCard 
                            key={hero.id} 
                            onClick={()=> toggleModal(hero, true) } 
                            hero={hero}
                            changeStaus={(id: string, status: boolean) => toggleHeroStatus(id, status)}
                            deleteHero={(id: string) => removeHero(id)}
                            className="home__cards__card"
                            />)
                    }
                </div>
            </div>
            {openModal && 
              <HomeModal 
              hero={hero} 
              onClick={()=> toggleModal(null, isEditing)} 
              isEditing={isEditing} 
              onSubmit={hero ? (data:THeroRequest, id?:string) => {editHero(id as string, data)} : (data: THeroRequest) => {addHero(data)}}/> }
        </>
        
    )
}

export default Home