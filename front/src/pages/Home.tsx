import HomeCard from "../components/Home/HomeCard";
import HomeHeader from "../components/Home/HomeHeader";
import HomeModal from "../components/Home/HomeModal";
import useHero from "../hooks/useHome"
import { Icons } from "../icons";
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
      toggleHeroStatus,
      setPage,
      pagination,
      page,
      error
    } = useHero();
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
                  heroes.slice(0, 10).map((hero)=> 
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
              { pagination.lastPage && pagination.lastPage > 1 &&
                <div className="home__pagination">
                  { page >= pagination.lastPage &&
                    <div onClick={() => setPage(page - 1)} className="home__pagination__icon">
                      <Icons.PrevPage/>
                    </div>
                  }
                  {
                    Array.from({ length: pagination.lastPage }, (_, index) => {
                      const pageNumber = index + 1;
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setPage(pageNumber)}
                          className={`home__pagination__button ${page === pageNumber ? "active" : ""}`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })
                  }
                  { page < pagination.lastPage &&
                    <div onClick={() => setPage(page + 1)} className="home__pagination__icon">
                      <Icons.NextPage/>
                    </div>
                  }
                </div>
              }
              
          </div>
          {openModal && 
            <HomeModal 
            hero={hero} 
            onClick={()=> toggleModal(null, isEditing)} 
            isEditing={isEditing} 
            onSubmit={hero ? (data:THeroRequest, id?:string) => {editHero(id as string, data)} : (data: THeroRequest) => {addHero(data)}}
          /> }
        </>
        
    )
}

export default Home