import React, { useState, useEffect, useContext, useCallback } from "react";
import moment from "moment";
import "moment/locale/es-mx";
import { AuthContext } from "../../../../context/AuthContext";
import { CommentsSectionContext } from "../../../../context/CommentsSectionContext";
import { SERVER_ADDRESS } from "../../../../utils";
import classes from "./CommentsSection.module.scss";

const fetchTopComments = async (postId, dispatchCommentsSectionData) => {
  const promiseResponse = await fetch(`${SERVER_ADDRESS}/comments/${postId}`);
  const responseData = await promiseResponse.json();

  if (responseData.ok) {
    dispatchCommentsSectionData({
      type: "SET_COMMENTS_LIST",
      comments: responseData.comments,
      postId,
    });
  }
};

const CommentsSection = React.memo(({ postId, numberOfComments }) => {
  const { user } = useContext(AuthContext);
  const { commentsSectionData, dispatchCommentsSectionData } = useContext(
    CommentsSectionContext
  );
  const { listOfComments: comments } = commentsSectionData;

  let listOfComments =
    comments.length > 0 &&
    comments.map((comment, index) => {
      return (
        <CommentsTree key={index}>
          <Comment {...comment} currentUser={user} level={0} />
        </CommentsTree>
      );
    });

  useEffect(() => {
    fetchTopComments(postId, dispatchCommentsSectionData);
  }, []);

  return (
    <div className={classes["post-comments"]}>
      <h2 className={classes["post-comments-header"]} id="comentarios">
        {" "}
        {numberOfComments} Comentarios
      </h2>

      {user.loggedIn && (
        <div className={classes["comment-form-wrapper"]}>
          <CommentForm user={user} type="regular" />
        </div>
      )}

      <CommentsList>{listOfComments}</CommentsList>
    </div>
  );
});

const CommentForm = ({ user, type, targetID, setSubmittedReply }) => {
  const [textareaContent, setTextareaContent] = useState("");
  const { commentsSectionData, dispatchCommentsSectionData } = useContext(
    CommentsSectionContext
  );
  const { postId } = commentsSectionData;

  const submitForm = useCallback(
    async (e, user, content) => {
      e.preventDefault();
      const token = JSON.parse(localStorage.getItem("token"));
      const requestBody = JSON.stringify({
        content,
      });

      const url =
        type === "regular"
          ? `${SERVER_ADDRESS}/comments/${postId}`
          : `${SERVER_ADDRESS}/comments/${postId}/${targetID}`;

      const promiseResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          token: token,
        },
        body: requestBody,
      });

      const responseData = await promiseResponse.json();

      if (responseData.ok) {
        fetchTopComments(postId, dispatchCommentsSectionData);
        if(type === "reply") {
          setSubmittedReply(true);
        }
      }
    },
    [postId]
  );

  return (
    <form
      className={classes["publish-comment-div"]}
      onSubmit={(e) => submitForm(e, user, textareaContent)}
    >
      <div className={classes["header"]}>
        <div className={classes["profile"]}>
          <img
            src={
              user.profilePicture
                ? `${user.profilePicture}`
                : "/images/icons/man.png"
            }
            alt="foto-perfil"
            loading="lazy"
          />
          <h6>{user.username}</h6>
        </div>
      </div>
      <div className={classes["textarea-email-notifications"]}>
        <textarea
          name="textareaContent"
          value={textareaContent}
          onChange={(e) => setTextareaContent(e.target.value)}
          placeholder="Comenta algo sobre el tema..."
        ></textarea>
        <div className={classes["email-notifications"]}>
          <h6>Recibir por email</h6>

          <label>
            <input type="radio" name="email-notifications" value="all" />
            Todos
          </label>

          <label>
            <input type="radio" name="email-notifications" value="none" />
            Solo respuestas a los mios
          </label>

          <label>
            <input type="radio" name="email-notifications" value="onlyMine" />
            Nada
          </label>
        </div>
      </div>
      <div className={classes["publish-wrapper"]}>
        <button className={classes["publish-btn"]}>Publicar</button>
      </div>
    </form>
  );
};

const CommentsList = ({ children }) => (
  <div className={classes["comments-section"]}>{children}</div>
);

const CommentsTree = React.memo(({ children, level }) => {
  return (
    <ul
      className={
        level > 0 && level < 13
          ? `${classes["comments-tree"]} ${classes["reply-" + level]}`
          : classes["comments-tree"]
      }
    >
      {children}
    </ul>
  );
});

const Comment = ({
  _id: commentID,
  currentUser,
  user,
  content,
  createdAt,
  post: postID,
  upvotes,
  downvotes,
  replies,
  level,
  repliedTo,
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [reply, setReply] = useState(false);
  const [loadedReplies, setLoadedReplies] = useState([]);
  const [submittedReply, setSubmittedReply] = useState(false);
  const replyBtnText = !showReplies
    ? `${replies.length} respuesta(s)`
    : "Ocultar";

  moment.locale("es-mx");

  useEffect(() => {
    if (showReplies || submittedReply) {
      const fetchReplies = async (postID, commentID) => {
        console.log("LOADING REPLIES FOR " + commentID);

        const promiseResponse = await fetch(
          `${SERVER_ADDRESS}/comments/${postID}/${commentID}`
        );
        const responseData = await promiseResponse.json();

        if (responseData.ok) {
          setLoadedReplies(responseData.comments);
        }

        if(submittedReply) {
          setShowReplies(true);
          setReply(false);
          setSubmittedReply(false);
        }
      };

      fetchReplies(postID, commentID);
    }
  }, [showReplies, submittedReply]);

  return (
    <li className={classes["comment-wrapper"]}>
      <div className={classes["comment-box"]}>
        <div className={classes["profile"]}>
          <img
            loading="lazy"
            src={`${user.profilePicture}`}
            alt="foto-perfil"
          />
          <h6>{user.username}</h6>
        </div>
        <div className={classes["details"]}>
          <div className={classes["header"]}>
            {repliedTo && (
              <div className={classes["repliedTo"]}>
                Respondido a <span>{repliedTo.user.username}</span>
              </div>
            )}
            <div className={classes["comment-date"]}>{moment(createdAt).fromNow()}</div>
          </div>
          <div className={classes["content"]}>{content}</div>
          <div className={classes["votes-and-replies"]}>
            <div className={classes["votes"]}>
              <img
                loading="lazy"
                className={classes["upvote"]}
                src="/images/icons/like.svg"
                alt="upvote"
              />
              <img
                loading="lazy"
                className={classes["downvote"]}
                src="/images/icons/dislike.svg"
                alt="upvote"
              />
            </div>

            <div className={classes["replies"]}>
              {currentUser.loggedIn && (
                <button
                  className={classes["replies-btns"]}
                  onClick={() => setReply(!reply)}
                >
                  <img
                    loading="lazy"
                    src="/images/icons/reply.svg"
                    alt="reply to"
                  />
                </button>
              )}

              {replies.length > 0 && (
                <button
                  className={classes["replies-btns"]}
                  onClick={() => setShowReplies(!showReplies)}
                >
                  <span>{replyBtnText}</span>
                  <img
                    loading="lazy"
                    src={
                      !showReplies
                        ? "/images/icons/caret-down.svg"
                        : "/images/icons/visibility.svg"
                    }
                    alt="Show replies"
                  />
                </button>
              )}
            </div>
          </div>
        </div>

        {reply && (
          <div className={classes["user-reply"]}>
            <CommentForm
              user={currentUser}
              type="reply"
              targetID={commentID}
              setSubmittedReply={setSubmittedReply}
            />
          </div>
        )}
      </div>

      {showReplies && loadedReplies.length > 0 && (
        <CommentsTree level={level + 1}>
          {loadedReplies.map((comment, index) => {
            return (
              <Comment
                {...comment}
                currentUser={currentUser}
                level={level + 1}
                key={index + level}
              />
            );
          })}
        </CommentsTree>
      )}
    </li>
  );
};

export default CommentsSection;
