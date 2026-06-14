// src/features/post/components/fact-check/sourceBookLinks.ts

export const SOURCE_BOOK_LINKS: Record<string, string> = {
    "Đại Việt Sử Ký Toàn Thư":
        "https://quangduc.com/images/file/GexwL37d1AgQAJZX/dai-viet-su-ky-toan-thu-le-van-huu-phan-phu-tien-ngo-si-lien.pdf",

    "Khâm Định Việt Sử Thông Giám Cương Mục":
        "https://quangduc.com/images/file/_voL837d1AgQANJp/kham-dinh-viet-su-thong-giam-cuong-muc-quoc-su-quan-trieu-nguyen.pdf",

    "Việt Sử Toàn Thư":
        "https://cvdvn.net/wp-content/uploads/2018/03/vie1bb87tse1bbadtoc3a0nthc6b0_phamvanson.pdf",

    "Việt Nam Sử Lược":
        "https://cvdvn.net/wp-content/uploads/2018/03/viet-nam-su-luoc-tran-trong-kim1.pdf",

    "Vương Triều Trần (1226-1400)":
        "https://sachdientu.nxbhanoi.com.vn/ebook-free/10256/0/1",
};

export function buildSourceBookUrl(bookName?: string, page?: number | string) {
    if (!bookName) return null;

    const baseUrl = SOURCE_BOOK_LINKS[bookName.trim()];
    if (!baseUrl) return null;  

    if (!page) return baseUrl;

    if (bookName.trim() === "Vương Triều Trần (1226 - 1400)") {
        return `${baseUrl}/${page}`;
    }

    return `${baseUrl}#page=${page}`;
}