/**
 * Profile Image Mapping System
 * Maps profile IDs to verified high-resolution editorial portrait visual assets
 * depicting tasteful Indian adult lifestyle and portraiture.
 */
export const profileImages: Record<string, string[]> = {
  'profile-001': [
    '/images/profiles/profile-001.webp',
    '/images/profiles/profile-001-2.webp',
    '/images/profiles/profile-001-3.webp',
  ],
  'profile-002': [
    '/images/profiles/profile-002.webp',
    '/images/profiles/profile-002-2.webp',
    '/images/profiles/profile-002-3.webp',
  ],
  'profile-003': [
    '/images/profiles/profile-003.webp',
    '/images/profiles/profile-003-2.webp',
    '/images/profiles/profile-003-3.webp',
  ],
  'profile-004': [
    '/images/profiles/profile-004.webp',
    '/images/profiles/profile-004-2.webp',
    '/images/profiles/profile-004-3.webp',
  ],
  'profile-005': [
    '/images/profiles/profile-005.webp',
    '/images/profiles/profile-005-2.webp',
    '/images/profiles/profile-005-3.webp',
  ],
  'profile-006': [
    '/images/profiles/profile-006.webp',
    '/images/profiles/profile-006-2.webp',
    '/images/profiles/profile-006-3.webp',
  ],
  'profile-007': [
    '/images/profiles/profile-007.webp',
    '/images/profiles/profile-007-2.webp',
    '/images/profiles/profile-007-3.webp',
  ],
  'profile-008': [
    '/images/profiles/profile-008.webp',
    '/images/profiles/profile-008-2.webp',
    '/images/profiles/profile-008-3.webp',
  ],
  'profile-009': [
    '/images/profiles/profile-009.webp',
    '/images/profiles/profile-009-2.webp',
    '/images/profiles/profile-009-3.webp',
  ],
  'profile-010': [
    '/images/profiles/profile-010.webp',
    '/images/profiles/profile-010-2.webp',
    '/images/profiles/profile-010-3.webp',
  ],
  'profile-011': [
    '/images/profiles/profile-011.webp',
    '/images/profiles/profile-011-2.webp',
    '/images/profiles/profile-011-3.webp',
  ],
  'profile-012': [
    '/images/profiles/profile-012.webp',
    '/images/profiles/profile-012-2.webp',
    '/images/profiles/profile-012-3.webp',
  ],
  'profile-013': [
    '/images/profiles/profile-013.webp',
    '/images/profiles/profile-013-2.webp',
    '/images/profiles/profile-013-3.webp',
  ],
  'profile-014': [
    '/images/profiles/profile-014.webp',
    '/images/profiles/profile-014-2.webp',
    '/images/profiles/profile-014-3.webp',
  ],
  'profile-015': [
    '/images/profiles/profile-015.webp',
    '/images/profiles/profile-015-2.webp',
    '/images/profiles/profile-015-3.webp',
  ],
  'profile-016': [
    '/images/profiles/profile-016.webp',
    '/images/profiles/profile-016-2.webp',
    '/images/profiles/profile-016-3.webp',
  ],
  'profile-017': [
    '/images/profiles/profile-017.webp',
    '/images/profiles/profile-017-2.webp',
    '/images/profiles/profile-017-3.webp',
  ],
  'profile-018': [
    '/images/profiles/profile-018.webp',
    '/images/profiles/profile-018-2.webp',
    '/images/profiles/profile-018-3.webp',
  ],
  'profile-019': [
    '/images/profiles/profile-019.webp',
    '/images/profiles/profile-019-2.webp',
    '/images/profiles/profile-019-3.webp',
  ],
  'profile-020': [
    '/images/profiles/profile-020.webp',
    '/images/profiles/profile-020-2.webp',
    '/images/profiles/profile-020-3.webp',
  ],
  'profile-021': [
    '/images/profiles/profile-021.webp',
    '/images/profiles/profile-021-2.webp',
    '/images/profiles/profile-021-3.webp',
  ],
  'profile-022': [
    '/images/profiles/profile-022.webp',
    '/images/profiles/profile-022-2.webp',
    '/images/profiles/profile-022-3.webp',
  ],
  'profile-023': [
    '/images/profiles/profile-023.webp',
    '/images/profiles/profile-023-2.webp',
    '/images/profiles/profile-023-3.webp',
  ],
  'profile-024': [
    '/images/profiles/profile-024.webp',
    '/images/profiles/profile-024-2.webp',
    '/images/profiles/profile-024-3.webp',
  ],
  'profile-025': [
    '/images/profiles/profile-025.webp',
    '/images/profiles/profile-025-2.webp',
    '/images/profiles/profile-025-3.webp',
  ],
  'profile-026': [
    '/images/profiles/profile-026.webp',
    '/images/profiles/profile-026-2.webp',
    '/images/profiles/profile-026-3.webp',
  ],
  'profile-027': [
    '/images/profiles/profile-027.webp',
    '/images/profiles/profile-027-2.webp',
    '/images/profiles/profile-027-3.webp',
  ],
  'profile-028': [
    '/images/profiles/profile-028.webp',
    '/images/profiles/profile-028-2.webp',
    '/images/profiles/profile-028-3.webp',
  ],
  'profile-029': [
    '/images/profiles/profile-029.webp',
    '/images/profiles/profile-029-2.webp',
    '/images/profiles/profile-029-3.webp',
  ],
  'profile-030': [
    '/images/profiles/profile-030.webp',
    '/images/profiles/profile-030-2.webp',
    '/images/profiles/profile-030-3.webp',
  ],
  'profile-031': [
    '/images/profiles/profile-031.webp',
    '/images/profiles/profile-031-2.webp',
    '/images/profiles/profile-031-3.webp',
  ],
  'profile-032': [
    '/images/profiles/profile-032.webp',
    '/images/profiles/profile-032-2.webp',
    '/images/profiles/profile-032-3.webp',
  ],
  'profile-033': [
    '/images/profiles/profile-033.webp',
    '/images/profiles/profile-033-2.webp',
    '/images/profiles/profile-033-3.webp',
  ],
  'profile-034': [
    '/images/profiles/profile-034.webp',
    '/images/profiles/profile-034-2.webp',
    '/images/profiles/profile-034-3.webp',
  ],
};

export function getProfileImages(profileId: string): string[] {
  return (
    profileImages[profileId] || [
      '/images/profiles/profile-001.webp',
      '/images/profiles/profile-001-2.webp',
      '/images/profiles/profile-001-3.webp',
    ]
  );
}
