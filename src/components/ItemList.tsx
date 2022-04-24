import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectFavorites,
  selectFilteredResults,
} from "../features/home/HomeSelectors";
import { addFavorite, removeFavorite } from "../features/home/HomeSlice";
import { Item } from "./Item";

export const ItemList = ({ favoriteFilter }: { favoriteFilter: boolean }) => {
  const dispatch = useAppDispatch();
  const results = useAppSelector(selectFilteredResults);
  const favoriteIdsList = useAppSelector(selectFavorites);

  const isInFavorites = (id: number) => {
    return favoriteIdsList.includes(id);
  };
  const resultsList = favoriteFilter
    ? results.filter((result) => isInFavorites(result.id))
    : results;

  const handleToggleFavorite = (id: number) => {
    favoriteIdsList.includes(id)
      ? dispatch(removeFavorite(id))
      : dispatch(addFavorite(id));
  };

  return (
    <ul data-testid="result-list">
      {resultsList.length === 0 && (
        <div className="py-2">
          <div className="p-4 bg-white rounded-lg ">
            <div className="text-center text-xl">No results found</div>
          </div>
        </div>
      )}
      {resultsList.map((result, index) => (
        <li key={index}>
          <Item
            name={result.name}
            title={result.place}
            image={result.image}
            price={result.price}
            isFavorite={isInFavorites(result.id)}
            onCLickHandle={() => handleToggleFavorite(result.id)}
          />
        </li>
      ))}
    </ul>
  );
};
