"use client";

import React, { useState, useRef, useEffect } from "react";
import { useToggleReaction, useReactionStats } from "../useReaction";
import { ReactionType } from "../reaction.types";
import { REACTION_CONFIG, REACTION_LIST } from "../reaction.config";
import { cn } from "@/lib/utils";

interface ReactionButtonProps {
    postId: string;
    currentUserReaction?: ReactionType | null;
}

export default function ReactionButton({
    postId,
    currentUserReaction = null
}: ReactionButtonProps) {
    const [showPicker, setShowPicker] = useState(false);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const { data: stats } = useReactionStats(postId);
    const toggleReactionMutation = useToggleReaction();

    const [optimisticReaction, setOptimisticReaction] =
        useState<ReactionType | null>(currentUserReaction);
    const [optimisticCount, setOptimisticCount] = useState<number>(
        stats?.totalReactions || 0
    );

    // 💡 SỬA LỖI ĐÂY: Chỉ đồng bộ lại giao diện khi Server THỰC SỰ có dữ liệu mới trả về,
    // không bắt ép giao diện reset khi API vừa chạy ngầm xong nữa.
    useEffect(() => {
        if (currentUserReaction !== undefined) {
            setOptimisticReaction(currentUserReaction);
        }
    }, [currentUserReaction]);

    useEffect(() => {
        if (stats?.totalReactions !== undefined) {
            setOptimisticCount(stats.totalReactions);
        }
    }, [stats?.totalReactions]);

    const handleMouseEnter = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = setTimeout(() => setShowPicker(true), 300);
    };

    const handleMouseLeave = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = setTimeout(() => setShowPicker(false), 400);
    };

    const handleSelectReaction = (e: React.MouseEvent, type: ReactionType) => {
        // Chặn sự kiện click bị ảnh hưởng bởi các thẻ bọc bên ngoài
        e.preventDefault();
        e.stopPropagation();

        const isSameReaction = optimisticReaction === type;
        const nextReaction = isSameReaction ? null : type;

        let newCount = optimisticCount;
        if (!optimisticReaction && nextReaction) {
            newCount += 1;
        } else if (optimisticReaction && !nextReaction) {
            newCount = Math.max(0, newCount - 1);
        }

        setOptimisticReaction(nextReaction);
        setOptimisticCount(newCount);
        toggleReactionMutation.mutate({ postId, type });
        setShowPicker(false);
    };

    const handleMainButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const isRemoving = optimisticReaction !== null;
        const nextType = isRemoving ? null : "LIKE";

        let newCount = optimisticCount;
        if (!optimisticReaction && nextType) {
            newCount += 1;
        } else if (optimisticReaction && !nextType) {
            newCount = Math.max(0, newCount - 1);
        }

        setOptimisticReaction(nextType);
        setOptimisticCount(newCount);
        toggleReactionMutation.mutate({
            postId,
            type: isRemoving ? optimisticReaction : "LIKE"
        });
    };

    const currentActive = optimisticReaction
        ? REACTION_CONFIG[optimisticReaction]
        : null;

    const topReactionIcons =
        stats?.counts
            ?.filter((c) => c.count > 0)
            ?.sort((a, b) => b.count - a.count)
            ?.slice(0, 3)
            ?.map((c) => REACTION_CONFIG[c.type]?.icon) || [];

    return (
        <div
            className="relative flex items-center gap-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {showPicker && (
                <div className="absolute bottom-full left-0 z-[70] animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-auto">
                    <div className="flex items-center gap-2 rounded-full">
                        {REACTION_LIST.map((reaction, index) => (
                            <button
                                key={reaction.type}
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectReaction(e, reaction.type);
                                }}
                                style={{ animationDelay: `${index * 30}ms` }}
                                title={reaction.label}
                            >
                                <span className="block w-5 h-5 transition-all duration-200 origin-bottom group-hover:scale-[1.3] group-hover:-translate-y-2 active:scale-95">
                                    <span className="w-full h-full block [&>svg]:w-full [&>svg]:h-full pointer-events-none drop-shadow-sm">
                                        {reaction.icon}
                                    </span>
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <button
                type="button"
                onClick={handleMainButtonClick}
                className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors duration-150 hover:bg-surface",
                    currentActive
                        ? currentActive.textColor
                        : "text-foreground-muted hover:text-foreground"
                )}
            >
                <span
                    className="w-4 h-4 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                    aria-hidden="true"
                >
                    {currentActive ? (
                        currentActive.icon
                    ) : (
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                        </svg>
                    )}
                </span>
                <span className="text-xs font-semibold">
                    {currentActive ? currentActive.label : "Thích"}
                </span>
            </button>

            {optimisticCount > 0 && (
                <div className="flex items-center gap-1 ml-1 text-xs text-foreground-muted select-none">
                    <div className="flex items-center -space-x-1.5 font-normal [&>span]:w-3.5 [&>span]:h-3.5 [&>span>svg]:w-full [&>span>svg]:h-full">
                        {topReactionIcons.map((icon, idx) => (
                            <span
                                key={idx}
                                className="z-10 bg-background rounded-full p-[0.5px] shadow-sm flex items-center justify-center"
                            >
                                {icon}
                            </span>
                        ))}
                    </div>
                    <span className="hover:underline cursor-pointer font-medium pl-0.5">
                        {optimisticCount}
                    </span>
                </div>
            )}
        </div>
    );
}
