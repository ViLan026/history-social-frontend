// // components/layout/SidebarDrawer.tsx
// "use client";

// import { useEffect, useRef } from "react";

// interface SidebarDrawerProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
//   side?: "left" | "right"; 
//   title?: string;
// }

// export default function SidebarDrawer({
//   isOpen,
//   onClose,
//   children,
//   side = "left",
//   title = "Menu",
// }: SidebarDrawerProps) {
//   const drawerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (isOpen && drawerRef.current) {
//       drawerRef.current.focus();
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const isLeft = side === "left";
//   const positionClasses = isLeft ? "left-0" : "right-0";
//   const animationClasses = isLeft ? "animate-slide-left" : "animate-slide-right";
//   const borderClasses = isLeft
//     ? "border-r border-[var(--sidebar-border)]"
//     : "border-l border-[var(--sidebar-border)]";


//   // Menu trái ẩn ở lg (1024px), Menu phải ẩn ở xl (1280px)
//   const hiddenClass = isLeft ? "lg:hidden" : "xl:hidden";

//   return (
   
//     <div className={`fixed inset-0 z-50 ${hiddenClass}`} aria-modal="true" role="dialog">
      
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 animate-fade-in"
//         style={{ backgroundColor: "oklch(0 0 0 / 0.6)" }}
//         onClick={onClose}
//         aria-hidden="true"
//       />

//       {/* Drawer panel */}
//       <div
//         ref={drawerRef}
//         tabIndex={-1}
//         className={`
//           absolute top-0 bottom-0
//           w-[280px] max-w-[85vw]
//           overflow-y-auto focus:outline-none shadow-2xl  px-4
//           ${positionClasses}
//           ${animationClasses}
//           ${borderClasses}
//         `}
//         style={{ backgroundColor: "var(--sidebar-bg)" }}
//       >
//         <div
//           className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b"
//           style={{
//             backgroundColor: "var(--sidebar-bg)",
//             borderColor: "var(--sidebar-border)",
//           }}
//         >
//           <span
//             className="text-sm font-semibold tracking-wide"
//             style={{ color: "var(--foreground-muted)" }}
//           >
//             {title}
//           </span>
//           <button
//             onClick={onClose}
//             className="p-1.5 rounded-md transition-colors duration-150 hover:bg-[var(--surface-raised)] hover:text-[var(--foreground)]"
//             style={{ color: "var(--foreground-muted)" }}
//             aria-label="Đóng menu"
//           >
//             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <line x1="18" y1="6" x2="6" y2="18" />
//               <line x1="6" y1="6" x2="18" y2="18" />
//             </svg>
//           </button>
//         </div>
//         <div className="py-2">{children}</div>
//       </div>
//     </div>
//   );
// }