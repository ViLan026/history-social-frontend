'use client';

import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../user.service';
import { useCurrentUser } from '../useUser';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Avatar from '@/components/ui/Avatar';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal = ({ isOpen, onClose }: EditProfileModalProps) => {
  const { data: currentUser } = useCurrentUser();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    displayName: currentUser?.profile?.displayName || '',
    bio: currentUser?.profile?.bio || '',
    avatarFile: null as File | null,
    avatarPreview: currentUser?.profile?.avatarUrl || '',
  });

  const [errors, setErrors] = useState<{ displayName?: string }>({});

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return userService.updateUser(currentUser!.id, {
        displayName: data.get('displayName') as string,
        bio: data.get('bio') as string,
        avatarUrl: data.get('avatarUrl') as string,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
      onClose();
    },
  });

  const validateForm = (): boolean => {
    const newErrors: { displayName?: string } = {};
    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          avatarFile: file,
          avatarPreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submitData = new FormData();
    submitData.append('displayName', formData.displayName);
    submitData.append('bio', formData.bio);
    submitData.append('avatarUrl', formData.avatarPreview);

    mutation.mutate(submitData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg"
        style={{ backgroundColor: '#F2F1ED' }}
      >
        <h2 className="text-xl font-bold mb-4" style={{ color: '#7F0716' }}>
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <Avatar
              src={formData.avatarPreview}
              alt="Preview"
              className="w-20 h-20 rounded-full"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-lg text-sm"
            >
              Change Avatar
            </Button>
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium mb-2">Display Name</label>
            <Input
              type="text"
              value={formData.displayName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  displayName: e.target.value,
                }))
              }
              placeholder="Your display name"
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.displayName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.displayName && (
              <p className="text-red-500 text-sm mt-1">{errors.displayName}</p>
            )}
          </div>

          {/* Bio Field */}
          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  bio: e.target.value,
                }))
              }
              placeholder="Tell us about yourself"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 resize-none h-24"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg py-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="flex-1 text-white rounded-lg py-2"
              style={{
                backgroundColor: mutation.isPending ? '#ccc' : '#7F0716',
              }}
            >
              {mutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>

        {mutation.isError && (
          <p className="text-red-500 text-sm mt-4">
            Failed to update profile. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};