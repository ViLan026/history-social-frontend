"use client";

import Link from "next/link";
import OnThisDayCard from "./OnThisDayCard";
import { useTodayEvents } from "../useOnThisDay";

export default function TodayInHistory() {
    const { data: events = [], isLoading } = useTodayEvents();

    // Lấy tối đa 3 sự kiện để hiển thị ở khung rút gọn
    const displayedEvents = events.slice(0, 3);

    return (
        <section className="bg-surface rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
                <div>
                    <h3 className="font-semibold text-lg text-foreground">
                        Ngày này năm xưa
                    </h3>
                    {/* <p className="text-sm text-foreground-muted">
                        Historical moments
                    </p> */}
                </div>
            </div>

            <div className="space-y-4">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-24 bg-muted/50 animate-pulse rounded-xl"
                        />
                    ))
                ) : displayedEvents.length > 0 ? (
                    <>
                        <div className="space-y-4">
                            {displayedEvents.map((event) => (
                                <OnThisDayCard
                                    key={event.id}
                                    event={event}
                                    compact
                                />
                            ))}
                        </div>

                        {events.length > 3 && (
                            <Link
                                href="/on-this-day"
                                className="mt-2 block text-center text-sm font-medium text-primary hover:text-primary/80 transition-colors pt-2"
                            >
                                Xem tất cả sự kiện →
                            </Link>
                        )}
                        {events.length <= 3 && (
                            <Link
                                href="/on-this-day"
                                className="mt-2 block text-center text-sm font-medium text-primary hover:text-primary/80 transition-colors pt-2"
                            >
                                Xem chi tiết sự kiện
                            </Link>
                        )}
                    </>
                ) : (
                    <p className="text-sm text-foreground-muted py-4">
                        Không có dữ liệu hôm nay.
                    </p>
                )}
            </div>
        </section>
    );
}
