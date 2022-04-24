// test home  reducer
import { RootState } from "../../app/store";
import { resultMock } from "../../mocks/results";
import homeReducer, {
  HomeState,
  addFavorite,
  removeFavorite,
  setSearchQuery,
} from "./HomeSlice";

import {
  selectQuery,
  selectResults,
  selectFavorites,
  selectHomeStatus,
  selectFavoritesResults,
} from "./HomeSelectors";

describe("Home reducer", () => {
  const state: HomeState = {
    query: "",
    results: [],
    favorites: [],
    status: "idle",
  };
  it("should handle initial state", () => {
    const initialState: HomeState = state;
    const action = { type: "unknown" };
    const expectedState = initialState;
    expect(homeReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle setSearchQuery", () => {
    const initialState: HomeState = { ...state, query: "" };
    const action = setSearchQuery("test");
    const expectedState: HomeState = { ...state, query: "test" };
    expect(homeReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle addFavorite", () => {
    const initialState: HomeState = { ...state, favorites: [] };
    const action = addFavorite(1);
    const expectedState: HomeState = { ...state, favorites: [1] };
    expect(homeReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle removeFavorite", () => {
    const initialState: HomeState = { ...state, favorites: [1] };
    const action = removeFavorite(1);
    const expectedState: HomeState = { ...state, favorites: [] };
    expect(homeReducer(initialState, action)).toEqual(expectedState);
  });
});

describe("Home selectors", () => {
  const state: RootState = {
    home: {
      query: "",
      results: [resultMock],
      favorites: [1],
      status: "idle",
    },
  };

  it("should selectQuery", () => {
    const initialState: HomeState = state.home;
    const expectedState: HomeState = { ...state.home, query: "test" };
    expect(selectQuery({ ...state, home: initialState })).toEqual("");
    expect(selectQuery({ ...state, home: expectedState })).toEqual("test");
  });

  it("should selectResults", () => {
    const initialState: HomeState = state.home;
    const expectedState: HomeState = { ...state.home, results: [] };
    expect(selectResults({ ...state, home: initialState })).toEqual([
      resultMock,
    ]);
    expect(selectResults({ ...state, home: expectedState })).toEqual([]);
  });

  it("should selectHomeStatus", () => {
    const initialState: HomeState = state.home;
    const expectedState: HomeState = { ...state.home, status: "loading" };
    expect(selectHomeStatus({ ...state, home: initialState })).toEqual("idle");
    expect(selectHomeStatus({ ...state, home: expectedState })).toEqual(
      "loading"
    );
  });

  it("should selectFavorites", () => {
    const initialState: HomeState = state.home;
    const expectedState: HomeState = { ...state.home, favorites: [] };
    expect(selectFavorites({ ...state, home: initialState })).toEqual([1]);
    expect(selectFavorites({ ...state, home: expectedState })).toEqual([]);
  });

  it("should selectFavoritesResults", () => {
    const initialState: HomeState = state.home;
    const expectedState: HomeState = { ...state.home, favorites: [] };
    expect(selectFavoritesResults({ ...state, home: initialState })).toEqual([
      resultMock,
    ]);
    expect(selectFavoritesResults({ ...state, home: expectedState })).toEqual(
      []
    );
  });
});
