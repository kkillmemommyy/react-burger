declare global {
  declare type AppState = import('../store').AppState;
  declare type AppDispatch = import('../store').AppDispatch;
}

export {}