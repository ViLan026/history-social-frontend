import { ReactionType } from "./reaction.types";

export interface ReactionConfigItem {
    type: ReactionType;
    label: string;
    icon: React.ReactNode; // 📌 Sửa từ string thành React.ReactNode để nhận code SVG
    textColor: string;
}

export const REACTION_CONFIG: Record<string, ReactionConfigItem> = {
    LIKE: { 
        type: "LIKE", 
        label: "Thích", 
        textColor: "text-blue-500 font-medium",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-blue-500 text-blue-500">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
        ) 
    },
    LOVE: { 
        type: "LOVE", 
        label: "Yêu thích", 
        textColor: "text-red-500 font-medium",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-red-500 text-red-500">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
        ) 
    },
    HAHA: { 
        type: "HAHA", 
        label: "Haha", 
        textColor: "text-yellow-500 font-medium",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-yellow-500 fill-yellow-500">
                {/* Khuôn mặt */}
                <circle cx="12" cy="12" r="10" />
                {/* Mắt nheo cười hạnh phúc */}
                <path d="M8 9.5l1.5 1L11 9.5M13 9.5l1.5 1 1.5-1" strokeLinecap="round" strokeLinejoin="round" />
                {/* Miệng cười há lớn */}
                <path d="M8 14c0 2.5 1.5 4 4 4s4-1.5 4-4H8z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ) 
    },
    WOW: { 
        type: "WOW", 
        label: "Wow", 
        textColor: "text-yellow-500 font-medium",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-yellow-500 fill-yellow-500">
                {/* Khuôn mặt */}
                <circle cx="12" cy="12" r="10" />
                {/* Mắt tròn ngạc nhiên */}
                <circle cx="9" cy="9.5" r="1.5" />
                <circle cx="15" cy="9.5" r="1.5" />
                {/* Miệng chữ O ngạc nhiên */}
                <circle cx="12" cy="15" r="2.5" />
            </svg>
        ) 
    },
    SAD: { 
        type: "SAD", 
        label: "Buồn", 
        textColor: "text-yellow-600 font-medium",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-yellow-600 fill-yellow-500">
                {/* Khuôn mặt */}
                <circle cx="12" cy="12" r="10" />
                {/* Mắt đượm buồn */}
                <circle cx="9" cy="10" r="1" />
                <circle cx="15" cy="10" r="1" />
                {/* Miệng mếu xuống */}
                <path d="M16 16c-1-1.5-2.5-2-4-2s-3 .5-4 2" strokeLinecap="round" />
                {/* Giọt nước mắt màu xanh dương */}
                <path d="M9 11.5v2" stroke="currentColor" className="text-blue-500" strokeLinecap="round" />
            </svg>
        ) 
    },
    ANGRY: { 
        type: "ANGRY", 
        label: "Phẫn nộ", 
        textColor: "text-orange-600 font-medium",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-600 fill-orange-600">
                {/* Khuôn mặt phẫn nộ */}
                <circle cx="12" cy="12" r="10" />
                {/* Lông mày xếch giận dữ */}
                <path d="M7 8l3 1.5M17 8l-3 1.5" strokeLinecap="round" />
                {/* Mắt tức giận */}
                <circle cx="9" cy="11" r="1" />
                <circle cx="15" cy="11" r="1" />
                {/* Miệng tức giận quay xuống */}
                <path d="M8 16.5c1-1 2.5-1.5 4-1.5s3 .5 4 1.5" strokeLinecap="round" />
            </svg>
        ) 
    },
};

export const REACTION_LIST = Object.values(REACTION_CONFIG);
