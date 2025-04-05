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
import useApp from "./useApp";

function useHero() {
  const dispatch = useDispatch();
  const { setLoading } = useApp();
  const { heroes, loading, pagination } = useSelector((state: RootState) => state.hero);

  const [hero, setHero] = useState<THeroResponse | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const loadHeroes = useCallback(
    (append = false) => {
      setLoading(true);
      dispatch(fetchHeroes({ page, search, append }) as any)
        .finally(() => setLoading(false));
    },
    [dispatch, page, search, setLoading]
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
    dispatch(createHero(heroData) as any);
  }

  function editHero(id: string, heroData: THeroRequest) {
    dispatch(updateHero({ id, hero: heroData }) as any);
  }

  function removeHero(id: string) {
    dispatch(deleteHero(id) as any);
  }

  function toggleHeroStatus(id: string, status: boolean) {
    dispatch(changeHeroStatus({ id, status }) as any);
  }

  function toggleModal(hero: THeroResponse | null) {
    setHero(hero);
    setOpenModal(!openModal);
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
    setSearch
  };
}

export default useHero;
