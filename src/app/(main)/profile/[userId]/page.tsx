// src/app/(main)/profile/[userId]/page.tsx

import OtherProfileClient from "./OtherProfileClient";

interface PageProps {
    params: Promise<{
        userId: string;
    }>;
}

export default async function OtherProfilePage({ params }: PageProps) {
    const { userId } = await params;

    return <OtherProfileClient userId={userId} />;
}