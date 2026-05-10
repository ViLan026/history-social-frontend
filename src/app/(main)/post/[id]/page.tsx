"use client";

import React from "react";
import { PostCard } from "@/features/post/components/post-card/PostCard";
import { CreatePost } from "@/features/ui/components/CreatePostModal";
import { usePosts } from "@/features/post/usePost";
import { usePostStore } from "@/features/post/post.store";

export default function HomePage() {
    // Get pagination state from Zustand
    const {
        currentPage,
        pageSize,
        isCreatePostModalOpen,
        setPage,
        nextPage,
        previousPage,
        openCreatePostModal,
        closeCreatePostModal
    } = usePostStore();

    // Fetch posts using React Query
    const { data, isLoading, isError, error } = usePosts({
        page: currentPage,
        size: pageSize,
        sort: "createdAt,desc"
    });

    const posts = data?.content ?? [];
    const totalPages = data?.totalPages || 0;
    const hasNextPage = data ? !data.last : false;
    const hasPreviousPage = currentPage > 0;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">
                            History Social Feed
                        </h1>
                        <button
                            onClick={openCreatePostModal}
                            className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                        >
                            + Create Post
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Create Post Modal */}
                {isCreatePostModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">
                                    Create New Post
                                </h2>
                                <button
                                    onClick={closeCreatePostModal}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <CreatePost />
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                )}

                {/* Error State */}
                {isError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <p className="text-red-600 font-medium">
                            Failed to load posts
                        </p>
                        <p className="text-red-500 text-sm mt-2">
                            {error instanceof Error
                                ? error.message
                                : "An error occurred"}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Posts Grid */}
                {!isLoading && !isError && (
                    <>
                        {posts.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-md p-12 text-center">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">
                                    No posts yet
                                </h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    Get started by creating your first post.
                                </p>
                                <button
                                    onClick={openCreatePostModal}
                                    className="mt-6 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Create First Post
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {posts.map((post) => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                            </div>
                        )}

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="mt-8 flex items-center justify-center gap-2">
                                <button
                                    onClick={previousPage}
                                    disabled={!hasPreviousPage}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Previous
                                </button>

                                <div className="flex items-center gap-2">
                                    {Array.from(
                                        { length: Math.min(5, totalPages) },
                                        (_, i) => {
                                            // Show current page and 2 pages before/after
                                            let pageNum;
                                            // if (totalPages <= 5) {
                                            //   pageNum = i;
                                            // } else if (currentPage < 2) {
                                            //   pageNum = i;
                                            // } else if (currentPage > totalPages - 3) {
                                            //   pageNum = totalPages - 5 + i;
                                            // } else {
                                            //   pageNum = currentPage - 2 + i;
                                            // }

                                            pageNum =
                                                Math.max(0, totalPages - 5) + i;

                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() =>
                                                        setPage(pageNum)
                                                    }
                                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                                        currentPage === pageNum
                                                            ? "bg-blue-600 text-white"
                                                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                                                    }`}
                                                >
                                                    {pageNum + 1}
                                                </button>
                                            );
                                        }
                                    )}
                                </div>

                                <button
                                    onClick={nextPage}
                                    disabled={!hasNextPage}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}

                        {/* Pagination Info */}
                        {data && (
                            <div className="mt-4 text-center text-sm text-gray-600">
                                Showing page {currentPage + 1} of {totalPages} (
                                {data.totalElements} total posts)
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
