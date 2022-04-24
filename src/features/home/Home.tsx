import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchResults, setSearchQuery } from "./HomeSlice";
import { selectHomeStatus } from "./HomeSelectors";

import { Search } from "../../components/Search";
import { Loader } from "../../components/Loader";
import { ItemList } from "../../components/ItemList";

const styles = {
  container: "px-28 py-8",
  search: "flex items-center",
  actionsButton:
    "py-2 px-4 h-12 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline",
};

export default function Home() {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const status = useAppSelector(selectHomeStatus);
  const [favoriteFilter, setFavoriteFilter] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchResults());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSearchQuery(search));
  }, [search, dispatch]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <Search onChangeHandle={handleSearch} />
        <button
          className={styles.actionsButton}
          onClick={() => setFavoriteFilter(!favoriteFilter)}
        >
          {favoriteFilter ? "Show All" : "Show Favorites"}
        </button>
      </div>
      <ItemList favoriteFilter={favoriteFilter} />
    </div>
  );
}
