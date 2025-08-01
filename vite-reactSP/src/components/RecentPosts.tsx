import React, { useEffect, useState } from "react";
import type { PostItem, ReplyItem } from "../types/posts";
import { getPostReplies, getRecentPosts } from "../services/memberService";
import { Button, Spinner } from "react-bootstrap";

import { useSelector } from "react-redux";
import type { RootState } from "../store";

import PostModal from "../components/PostModal"; 
import {
  incrementLikedPost,
  addPostReply,
  addNewPost,
} from "../services/memberService"; 

import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type RecentPostsProps = {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
  modalMode: "new" | "reply";
  setModalMode: (val: "new" | "reply") => void;
};

const RecentPosts: React.FC<RecentPostsProps> = ({
  showModal,
  setShowModal,
  modalMode,
  setModalMode,
}) => {
  const memberID = useSelector((state: RootState) => state.auth.user?.memberID);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [expandedReplies, setExpandedReplies] = useState<Set<number>>(
    new Set()
  );

  const [replies, setReplies] = useState<Record<number, ReplyItem[]>>({});
  const [loadingReplies, setLoadingReplies] = useState<Set<number>>(new Set());
  const [targetPostID, setTargetPostID] = useState<number | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getRecentPosts(memberID!);
      setPosts(data);
    } catch (err) {
      console.error("Failed to load posts", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const toggleReplies = async (postId: number) => {
    setExpandedReplies((prev) => {
      const updated = new Set(prev);
      if (updated.has(postId)) {
        updated.delete(postId);
      } else {
        updated.add(postId);
      }
      return updated;
    });

    // If replies not already fetched, fetch them
    if (!replies[postId]) {
      setLoadingReplies((prev) => new Set(prev).add(postId));
      try {
        const fetchedReplies = await getPostReplies(postId);
        setReplies((prev) => ({ ...prev, [postId]: fetchedReplies }));
      } catch (err) {
        console.error("Failed to fetch replies:", err);
      } finally {
        setLoadingReplies((prev) => {
          const updated = new Set(prev);
          updated.delete(postId);
          return updated;
        });
      }
    }
  };

  const handleLike = async (postID: number) => {
    // Optimistically update UI
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postID === postID
          ? { ...post, likeCounter: post.likeCounter + 1 }
          : post
      )
    );

    try {
      await incrementLikedPost(postID); // API call
    } catch (error) {
      console.error("Failed to like post", error);

      // Revert UI if API call fails
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.postID === postID
            ? { ...post, likeCounter: post.likeCounter - 1 }
            : post
        )
      );
    }
  };

  const handlePostSubmit = async (text: string) => {
    if (!memberID) return;

    try {
      if (modalMode === "reply" && targetPostID) {
        const newReply = await addPostReply(targetPostID, memberID, text);
        setReplies((prev) => ({
          ...prev,
          [targetPostID]: [...(prev[targetPostID] || []), newReply],
        }));
      } else if (modalMode === "new") {
        const newPost = await addNewPost(memberID, text);
        setPosts((prev) => [newPost, ...prev]);
      }
    } catch (err) {
      console.error("Failed to submit post", err);
    } finally {
      setShowModal(false);
      setTargetPostID(null);
    }
  };

  return (
    <div
      className="card p-0 mb-3"
      style={{ borderRadius: "1rem", width: "100%", maxWidth: "650px" }}
    >
      <div
        className="card-header d-flex align-items-center justify-content-between bg-white"
        style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
      >
        <div>
          <span className="card-header-title font-weight-normal text-body-tertiary">
            What's on your mind?
          </span>
        </div>
        <div>
          <Button
            className="fs-5 text-dark text-primary"
            variant="link"
            title="Refresh"
            onClick={fetchPosts}
          >
            <i className={`bi bi-arrow-clockwise ${loading ? "spin" : ""}`} />
          </Button>
          <span className="text-muted">|</span>
          <Button
            className="fs-5 text-dark text-primary"
            title="Add Post"
            variant="link"
            onClick={() => {
              setModalMode("new");
              setTargetPostID(null);
              setShowModal(true);
            }}
          >
            <i className="bi bi-plus"></i>
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center p-3 " style={{ fontSize: "10pt" }}>
          <Spinner animation="border" size="sm" /> Refreshing posts...
        </div>
      ) : (
        <div className="p-3">
          {posts.map((res, index) => (
            <div
              key={res.postID}
              className="d-flex pb-3 mb-3"
              style={{
                borderBottom:
                  index !== posts.length - 1 ? "1px solid #e0e0e0" : "none",
              }}
            >
              <Link to={`/profile/${res.memberID}`}>
                <img
                  src={`${BASE_URL}/Images/members/${
                    res.picturePath || "default.png"
                  }`}
                  alt="User"
                  className="rounded-circle"
                  style={{ width: "35px", height: "35px" }}
                />
              </Link>
              <div className="ms-3" style={{ maxWidth: "700px" }}>
                <div
                  style={{
                    borderRadius: "10px",
                    padding: "0px",
                    fontSize: "10pt",
                    color: "#36454f",
                  }}
                >
                  <strong>
                    <Link
                      to={`/profile/${res.memberID}`}
                      style={{ textDecoration: "none", fontWeight: "bold" }}
                    >
                      {res.memberName}
                    </Link>
                  </strong>
                  <br />
                  {res.description}
                </div>
                <div className="mt-1 text-muted" style={{ fontSize: "9pt" }}>
                  {res.datePosted}
                  <br />
                  <Button
                    size="sm"
                    variant="link"
                    className="p-0 fs-6 "
                    title="Reply"
                    style={{ fontSize: "9pt", textDecoration: "none" }}
                    onClick={() => toggleReplies(res.postID)}
                  >
                    <i className={`bi bi-chat`} />
                  </Button>
                  {res.childPostCnt > 0 && <>&nbsp;{res.childPostCnt}</>}
                  <span className="mx-2 text-secondary">|</span>
                  <Button
                    size="sm"
                    title="Like"
                    variant="link"
                    className="p-0 fs-6 "
                    style={{ fontSize: "9pt", textDecoration: "none" }}
                    onClick={() => handleLike(res.postID)}
                  >
                    <i className={`bi bi-hand-thumbs-up`} />
                  </Button>
                  {res.likeCounter > 0 && <>&nbsp;{res.likeCounter}</>}
                </div>

                {/* Replies */}
                {expandedReplies.has(res.postID) && (
                  <div className="mt-2 border-top pt-2">
                    {loadingReplies.has(res.postID) ? (
                      <div className="text-muted" style={{ fontSize: "9pt" }}>
                        <Spinner animation="border" size="sm" /> Loading
                        replies...
                      </div>
                    ) : replies[res.postID]?.length > 0 ? (
                      replies[res.postID].map((chi, i) => (
                        <div
                          key={i}
                          className="d-flex mb-2 pb-2"
                          style={{
                            borderBottom:
                              i !== replies[res.postID].length - 1
                                ? "1px solid #ddd"
                                : "none",
                          }}
                        >
                          <Link to={`/profile/${chi.memberID}`}>
                            <img
                              src={`${BASE_URL}/Images/members/${
                                chi.picturePath || "default.png"
                              }`}
                              alt="User"
                              className="rounded-circle"
                              style={{ width: "30px", height: "30px" }}
                            />
                          </Link>
                          <div
                            className="ms-2"
                            style={{ fontSize: "9pt", color: "#36454f" }}
                          >
                            <strong>
                              <Link
                                to={`/profile/${chi.memberID}`}
                                style={{
                                  textDecoration: "none",
                                  fontWeight: "bold",
                                }}
                              >
                                {chi.memberName}
                              </Link>
                            </strong>
                            <br />
                            {chi.description}
                            <br />
                            <span className="text-muted">
                              {chi.dateResponded}
                            </span>
                            <br />
                            <Button
                              size="sm"
                              variant="link"
                              className="p-0 ms-0 fs-7"
                              style={{
                                fontSize: "9pt",
                                textDecoration: "none",
                              }}
                              onClick={() => {
                                setModalMode("reply");
                                setTargetPostID(res.postID); 
                                setShowModal(true);
                              }}
                            >
                              <i className="bi bi-reply"></i>&nbsp;Reply
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-muted" style={{ fontSize: "9pt" }}>
                        No replies yet! &nbsp;-&nbsp;
                        <Button
                          size="sm"
                          variant="link"
                          className="p-0 ms-0 fs-7"
                          style={{
                            fontSize: "9pt",
                            textDecoration: "none",
                          }}
                          onClick={() => {
                            setModalMode("reply");
                            setTargetPostID(res.postID); 
                            setShowModal(true);
                          }}
                        >
                          <i className="bi bi-reply"></i>&nbsp;Reply
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <PostModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setTargetPostID(null);
        }}
        onSubmit={handlePostSubmit}
        title={modalMode === "reply" ? "Reply to Post" : "New Post"}
      />
    </div>
  );
};

export default RecentPosts;
