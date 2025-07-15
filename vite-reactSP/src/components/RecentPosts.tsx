import React, { useEffect, useState } from "react";
import type { PostItem, ReplyItem } from "../types/posts";
import { getPostReplies, getRecentPosts } from "../services/memberService";
import { Button, Spinner } from "react-bootstrap";

import { useSelector } from "react-redux";
import type { RootState } from "../store"; // adjust the path as needed

const BASE_URL = import.meta.env.VITE_BASE_URL;

const RecentPosts: React.FC = () => {
  const memberID = useSelector((state: RootState) => state.auth.user?.memberID);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [expandedReplies, setExpandedReplies] = useState<Set<number>>(
    new Set()
  );

  const [replies, setReplies] = useState<Record<number, ReplyItem[]>>({});
  const [loadingReplies, setLoadingReplies] = useState<Set<number>>(new Set());

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
            <i>What's on your mind?</i>
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
            onClick={() => alert("Add New Post")}
          >
            <i className="bi bi-plus"></i>
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center p-3 ">
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
              <img
                src={`${BASE_URL}/Images/members/${
                  res.picturePath || "default.png"
                }`}
                alt="User"
                className="rounded-circle"
                style={{ width: "35px", height: "35px" }}
              />
              <div className="ms-3" style={{ maxWidth: "700px" }}>
                <div
                  style={{
                    /*backgroundColor: "seashell",*/
                    borderRadius: "10px",
                    padding: "0px",
                    fontSize: "10pt",
                    color: "#36454f",
                  }}
                >
                  <strong>{res.memberName}</strong>
                  <br />
                  {res.description}
                </div>
                <div className="mt-1 text-muted" style={{ fontSize: "9pt" }}>
                  {res.datePosted}
                  <br />
                  <Button
                    size="sm"
                    variant="link"
                    className="p-0 fs-6 text-dark text-primary"
                    title="Reply"
                    style={{ fontSize: "9pt" }}
                    onClick={() => toggleReplies(res.postID)}
                  >
                    <i className={`bi bi-chat`} />({res.replyCount})
                  </Button>
                  <span className="mx-2 text-secondary">|</span>
                  <Button
                    size="sm"
                    title="Like"
                    variant="link"
                    className="p-0 fs-6 text-dark text-primary"
                    style={{ fontSize: "9pt" }}
                    onClick={() => alert("Liked!")}
                  >
                    <i className={`bi bi-hand-thumbs-up`} /> ({res.likeCount})
                  </Button>
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
                        <div key={i} className="d-flex mb-2">
                          <img
                            src={`${BASE_URL}/Images/${
                              chi.picturePath || "default.png"
                            }`}
                            alt="User"
                            className="rounded-circle"
                            style={{ width: "30px", height: "30px" }}
                          />
                          <div
                            className="ms-2"
                            style={{ fontSize: "9pt", color: "#36454f" }}
                          >
                            <strong>{chi.memberName}</strong>&nbsp;
                            {chi.description}
                            <br />
                            <small className="text-muted">
                              {chi.dateResponded}
                            </small>
                            <Button
                              size="sm"
                              variant="link"
                              className="p-0 ms-2"
                              style={{ fontSize: "8pt" }}
                              onClick={() => alert("Reply to reply")}
                            >
                              Reply
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-muted" style={{ fontSize: "9pt" }}>
                        No replies yet.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentPosts;
