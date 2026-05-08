"use client";

import { useBookmarkedPosts } from "@/features/bookmark/useBookmark";
import { useState } from "react";
import PostCard from "@/features/post/components/post-card/PostCard";
import Button from "@/components/ui/Button";

const LoadingCard = ({ count = 6 }: { count?: number }) => (
    <>
        {Array.from({ length: count }).map((_, i) => (
            <div
                key={i}
                className="rounded-xl p-4 animate-pulse"
                style={{ backgroundColor: "#F2F1ED" }}
            >
                <div className="h-12 bg-gray-300 rounded-full mb-4 w-12" />
                <div className="h-4 bg-gray-300 rounded mb-3 w-3/4" />
                <div className="h-4 bg-gray-300 rounded mb-3 w-full" />
                <div className="h-4 bg-gray-300 rounded w-1/2" />
            </div>
        ))}
    </>
);

export default function BookmarksPage() {
    const [page, setPage] = useState(1);
    const { data, isLoading, hasNextPage } = useBookmarkedPosts({
        page,
        size: 12
    });

    const handleNextPage = () => {
        if (hasNextPage) setPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1
                    className="text-4xl font-bold mb-2"
                    style={{ color: "#7F0716" }}
                >
                    Saved Posts
                </h1>
                <p className="text-gray-600">
                    {data?.totalElements || 0} posts saved
                </p>
            </div>

            {/* Content */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <LoadingCard count={6} />
                </div>
            ) : data?.content && data.content.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {data.content.map((bookmark: any) => (
                            <PostCard
                                key={bookmark.bookmarkId}
                                post={bookmark.post}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center gap-4">
                        <Button
                            onClick={handlePrevPage}
                            disabled={page === 1}
                            className="px-6 py-2 rounded-lg"
                            style={{
                                backgroundColor:
                                    page === 1 ? "#ccc" : "#7F0716",
                                color: "white"
                            }}
                        >
                            Previous
                        </Button>
                        <span className="flex items-center px-4">
                            Page {page}
                        </span>
                        <Button
                            onClick={handleNextPage}
                            disabled={!hasNextPage}
                            className="px-6 py-2 rounded-lg"
                            style={{
                                backgroundColor: !hasNextPage
                                    ? "#ccc"
                                    : "#7F0716",
                                color: "white"
                            }}
                        >
                            Next
                        </Button>
                    </div>
                </>
            ) : (
                <div
                    className="text-center py-16 rounded-xl"
                    style={{ backgroundColor: "#F2F1ED" }}
                >
                    <p className="text-gray-500 text-lg">No saved posts yet</p>
                    <p className="text-gray-400 text-sm mt-2">
                        Start bookmarking posts to see them here
                    </p>
                </div>
            )}
        </div>
    );
}
