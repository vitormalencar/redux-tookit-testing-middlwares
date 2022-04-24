import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export const rootSelector = (state: RootState) => state.home;

export const selectQuery = createSelector(rootSelector, (state) => state.query);

export const selectResults = createSelector(
  rootSelector,
  (state) => state.results
);

export const selectFavorites = createSelector(
  rootSelector,
  (state) => state.favorites
);

export const selectHomeStatus = createSelector(
  rootSelector,
  (state) => state.status
);

export const selectFavoritesResults = createSelector(
  [selectFavorites, selectResults],
  (favorites, results) =>
    favorites.map((id) => results.find((result) => result.id === id))
);

export const selectFilteredResults = createSelector(
  [selectQuery, selectResults],
  (query, results) =>
    results.filter((result) =>
      result.place.toLowerCase().includes(query.toLowerCase())
    )
);
