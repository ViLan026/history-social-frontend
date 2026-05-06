'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '@/components/ui/Button';
import { formatDistanceToNow } from 'date-fns';

interface UserDraftCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    updatedAt: string;
  };
  onEdit?: (postId: string) => void;
  onDelete?: (postId: string) => void;
}

export default function UserDraftCard({
  post,
  onEdit,
  onDelete,
}: UserDraftCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (postId: string) => {
      // Call your post service to delete
      // return postService.deletePost(postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-posts'] });
      setShowConfirm(false);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  const preview = post.content
    .replace(/<[^>]*>/g, '')
    .substring(0, 100)
    .concat('...');

  return (
    <div
      className="p-4 rounded-xl border border-gray-300 hover:shadow-md transition flex items-center justify-between"
      style={{ backgroundColor: '#F2F1ED' }}
    >
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-1" style={{ color: '#7F0716' }}>
          {post.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{preview}</p>
        <p className="text-xs text-gray-500">
          Last updated {formatDistanceToNow(new Date(post.updatedAt), { addSuffix: true })}
        </p>
      </div>

      <div className="flex gap-2 ml-4">
        <Button
          onClick={() => onEdit?.(post.id)}
          className="px-4 py-2 rounded-lg text-sm"
          style={{ backgroundColor: '#7F0716', color: 'white' }}
        >
          Edit
        </Button>
        <Button
          onClick={() => setShowConfirm(true)}
          className="px-4 py-2 rounded-lg text-sm bg-red-500 hover:bg-red-600 text-white"
        >
          Delete
        </Button>
      </div>

      {/* Delete Confirmation */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm">
            <h3 className="font-bold mb-2">Delete Draft?</h3>
            <p className="text-gray-600 mb-4">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-gray-300 text-gray-700 rounded-lg py-2"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="flex-1 bg-red-500 text-white rounded-lg py-2"
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}