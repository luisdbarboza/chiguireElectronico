import React, { createContext, useReducer } from "react";

export const CommentsSectionContext = createContext();

const CommentsSectionReducer = (state, action) => {
  switch (action.type) {
    case "SET_COMMENTS_LIST":
      return {...state, listOfComments: action.comments, postId: action.postId};  
    default:
      return state;
  }
};

const CommentsSectionContextProvider = ({ children }) => {
  const [commentsSectionData, dispatchCommentsSectionData] = useReducer(
    CommentsSectionReducer,
    {
      listOfComments: [],
      postId: null
    }
  );

  return (
    <CommentsSectionContext.Provider
      value={{ commentsSectionData, dispatchCommentsSectionData }}
    >
      {children}
    </CommentsSectionContext.Provider>
  );
};

export default CommentsSectionContextProvider;
