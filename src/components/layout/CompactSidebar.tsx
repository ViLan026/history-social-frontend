// components/layout/CompactSidebar.tsx
"use client";

import { useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

interface CompactSidebarProps {
  children: React.ReactNode;
}

export default function CompactSidebar({ children }: CompactSidebarProps) {
  return (
    <Tooltip.Provider delayDuration={200}>
      <div className="h-full overflow-y-auto no-scrollbar py-4">
        <nav className="flex flex-col items-center gap-2 px-2">
          {/* Logo/Home */}
          <CompactNavItem icon={<HomeIcon />} label="Trang chủ" href="/" />
          <CompactNavItem icon={<ExploreIcon />} label="Khám phá" href="/explore" />
          <CompactNavItem icon={<NotificationIcon />} label="Thông báo" href="/notifications" />
          <CompactNavItem icon={<ProfileIcon />} label="Trang cá nhân" href="/profile" />
          <CompactNavItem icon={<ProfileIcon />} label="Trang cá nhân" href="/profile" />
          
          <div className="my-2 w-8 h-px bg-border" />
          
          <CompactNavItem icon={<SettingsIcon />} label="Cài đặt" href="/settings" />
        </nav>
      </div>
    </Tooltip.Provider>
  );
}

interface CompactNavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

function CompactNavItem({ icon, label, href }: CompactNavItemProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <a
          href={href}
          className="flex items-center justify-center w-12 h-12 rounded-xl text-foreground-muted hover:text-foreground hover:bg-surface-raised transition-colors"
          aria-label={label}
        >
          {icon}
        </a>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="right"
          sideOffset={8}
          className="px-3 py-2 text-sm font-medium bg-surface border border-border rounded-lg shadow-lg z-50"
        >
          {label}
          <Tooltip.Arrow className="fill-border" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

function HomeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function ExploreIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function NotificationIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {/* Calendar */}
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 2v4M16 2v4M3 10h18M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/>

      {/* Clock */}
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v-3l2-2"/>
    </svg>
  );
}