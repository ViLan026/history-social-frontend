"use client";

import React, { useState } from "react";
import { buildSourceBookUrl } from "./sourceBookLinks";

function hasNonEmptyFootnotes(footnotes: unknown) {
    if (footnotes === undefined || footnotes === null) return false;
    if (typeof footnotes === "string") return footnotes.trim().length > 0;
    if (Array.isArray(footnotes)) return footnotes.length > 0;
    if (typeof footnotes === "object") return Object.keys(footnotes).length > 0;
    return true;
}

function isEvidenceObject(value: unknown): value is {
    chunk_id?: string;
    score?: number;
    book_name?: string;
    pages?: number[];
    text?: string;
    footnotes?: unknown;
} {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

// function formatScore(score?: number) {
//     if (typeof score !== "number") return null;
//     return score.toFixed(3);
// }

function renderEvidenceItem(item: unknown, index: number) {
    if (typeof item === "string") {
        return (
            <div className="rounded-xl border border-border bg-card p-4 text-sm">
                <p className="mb-2 text-xs font-semibold text-foreground-muted">
                    Bằng chứng {index + 1}
                </p>
                <p className="whitespace-pre-wrap  text-foreground-muted">
                    {item}
                </p>
            </div>
        );
    }

    if (isEvidenceObject(item)) {
        // const score = formatScore(item.score);
        const pages = item.pages ?? [];
        const firstPage = pages.length > 0 ? pages[0] : undefined;
        const url = buildSourceBookUrl(item.book_name, firstPage);

        return (
            <div className="space-y-3 rounded-xl border border-border bg-card p-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-foreground-muted">
                    <span className="font-semibold text-foreground">
                        Bằng chứng {index + 1}
                    </span>

                    {item.book_name &&
                        (url ? (
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full border border-border px-2 py-0.5 text-primary hover:underline"
                            >
                                {item.book_name}
                                {pages.length > 0 &&
                                    ` - Trang ${pages.join(", ")}`}
                            </a>
                        ) : (
                            <span className="rounded-full border border-border px-2 py-0.5">
                                {item.book_name}
                                {pages.length > 0 &&
                                    ` - Trang ${pages.join(", ")}`}
                            </span>
                        ))}

                    {/* {score && (
                        <span className="rounded-full border border-border px-2 py-0.5">
                            Score {score}
                        </span>
                    )} */}
                </div>

                {item.text && (
                    <p className="whitespace-pre-wrap  text-sm text-foreground-muted">
                        {item.text}
                    </p>
                )}

                {hasNonEmptyFootnotes(item.footnotes) && (
                    <details className="text-xs">
                        <summary className="cursor-pointer font-medium text-primary">
                            Xem chú thích
                        </summary>
                        <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded-lg bg-muted/60 p-3">
                            {JSON.stringify(item.footnotes, null, 2)}
                        </pre>
                    </details>
                )}
            </div>
        );
    }

    return (
        <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-muted/60 p-3 text-xs">
            {JSON.stringify(item, null, 2)}
        </pre>
    );
}

export default function FactCheckEvidence({
    evidence
}: {
    evidence?: unknown;
}) {
    const [isOpen, setIsOpen] = useState(false);

    if (evidence === undefined || evidence === null) return null;

    const evidenceItems = Array.isArray(evidence) ? evidence : [evidence];

    return (
        <div className="space-y-2">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
            >
                <span>{isOpen ? "Ẩn bằng chứng" : "Xem bằng chứng"}</span>
                <span className="text-foreground-muted">
                    ({evidenceItems.length})
                </span>
                <span>{isOpen ? "►" : "▼"}</span>
            </button>

            {isOpen && (
                <div className="space-y-3 pt-1">
                    {evidenceItems.map((item, index) => (
                        <React.Fragment key={index}>
                            {renderEvidenceItem(item, index)}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
}
