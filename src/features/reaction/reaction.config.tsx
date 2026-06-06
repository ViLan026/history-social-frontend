import { ReactionType } from "./reaction.types";

export interface ReactionConfigItem {
    type: ReactionType;
    label: string;
    icon: React.ReactNode;
    textColor: string;
}

export const REACTION_CONFIG: Record<string, ReactionConfigItem> = {
    LIKE: { 
        type: "LIKE", 
        label: "Thích", 
        textColor: "text-blue-600 font-semibold",
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-600 fill-blue-500" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
        ) 
    },
    LOVE: { 
        type: "LOVE", 
        label: "Yêu thích", 
        textColor: "text-red-600 font-semibold",
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-red-600 fill-red-500" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
        ) 
    },
    HAHA: { 
        type: "HAHA", 
        label: "Haha", 
        textColor: "text-yellow-600 font-semibold",
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6" strokeWidth="2">
                {/* Khuôn mặt nền vàng */}
                <circle cx="12" cy="12" r="10" className="fill-yellow-400 stroke-yellow-500" />
                {/* Mắt nheo cười hạnh phúc - Dùng màu Amber đậm tương phản */}
                <path d="M8 10.5c.5-.8 1.5-.8 2 0M14 10.5c.5-.8 1.5-.8 2 0" className="stroke-amber-950" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                {/* Miệng cười há lớn */}
                <path d="M8 14c0 2.5 1.5 4 4 4s4-1.5 4-4H8z" className="fill-amber-950 stroke-amber-950" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ) 
    },
    WOW: { 
        type: "WOW", 
        label: "Wow", 
        textColor: "text-amber-600 font-semibold",
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6" strokeWidth="2">
                {/* Khuôn mặt nền vàng */}
                <circle cx="12" cy="12" r="10" className="fill-yellow-400 stroke-yellow-500" />
                {/* Cặp lông mày ngạc nhiên */}
                <path d="M7.5 8.5c.5-.6 1.5-.6 2 0M14.5 8.5c.5-.6 1.5-.6 2 0" className="stroke-amber-950" strokeLinecap="round" fill="none" />
                {/* Mắt tròn ngạc nhiên */}
                <circle cx="9" cy="11.5" r="1.5" className="fill-amber-950 stroke-none" />
                <circle cx="15" cy="11.5" r="1.5" className="fill-amber-950 stroke-none" />
                {/* Miệng chữ O tròn xoe */}
                <ellipse cx="12" cy="15.5" rx="2" ry="2.5" className="fill-amber-950 stroke-none" />
            </svg>
        ) 
    },
    SAD: { 
        type: "SAD", 
        label: "Buồn", 
        textColor: "text-blue-500 font-semibold",
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6" strokeWidth="2">
                {/* Khuôn mặt nền vàng */}
                <circle cx="12" cy="12" r="10" className="fill-yellow-400 stroke-yellow-500" />
                {/* Lông mày buồn cụp xuống */}
                <path d="M7.5 9.5c.5-.3 1.2 0 1.5.5M16.5 9.5c-.5-.3-1.2 0-1.5.5" className="stroke-amber-950" strokeLinecap="round" fill="none" />
                {/* Mắt đượm buồn */}
                <circle cx="9" cy="12" r="1" className="fill-amber-950 stroke-none" />
                <circle cx="15" cy="12" r="1" className="fill-amber-950 stroke-none" />
                {/* Miệng mếu xuống (Đường cong Bezier mượt mà) */}
                <path d="M9 16.5c1-1.2 3-1.2 4 0" className="stroke-amber-950" strokeLinecap="round" fill="none" />
                {/* Giọt nước mắt giọt lệ sinh động */}
                <path d="M9 13.5c0 .6-.4 1.2-.9 1.2s-.9-.6-.9-1.2c0-.6.9-1.8.9-1.8s.9 1.2.9 1.8Z" className="fill-blue-500 stroke-none" />
            </svg>
        ) 
    },
    ANGRY: { 
        type: "ANGRY", 
        label: "Phẫn nộ", 
        textColor: "text-orange-600 font-semibold",
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6" strokeWidth="2">
                {/* Khuôn mặt tức giận ngả sang màu cam đỏ */}
                <circle cx="12" cy="12" r="10" className="fill-orange-400 stroke-orange-500" />
                {/* Lông mày xếch dữ dằn */}
                <path d="M7 9l3.5 1.2M17 9l-3.5 1.2" className="stroke-orange-950" strokeLinecap="round" strokeLinejoin="round" />
                {/* Mắt tức giận */}
                <circle cx="9.5" cy="12.5" r="1" className="fill-orange-950 stroke-none" />
                <circle cx="14.5" cy="12.5" r="1" className="fill-orange-950 stroke-none" />
                {/* Miệng tức giận cụp xuống */}
                <path d="M8.5 17c1.5-1.5 3.5-1.5 5 0" className="stroke-orange-950" strokeLinecap="round" fill="none" />
            </svg>
        ) 
    },
};

export const REACTION_LIST = Object.values(REACTION_CONFIG);