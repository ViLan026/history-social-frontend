"use client";

import { useEffect } from "react";
import { useUIStore } from "@/features/ui/ui.store";
import PostCard from "../../post/components/post-card/PostCard";
import { CommentSection } from "@/features/comment/components/CommentSection";
import { useCurrentUser } from "@/features/user/useUser";

export default function PostDetailModal() {
    const { isPostDetailOpen, selectedPost, closePostDetail } = useUIStore();
    const { data: currentUser } = useCurrentUser();
    const currentUserId = currentUser?.id;

    useEffect(() => {
        if (isPostDetailOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isPostDetailOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isPostDetailOpen) {
                closePostDetail();
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isPostDetailOpen, closePostDetail]);

    if (!isPostDetailOpen || !selectedPost) {
        return null;
    }

    const postContent = (
        <div className="mx-auto w-full max-w-feed p-0">
            <div className="rounded-2xl border border-border bg-background p-2 lg:rounded-3xl lg:p-4 shadow-sm">
                <PostCard
                    post={selectedPost}
                    key={selectedPost.postId}
                    isInModal={true}
                />
            </div>
        </div>
    );

    return (
        <div className="fixed inset-x-0 bottom-0 top-14 z-50 flex items-center justify-center p-0 md:p-4 bg-surface-overlay/100 backdrop-blur-sm "                 style={{
                    backgroundColor: "background" // backdropFilter: "blur(6px)"
                }}>
            {/* 1. NÚT ĐÓNG - GIAO DIỆN DESKTOP */}
            <button
                type="button"
                onClick={closePostDetail}
                className="hidden md:flex absolute right-4 top-4 z-[60] h-10 w-10 items-center justify-center rounded-full bg-primary-fg text-primary-fg shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all duration-200 hover:bg-primary-hover hover:scale-110 active:scale-95 xl:right-8 xl:top-8 xl:h-12 xl:w-12 xl:text-xl"
                aria-label="Đóng"
            >
                ✕
            </button>

            <div
                className={[
                    "relative flex w-full flex-col overflow-hidden bg-background shadow-2xl animate-slide-up",
                    "h-[calc(100dvh-3.5rem)] rounded-none",
                    "md:h-auto md:max-h-[85dvh] md:max-w-2xl md:rounded-2xl",
                    "lg:h-[85dvh] lg:max-w-6xl xl:max-w-7xl lg:flex-row lg:rounded-3xl"
                ].join(" ")}

            >
                {/* 2. NÚT ĐÓNG & HEADER - GIAO DIỆN MOBILE */}
                <div className="flex md:hidden shrink-0 items-center justify-between border-b border-border bg-background px-4 py-3 z-20">
                    <h3 className="font-semibold text-foreground">Bài viết</h3>
                    <button
                        type="button"
                        onClick={closePostDetail}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-surface text-foreground-muted transition-colors hover:bg-surface-raised hover:text-foreground"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex h-full w-full flex-col lg:flex-row min-h-0 overflow-hidden md:p-6 p-0">
                    <section className="hidden lg:block shrink-0 w-full overflow-y-auto bg-surface-overlay lg:w-[55%] xl:w-[60%] lg:h-full lg:flex-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {postContent}
                    </section>

                    <aside className="flex flex-1 flex-col min-h-0 w-full bg-background lg:h-full lg:w-[45%] xl:w-[40%]">
                        <CommentSection
                            postId={selectedPost.postId}
                            currentUserId={currentUserId}
                            mobileHeader={postContent} // TRUYỀN BÀI VIẾT VÀO LÀM HEADER TRÊN MOBILE
                        />
                    </aside>
                </div>
            </div>
        </div>
    );
}
