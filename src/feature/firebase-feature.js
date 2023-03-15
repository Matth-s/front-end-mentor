import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase-conf";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setFeedback,
  setViewFeedback,
  setComment,
  setNewFeedback,
  setUpdateFeedback,
  setReply,
  setDeleteFeedback,
  setEditReply,
  setLike,
} from "./feedback.slice";

import { setAuthenticated, setUserinfo } from "./user.slice";

// CRUD
//get All feedback
export const getAllfeedback = createAsyncThunk(
  "getAllfeedback",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, "feedback"));
      querySnapshot.forEach((doc) => {
        dispatch(setFeedback(doc.data()));
      });
      return { status: "success" };
    } catch (error) {
      return rejectWithValue({ message: error });
    }
  }
);

//get one feedback seleted with id
export const getViewFeedback = createAsyncThunk(
  "getViewFeedback",
  async (id, { dispatch, rejectWithValue }) => {
    const feedbackCollection = collection(db, "feedback");
    const q = query(feedbackCollection, where("id", "==", id));

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return rejectWithValue({ message: `No document found` });
      } else {
        querySnapshot.forEach((doc) => {
          dispatch(setViewFeedback(doc.data()));
        });
        return { status: "success" };
      }
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

//add comment
export const postComment = createAsyncThunk(
  "feedback/postComment",
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    const feedbackCollection = collection(db, "feedback");
    const q = query(feedbackCollection, where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return rejectWithValue({
        message: "Oops, looks like this forum doesn't exist anymore.",
      });
    } else {
      const doc = querySnapshot.docs[0];
      const docRef = doc.ref;

      try {
        await updateDoc(docRef, {
          comments: arrayUnion(data),
        });

        dispatch(setComment({ id, data }));
        return { status: "succes" };
      } catch (error) {
        rejectWithValue({ message: error });
      }
    }
  }
);

//create new feedback
export const createNewFeedback = createAsyncThunk(
  "feedback/createFeedback",
  async (data, { rejectWithValue, dispatch }) => {
    const title = data.title;
    const id = data.id;
    const feedbackCollection = collection(db, "feedback");
    const q = query(feedbackCollection, where("title", "==", title));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      try {
        await addDoc(collection(db, "feedback"), data);
        dispatch(setNewFeedback(data));
        dispatch(setViewFeedback(id));
        return { status: "succes" };
      } catch (error) {
        return rejectWithValue({ message: error });
      }
    } else {
      return rejectWithValue({
        message: `feedback already exist with this title : ${title}`,
      });
    }
  }
);

//post reply
export const postReply = createAsyncThunk(
  "feedback/postReply",
  async (
    { data, idFeedback, idComment, replySubComment, idCommentParent },
    { dispatch, rejectWithValue }
  ) => {
    const feedbackCollection = collection(db, "feedback");
    const q = query(feedbackCollection, where("id", "==", idFeedback));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return rejectWithValue({ message: "Document not found" });
    }

    const doc = querySnapshot.docs[0];
    const comments = doc.data().comments;
    const comment = replySubComment
      ? comments.find((x) => x.id === idCommentParent)
      : comments.find((x) => x.id === idComment);
    comment.replies.push(data);

    try {
      await updateDoc(doc.ref, { comments });
      dispatch(setReply({ data, idComment, replySubComment, idCommentParent }));
      return { status: "success" };
    } catch (error) {
      return rejectWithValue({ message: error });
    }
  }
);

//edit reply, comment
export const editReply = createAsyncThunk(
  "feedback/editReply",
  async (
    { id, idComment, idCommentParent, editSubComment, content },
    { dispatch, rejectWithValue }
  ) => {
    const feedbackCollection = collection(db, "feedback");
    const querySnapshot = await getDocs(
      query(feedbackCollection, where("id", "==", id))
    );

    if (querySnapshot.empty) {
      return rejectWithValue({ message: "Document not found" });
    }

    const docRef = doc(db, "feedback", querySnapshot.docs[0].id);
    const docData = querySnapshot.docs[0].data();

    const comments = docData.comments.map((comment) => {
      if (editSubComment && comment.id === idCommentParent) {
        comment.replies = comment.replies.map((subComment) => {
          if (subComment.id === idComment) {
            return { ...subComment, content };
          }
          return subComment;
        });
      } else if (comment.id === idComment) {
        return { ...comment, content };
      }
      return comment;
    });

    try {
      await updateDoc(docRef, { comments });
      dispatch(
        setEditReply({ editSubComment, idComment, content, idCommentParent })
      );
      return { status: "success" };
    } catch (error) {
      return rejectWithValue({ message: "Error updating" });
    }
  }
);

//delete feedback
export const deleteFeedback = createAsyncThunk(
  "feedback/deleteFeedback",
  async (id, { dispatch, rejectWithValue }) => {
    const feedbackCollection = collection(db, "feedback");
    const q = query(feedbackCollection, where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return rejectWithValue({ message: "Document not found" });
    } else {
      const docToDelete = querySnapshot.docs[0];
      try {
        await deleteDoc(docToDelete.ref);
        dispatch(setDeleteFeedback(id));
        return { status: "succes" };
      } catch (error) {
        return rejectWithValue({
          message: "Error in document deletion",
        });
      }
    }
  }
);

//update data document
export const updateFeedback = createAsyncThunk(
  "feedback/updateFeedback",
  async ({ upDate, oldTitle, id }, { dispatch, rejectWithValue }) => {
    const newTitle = upDate.title;
    const feedbackCollection = collection(db, "feedback");

    const q = query(feedbackCollection, where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (oldTitle === newTitle) {
      if (querySnapshot.empty) {
        return rejectWithValue({ message: "document doesn't exist" });
      } else {
        const docRef = querySnapshot.docs[0].ref;
        try {
          await updateDoc(docRef, upDate);
          dispatch(setUpdateFeedback({ upDate, id }));
          return { status: "success" };
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      const checkNewTitle = query(
        feedbackCollection,
        where("title", "==", newTitle)
      );
      const querySnapshotCheck = await getDocs(checkNewTitle);

      if (querySnapshotCheck.empty) {
        const docRef = querySnapshot.docs[0].ref;
        try {
          await updateDoc(docRef, upDate);
          dispatch(setUpdateFeedback({ upDate, id }));
          return { status: "success" };
        } catch (error) {
          console.log(error);
        }
      } else {
        return rejectWithValue({ message: "Title already exist" });
      }
    }
  }
);

//setLike feedback
export const postLike = createAsyncThunk(
  "feedback/postLike",
  async ({ id, username }, { dispatch, rejectWithValue }) => {
    const feedbackCollection = collection(db, "feedback");
    const q = query(feedbackCollection, where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return rejectWithValue({ message: "No document found" });
    } else {
      const doc = querySnapshot.docs[0];
      const docRef = doc.ref;

      if (doc.data().upvotes.includes(username)) {
        try {
          await updateDoc(docRef, {
            upvotes: arrayRemove(username),
          });
          dispatch(setLike({ id, username: username }));
        } catch (error) {
          return rejectWithValue({ message: "Error dislike" });
        }
      } else {
        try {
          await updateDoc(docRef, {
            upvotes: arrayUnion(username),
          });
          dispatch(setLike({ id, username: username }));
        } catch (error) {
          return rejectWithValue({ message: "Error like" });
        }
      }
    }
  }
);

// USER

//checkstatus
export const checkUserStatus = createAsyncThunk(
  "user/checkUserStatus",
  async (_, { dispatch, rejectWithValue }) => {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const docRef = doc(db, "user", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              const username = docSnap.data();
              dispatch(
                setUserinfo({
                  image: user.photoURL,
                  displayName: user.displayName,
                  username: username.username,
                })
              );
              dispatch(setAuthenticated(true));
              resolve({ status: "success" });
            } else {
              return rejectWithValue({ message: "User don't found" });
            }
          } catch (error) {
            reject({ message: "Not user found" });
          }
        } else {
          resolve({ status: "success" });
        }
      });
    });
  }
);

//createUser
export const createUser = createAsyncThunk(
  "/createUser",
  async (userInfo, { dispatch, rejectWithValue }) => {
    const usersCollection = collection(db, "user");

    //check if username is already used

    const q = query(
      usersCollection,
      where("username", "==", userInfo.username)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          userInfo.email,
          userInfo.password
        );

        await updateProfile(auth.currentUser, {
          displayName: userInfo.name,
        });

        //set username in collection usersCollection
        await setDoc(doc(usersCollection, userCredential.user.uid), {
          username: userInfo.username,
        });

        dispatch(
          setUserinfo({
            token: userCredential.user.accessToken,
            displayName: userCredential.user.displayName,
            username: userInfo.username,
          })
        );
        dispatch(setAuthenticated(true));
        return { status: "success" };
      } catch (error) {
        return rejectWithValue({ message: "auth/email-already-in-use" });
      }
    } else {
      return rejectWithValue({ message: "Username already exist" });
    }
  }
);

//logIn
export const logIn = createAsyncThunk(
  "/connect user",
  async (data, { dispatch, rejectWithValue }) => {
    const email = data.email;
    const password = data.password;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const uid = user.uid;
      const docRef = doc(db, "user", uid);

      try {
        const result = await getDoc(docRef);

        dispatch(
          setUserinfo({
            token: user.accessToken,
            displayName: user.displayName,
            username: result.data().username,
          })
        );
        dispatch(setAuthenticated(true));
        await dispatch(checkUserStatus());
        return { status: "succes" };
      } catch (error) {
        return rejectWithValue({ message: "Username not found" });
      }
    } catch (error) {
      return rejectWithValue({ message: "Auth or password wrong" });
    }
  }
);

//logout user
export const LogOut = createAsyncThunk(
  "/userLgout",
  async (_, { dispatch, rejectWithValue }) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          await auth.signOut();
          dispatch(setAuthenticated(false));
          dispatch(setUserinfo({ token: "", displayName: "", username: "" }));
          dispatch(checkUserStatus());
        } catch (error) {
          return rejectWithValue("error");
        }
      } else {
        return rejectWithValue({ message: "No username found" });
      }
    });
  }
);
