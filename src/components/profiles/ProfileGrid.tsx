import React from 'react';
import { Profile } from '../../types';
import { ProfileCard } from './ProfileCard';
import { ProfileCardSkeleton } from '../common/Skeleton';
import { EmptyState } from '../common/EmptyState';

export interface ProfileGridProps {
  profiles: Profile[];
  isLoading?: boolean;
  onViewProfile?: (slug: string) => void;
  onRequestService?: (profile: Profile) => void;
  onResetFilters?: () => void;
  className?: string;
}

export function ProfileGrid({
  profiles,
  isLoading = false,
  onViewProfile,
  onRequestService,
  onResetFilters,
  className = '',
}: ProfileGridProps) {
  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 ${className}`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProfileCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <EmptyState
        title="No verified profiles match your criteria"
        description="Try relaxing your filters, changing your metropolitan location, or searching for alternative service specialties."
        actionLabel="Clear all filters"
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 ${className}`}
    >
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          onViewProfile={onViewProfile}
          onRequestService={onRequestService}
        />
      ))}
    </div>
  );
}
