import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { 
  fetchHeroes, 
  createHero, 
  updateHero, 
  deleteHero, 
  changeHeroStatus 
} from "../store/hero/actions";
import THeroResponse from "../types/THeroResponse";
import THeroRequest from "../types/THeroRequest";

function useHero() {
  const dispatch = useDispatch();
  const { heroes, loading, pagination, error, errorMessage } = useSelector((state: RootState) => state.hero);

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

  async function addHero(heroData: THeroRequest) {
    const formattedHeroData = {
      ...heroData,
      date_of_birth: heroData.date_of_birth.split("/").reverse().join("-"),
    };
    await dispatch(createHero(formattedHeroData) as any);
    toggleModal(null, false);
    await dispatch(fetchHeroes({ page, search, append: false }) as any)
  }

  async function editHero(id: string, heroData: THeroRequest) {
    await dispatch(updateHero({ id, hero: heroData }) as any);
    toggleModal(null, false);
  }

  async function removeHero(id: string) {
    await dispatch(deleteHero(id) as any);
    const newPage = (pagination.total - 1) <= (page - 1) * 10 && page > 1 ? page - 1 : page;
    setPage(newPage);
    await dispatch(fetchHeroes({ page, search, append: false }) as any)
  }

  async function toggleHeroStatus(id: string, status: boolean) {
    await dispatch(changeHeroStatus({ id, status }) as any);
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
    loadHeroes,
    setPage,
    pagination,
    page,
    error
  };
}

export default useHero;
