import { createSlice } from "@reduxjs/toolkit";

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    feedback: [],
    viewFeedback: [],
    quantityFeedback: 0,
    filter: "",
    sortBy: "MU",
  },
  reducers: {
    setFeedback: (state, action) => {
      const t = state.feedback.find((x) => x.title === action.payload.title);
      if (t === undefined) {
        state.feedback.push(action.payload);
      }
      state.quantityFeedback = state.feedback.length;
    },

    setViewFeedback: (state, action) => {
      if (typeof action.payload === "string") {
        const findFeedback = state.feedback.filter(
          (x) => x.id === action.payload
        );
        state.viewFeedback = findFeedback;
      } else {
        state.viewFeedback.push(action.payload);
      }
    },

    setFilter: (state, action) => {
      const payloadFilter = action.payload.toLowerCase();

      if (payloadFilter === "all") {
        state.filter = "";
        state.quantityFeedback = state.feedback.length;
      } else {
        state.filter = action.payload;
        const length = state.feedback.filter((feedback) =>
          feedback.category.toLowerCase().includes(payloadFilter)
        ).length;

        state.quantityFeedback = length;
      }
    },

    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },

    setComment: (state, action) => {
      const id = action.payload.id;
      const data = action.payload.data;

      state.viewFeedback[0].comments.push(data);

      const findFeedback = state.feedback.find((x) => x.id === id);
      findFeedback.comments.push(data);
    },

    setReply: (state, action) => {
      const idComment = action.payload.idComment;
      const idCommentParent = action.payload.idCommentParent;
      const replySubComment = action.payload.replySubComment;
      const data = action.payload.data;

      if (replySubComment) {
        const findComment = state.viewFeedback[0].comments.find(
          (x) => x.id === idCommentParent
        );
        findComment.replies.push(data);
      } else {
        const findComment = state.viewFeedback[0].comments.find(
          (x) => x.id === idComment
        );
        findComment.replies.push(data);
      }
    },

    setEditReply: (state, action) => {
      const editSubReply = action.payload.editSubComment;
      const idReply = action.payload.idComment;
      const idCommentParent = action.payload.idCommentParent;
      const replyContent = action.payload.content;

      if (editSubReply) {
        const findReply = state.viewFeedback[0].comments.find(
          (x) => x.id === idCommentParent
        );
        const findSubReply = findReply.replies.find((x) => x.id === idReply);
        findSubReply.content = replyContent;
      } else {
        const findReply = state.viewFeedback[0].comments.find(
          (x) => x.id === idReply
        );
        findReply.content = replyContent;
      }
    },

    setUpdateFeedback: (state, action) => {
      const id = action.payload.id;
      const title = action.payload.upDate.title;
      const description = action.payload.upDate.description;
      const category = action.payload.upDate.category;

      state.viewFeedback[0].title = title;
      state.viewFeedback[0].description = description;
      state.viewFeedback[0].category = category;

      state.feedback = state.feedback.filter((x) => x.id !== id);
      state.feedback.push(state.viewFeedback[0]);
    },

    setDeleteFeedback: (state, action) => {
      state.feedback = state.feedback.filter((x) => x.id !== action.payload);
      state.quantityFeedback = state.feedback.length;
    },

    setNewFeedback: (state, action) => {
      state.feedback.push(action.payload);
      state.quantityFeedback = state.feedback.length;
    },

    setLike: (state, action) => {
      const username = action.payload.username;
      const id = action.payload.id;

      // change state off all feedback
      const feedbackToUpdate = state.feedback.find(
        (feedback) => feedback.id === id
      );

      const userHasLiked = feedbackToUpdate.upvotes.includes(username);

      if (userHasLiked) {
        feedbackToUpdate.upvotes = feedbackToUpdate.upvotes.filter(
          (upvoter) => upvoter !== username
        );
      } else {
        feedbackToUpdate.upvotes.push(username);
      }

      //change state of viewFeedback if state.viewFeedback is not empty

      if (state.viewFeedback.length > 0) {
        const likeViewFeedback = state.viewFeedback[0].upvotes;
        if (likeViewFeedback.includes(username)) {
          state.viewFeedback[0].upvotes = likeViewFeedback.filter(
            (liker) => liker !== username
          );
        } else {
          state.viewFeedback[0].upvotes.push(username);
        }
      }
    },
  },
});

export const {
  setFeedback,
  setViewFeedback,
  setLike,
  setComment,
  setNewFeedback,
  setFilter,
  setSortBy,
  setUpdateFeedback,
  setDeleteFeedback,
  setReply,
  setEditReply,
} = feedbackSlice.actions;
export default feedbackSlice.reducer;
