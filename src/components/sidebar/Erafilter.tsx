// 'use client';

// import { usePostStore } from '@/store/post.store';

// const ERAS = [
//   { id: '', label: 'Tất cả', icon: '📚' },
//   { id: 'ancient', label: 'Cổ Đại', icon: '🏛️' },
//   { id: 'medieval', label: 'Trung Đại', icon: '⚔️' },
//   { id: 'modern', label: 'Hiện Đại', icon: '🏙️' },
//   { id: 'contemporary', label: 'Đương Đại', icon: '🌐' },
// ];

// export default function EraFilter() {
//   // const { selectedEra, setSelectedEra } = usePostStore();

//   return (
//     <div className="space-y-2">
//       {ERAS.map((era) => {
//         const isActive = selectedEra === era.id;
        
//         return (
//           <button
//             key={era.id}
//             onClick={() => setSelectedEra(era.id)}
//             className={`
//               w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
//               ${isActive 
//                 ? 'bg-[#0d1720] shadow-[inset_4px_4px_12px_rgba(0,0,0,0.5),inset_-2px_-2px_8px_rgba(79,111,145,0.1)] text-white' 
//                 : 'text-gray-300 hover:bg-[#0d1720] hover:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.3)]'
//               }
//             `}
//           >
//             <span className="text-2xl">{era.icon}</span>
//             <span className="font-medium">{era.label}</span>
//           </button>
//         );
//       })}
//     </div>
//   );
// }