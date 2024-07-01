import { configureStore } from "@reduxjs/toolkit";

import { textEditorReducer } from "./reducers/textEditorReducer";

export const store = configureStore({
  reducer: {
    textEditor: textEditorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
