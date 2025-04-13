import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store"; // Ajuste conforme sua estrutura
import { 
  fetchHeroes, 
  createHero, 
  updateHero, 
  deleteHero, 
  changeHeroStatus 
} from "../store/hero/actions"; // Ajuste para importar da store Redux
import THeroResponse from "../types/THeroResponse";
import THeroRequest from "../types/THeroRequest";

function useHero() {
  const dispatch = useDispatch();
  const { heroes, loading, pagination } = useSelector((state: RootState) => state.hero);

  const [hero, setHero] = useState<THeroResponse | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const loadHeroes = useCallback(
    (append = false) => {
      dispatch(fetchHeroes({ page, search, append }) as any)
    },
    [dispatch, page, search]
  );

  useEffect(() => {
    loadHeroes();
  }, [loadHeroes]);

  function fetchMoreHeroes() {
    if (pagination.page && pagination.lastPage && pagination.page < pagination.lastPage) {
      setPage((prevPage) => prevPage + 1);
      loadHeroes(true);
    }
  }

  function addHero(heroData: THeroRequest) {
    const formattedHeroData = {
      ...heroData,
      date_of_birth: heroData.date_of_birth.split("/").reverse().join("-"), // Converte DD/MM/YYYY → YYYY-MM-DD
    };
  
    dispatch(createHero(formattedHeroData) as any);
    fetchHeroes({ page: 1, search: "", append: false });
    toggleModal(null, false);
  }

  function editHero(id: string, heroData: THeroRequest) {
    dispatch(updateHero({ id, hero: heroData }) as any);

    toggleModal(null, false);
  }

  function removeHero(id: string) {
    dispatch(deleteHero(id) as any);
  }

  function toggleHeroStatus(id: string, status: boolean) {
    dispatch(changeHeroStatus({ id, status }) as any);
  }

  function toggleModal(hero: THeroResponse | null, isEditingHero: boolean) {
    setHero(hero);
    setOpenModal(!openModal);
    setIsEditing(isEditingHero);
  }

  return {
    heroes,
    loading,
    hero,
    openModal,
    toggleModal,
    fetchMoreHeroes,
    addHero,      
    editHero,     
    removeHero,  
    toggleHeroStatus,
    setSearch,
    isEditing,
    loadHeroes
  };
}

export default useHero;
