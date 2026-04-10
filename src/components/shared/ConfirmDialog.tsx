// "use client";

// import * as React from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment } from "react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/Button";

// export interface ConfirmDialogProps {
//   open: boolean;
//   title?: string;
//   description?: string;
//   confirmText?: string;
//   cancelText?: string;
//   isLoading?: boolean;
//   onConfirm: () => Promise<void> | void;
//   onClose: () => void;
// }

// export function ConfirmDialog({
//   open,
//   title = "Confirm",
//   description = "Are you sure you want to continue?",
//   confirmText = "Confirm",
//   cancelText = "Cancel",
//   isLoading = false,
//   onConfirm,
//   onClose,
// }: ConfirmDialogProps) {
//   const handleConfirm = async () => {
//     try {
//       await onConfirm();
//     } catch (error) {
//       console.error("ConfirmDialog error:", error);
//     }
//   };

//   return (
//     <Transition show={open} as={Fragment}>
//       <Dialog onClose={onClose} className="relative z-50">
//         {/* Overlay */}
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-200"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-150"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
//         </Transition.Child>

//         {/* Content */}
//         <div className="fixed inset-0 flex items-center justify-center p-4">
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-200"
//             enterFrom="opacity-0 scale-95"
//             enterTo="opacity-100 scale-100"
//             leave="ease-in duration-150"
//             leaveFrom="opacity-100 scale-100"
//             leaveTo="opacity-0 scale-95"
//           >
//             <Dialog.Panel
//               className={cn(
//                 "w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
//               )}
//             >
//               <Dialog.Title className="text-lg font-semibold text-gray-900">
//                 {title}
//               </Dialog.Title>

//               <Dialog.Description className="mt-2 text-sm text-gray-600">
//                 {description}
//               </Dialog.Description>

//               <div className="mt-6 flex justify-end gap-3">
//                 <Button
//                   variant="ghost"
//                   onClick={onClose}
//                   disabled={isLoading}
//                 >
//                   {cancelText}
//                 </Button>

//                 <Button
//                   variant="primary"
//                   onClick={handleConfirm}
//                   isLoading={isLoading}
//                 >
//                   {confirmText}
//                 </Button>
//               </div>
//             </Dialog.Panel>
//           </Transition.Child>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// }