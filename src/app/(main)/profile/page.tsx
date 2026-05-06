'use client';

import { useState } from 'react';
import { EditProfileModal } from '@/features/user/components/EditProfileModal';
import { ChangePasswordModal } from '@/features/user/components/ChangePasswordModal';
import { useCurrentUser } from '@/features/user/useUser';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';

export default function ProfilePage() {
  const { data: currentUser } = useCurrentUser();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="rounded-xl p-6 mb-6" style={{ backgroundColor: '#F2F1ED' }}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar
              src={currentUser?.profile?.avatarUrl}
              alt={currentUser?.profile?.displayName || undefined}
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#7F0716' }}>
                {currentUser?.profile?.displayName}
              </h1>
              <p className="text-gray-600">@{currentUser?.email}</p>
              <p className="text-sm text-gray-500 mt-2">
                {currentUser?.profile?.bio}
              </p>
            </div>
          </div>

          {/* Edit Button */}
          <Button
            onClick={() => setEditModalOpen(true)}
            style={{ backgroundColor: '#7F0716', color: 'white' }}
            className="px-6 py-2 rounded-lg"
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div
          className="p-4 rounded-xl text-center"
          style={{ backgroundColor: '#F2F1ED' }}
        >
          <p className="text-2xl font-bold" style={{ color: '#7F0716' }}>
            1.2K
          </p>
          <p className="text-sm text-gray-600">Followers</p>
        </div>
        <div
          className="p-4 rounded-xl text-center"
          style={{ backgroundColor: '#F2F1ED' }}
        >
          <p className="text-2xl font-bold" style={{ color: '#7F0716' }}>
            850
          </p>
          <p className="text-sm text-gray-600">Following</p>
        </div>
      </div>

      {/* Settings Section */}
      <div className="rounded-xl p-6 space-y-4" style={{ backgroundColor: '#F2F1ED' }}>
        <h2 className="text-lg font-bold mb-4" style={{ color: '#7F0716' }}>
          Settings
        </h2>

        <Button
          onClick={() => setPasswordModalOpen(true)}
          className="w-full px-4 py-2 rounded-lg text-left"
          style={{ backgroundColor: 'white', color: '#7F0716', border: '1px solid #ddd' }}
        >
          Change Password
        </Button>

        <Button
          className="w-full px-4 py-2 rounded-lg text-left"
          style={{ backgroundColor: 'white', color: '#e74c3c', border: '1px solid #ddd' }}
        >
          Logout
        </Button>
      </div>

      {/* Modals */}
      <EditProfileModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
      />

      <ChangePasswordModal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
      />
    </div>
  );
}