import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';

const loadState = () => {
  try {
      const serializedState = sessionStorage.getItem("reduxState");
      return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
      console.error("Error cargando el estado", err);
      return undefined;
  }
};

const saveState = (state) => {
  try {
      const serializedState = JSON.stringify(state);
      sessionStorage.setItem("reduxState", serializedState);
  } catch (err) {
      console.error("Error guardando el estado", err);
  }
};

const preloadedState = loadState();

export const store = configureStore({
    reducer: rootReducer,
    preloadedState,
});

store.subscribe(() => {
    saveState(store.getState());
});