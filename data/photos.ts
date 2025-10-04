
export interface Photo {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  uploadedBy: string;
  uploadedDate: string;
  event?: string;
  tags: string[];
  likes: number;
  likedBy: string[];
}

export interface PhotoAlbum {
  id: string;
  title: string;
  description: string;
  coverPhoto: string;
  photos: Photo[];
  createdDate: string;
  createdBy: string;
}

// Mock photo data
export const photos: Photo[] = [
  {
    id: '1',
    title: 'Community Service Day',
    description: 'Explorers helping at the local food bank',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop',
    uploadedBy: '1', // Sarah Johnson
    uploadedDate: '2024-01-15',
    event: 'Community Service - Food Bank',
    tags: ['community service', 'volunteering', 'food bank'],
    likes: 12,
    likedBy: ['1', '2', '3', '4', '5'],
  },
  {
    id: '2',
    title: 'Training Exercise',
    description: 'Traffic control training at the academy',
    imageUrl: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=600&fit=crop',
    uploadedBy: '4', // Officer Wilson
    uploadedDate: '2024-01-10',
    event: 'Training - Traffic Control',
    tags: ['training', 'traffic control', 'academy'],
    likes: 8,
    likedBy: ['1', '2', '3', '4'],
  },
  {
    id: '3',
    title: 'Awards Ceremony',
    description: 'Annual Explorer recognition ceremony',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
    uploadedBy: '6', // Officer Martinez
    uploadedDate: '2024-01-05',
    event: 'Awards Ceremony 2024',
    tags: ['awards', 'ceremony', 'recognition'],
    likes: 15,
    likedBy: ['1', '2', '3', '4', '5', '6', '7'],
  },
  {
    id: '4',
    title: 'Beach Patrol',
    description: 'Explorers assisting with beach safety patrol',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    uploadedBy: '2', // Michael Chen
    uploadedDate: '2024-01-20',
    event: 'Beach Patrol Detail',
    tags: ['beach patrol', 'safety', 'community'],
    likes: 10,
    likedBy: ['1', '2', '3', '4', '5', '6'],
  },
  {
    id: '5',
    title: 'First Aid Training',
    description: 'CPR and First Aid certification training',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
    uploadedBy: '3', // Emily Rodriguez
    uploadedDate: '2024-01-12',
    event: 'First Aid Certification',
    tags: ['first aid', 'cpr', 'training', 'certification'],
    likes: 9,
    likedBy: ['1', '2', '3', '4', '5'],
  },
  {
    id: '6',
    title: 'Team Building',
    description: 'Explorer team building activities at the park',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop',
    uploadedBy: '5', // Ashley Thompson
    uploadedDate: '2024-01-08',
    event: 'Team Building Day',
    tags: ['team building', 'activities', 'park'],
    likes: 11,
    likedBy: ['1', '2', '3', '4', '5', '6'],
  },
  {
    id: '7',
    title: 'Graduation Ceremony',
    description: 'Explorer graduation and promotion ceremony',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
    uploadedBy: '6', // Officer Martinez
    uploadedDate: '2024-01-25',
    event: 'Graduation Ceremony 2024',
    tags: ['graduation', 'ceremony', 'promotion'],
    likes: 18,
    likedBy: ['1', '2', '3', '4', '5', '6', '7', '8'],
  },
  {
    id: '8',
    title: 'K-9 Unit Demo',
    description: 'K-9 unit demonstration for the explorers',
    imageUrl: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800&h=600&fit=crop',
    uploadedBy: '4', // Officer Wilson
    uploadedDate: '2024-01-18',
    event: 'K-9 Unit Training',
    tags: ['k9', 'training', 'demonstration'],
    likes: 14,
    likedBy: ['1', '2', '3', '4', '5', '6', '7'],
  },
  {
    id: '9',
    title: 'Community Outreach',
    description: 'Explorers at the community safety fair',
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=600&fit=crop',
    uploadedBy: '2', // Michael Chen
    uploadedDate: '2024-01-22',
    event: 'Community Safety Fair',
    tags: ['community', 'outreach', 'safety fair'],
    likes: 13,
    likedBy: ['1', '2', '3', '4', '5', '6'],
  },
  {
    id: '10',
    title: 'Ride Along',
    description: 'Explorer ride along with patrol officers',
    imageUrl: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=600&fit=crop',
    uploadedBy: '3', // Emily Rodriguez
    uploadedDate: '2024-01-14',
    event: 'Patrol Ride Along',
    tags: ['ride along', 'patrol', 'experience'],
    likes: 16,
    likedBy: ['1', '2', '3', '4', '5', '6', '7', '8'],
  },
];

export const photoAlbums: PhotoAlbum[] = [
  {
    id: '1',
    title: 'Community Service 2024',
    description: 'Photos from our community service activities',
    coverPhoto: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop',
    photos: photos.filter(p => p.tags.includes('community service') || p.tags.includes('community')),
    createdDate: '2024-01-01',
    createdBy: '4', // Officer Wilson
  },
  {
    id: '2',
    title: 'Training & Certifications',
    description: 'Training sessions and certification events',
    coverPhoto: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=600&fit=crop',
    photos: photos.filter(p => p.tags.includes('training') || p.tags.includes('k9') || p.tags.includes('first aid')),
    createdDate: '2024-01-01',
    createdBy: '6', // Officer Martinez
  },
  {
    id: '3',
    title: 'Special Events',
    description: 'Awards ceremonies and special occasions',
    coverPhoto: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
    photos: photos.filter(p => p.tags.includes('awards') || p.tags.includes('ceremony') || p.tags.includes('graduation')),
    createdDate: '2024-01-01',
    createdBy: '3', // Emily Rodriguez
  },
  {
    id: '4',
    title: 'Team Activities',
    description: 'Team building and group activities',
    coverPhoto: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop',
    photos: photos.filter(p => p.tags.includes('team building') || p.tags.includes('activities')),
    createdDate: '2024-01-01',
    createdBy: '5', // Ashley Thompson
  },
];

// Helper functions
export const getPhotoById = (id: string): Photo | undefined => {
  return photos.find(photo => photo.id === id);
};

export const getAlbumById = (id: string): PhotoAlbum | undefined => {
  return photoAlbums.find(album => album.id === id);
};

export const getPhotosByTag = (tag: string): Photo[] => {
  return photos.filter(photo => photo.tags.includes(tag));
};

export const getPhotosByUploader = (uploaderId: string): Photo[] => {
  return photos.filter(photo => photo.uploadedBy === uploaderId);
};

export const likePhoto = (photoId: string, userId: string): void => {
  const photo = photos.find(p => p.id === photoId);
  if (photo) {
    if (!photo.likedBy.includes(userId)) {
      photo.likedBy.push(userId);
      photo.likes++;
    }
  }
};

export const unlikePhoto = (photoId: string, userId: string): void => {
  const photo = photos.find(p => p.id === photoId);
  if (photo) {
    const index = photo.likedBy.indexOf(userId);
    if (index > -1) {
      photo.likedBy.splice(index, 1);
      photo.likes--;
    }
  }
};
