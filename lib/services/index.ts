// Central export for all CMS services
export * from './articleService';
export * from './authorService';
export * from './categoryService';
export * from './imageService';

export { 
  getAuthorAvatarUrl as getAvatar,
  getAuthorDisplayName as getAuthor,
  getAuthorInterest as getInterest,
  getAuthorDescription as getDescription
} from './authorService';

export {
  resolveImageUrl as getImage,
  resolveThumbnailUrl as getThumbnail,
  resolveAvatarUrl as getProfilePicture,
  resolveHeroImageUrl as getHeroImage
} from './imageService';
