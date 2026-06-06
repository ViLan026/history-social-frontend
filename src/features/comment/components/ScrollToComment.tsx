// src/features/comment/components/ScrollToComment.tsx

"use client";

import { useEffect } from "react";

interface ScrollToCommentProps {
    commentId: string;
}

export default function ScrollToComment({
    commentId,
}: ScrollToCommentProps) {
    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            const element = document.querySelector(
                `[data-comment-id="${commentId}"]`
            );

            if (!element) {
                return;
            }

            element.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });

            element.classList.add(
                "ring-2",
                "ring-primary",
                "rounded-xl"
            );

            window.setTimeout(() => {
                element.classList.remove(
                    "ring-2",
                    "ring-primary",
                    "rounded-xl"
                );
            }, 2500);
        }, 700);

        return () => window.clearTimeout(timeoutId);
    }, [commentId]);

    return null;
}