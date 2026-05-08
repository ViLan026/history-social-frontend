'use client';

import { useQuery } from '@tanstack/react-query';
import { userService } from '../../user/user.service';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';

interface FollowListModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  type: 'followers' | 'following';
}

const LoadingCard = ({ count = 3 }: { count?: number }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="flex items-center gap-3 p-4 rounded-lg animate-pulse"
        style={{ backgroundColor: '#F2F1ED' }}
      >
        <div className="w-12 h-12 rounded-full bg-gray-300" />
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded w-24 mb-2" />
          <div className="h-3 bg-gray-300 rounded w-16" />
        </div>
      </div>
    ))}
  </>
);

export const FollowListModal = ({
  isOpen,
  onClose,
  userId,
  type,
}: FollowListModalProps) => {
  const { data: users = [], isLoading } = useQuery({
    queryKey: [`follow-${type}`, userId],
    queryFn: () => userService.getAllUsers({ keyword: userId, page: 1, size: 50 }),
    enabled: isOpen && !!userId,
  });

  if (!isOpen) return null;

  const title = type === 'followers' ? 'Followers' : 'Following';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg max-h-96 flex flex-col"
        style={{ backgroundColor: '#F2F1ED' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold" style={{ color: '#7F0716' }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-bold text-2xl"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto flex-1 space-y-3">
          {isLoading ? (
            <LoadingCard count={5} />
          ) : users.content && users.content.length > 0 ? (
            users.content.map((user: any) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <Avatar
                    src={user.avatarUrl}
                    alt={user.displayName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-sm">{user.displayName}</p>
                    <p className="text-xs text-gray-500">@{user.email}</p>
                  </div>
                </div>
                <Button
                  className="text-sm px-3 py-1 rounded-lg"
                  style={{
                    backgroundColor: '#7F0716',
                    color: 'white',
                  }}
                >
                  {type === 'followers' ? 'Follow Back' : 'Following'}
                </Button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">
              No {title.toLowerCase()} yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};