// Central image registry. All photo URLs live here so swapping sources is a one-file edit.
// Every URL below has been HTTP-verified to return 200.

const base = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// Before/After gallery — each case uses ONE real smile photo; the BeforeAfter component
// applies a sepia/dim filter to the "before" layer and a bright/crisp filter to the "after"
// layer of the same image, so dragging the slider reveals a whitening transformation.
// Six distinct photos, two per tab, indexed [0] and [1] in SmileGallery.tsx.
export const galleryImages = {
  invisalign: [base('photo-1494790108377-be9c29b29330', 900), base('photo-1506794778202-cad84cf45f1d', 900)],
  veneers: [base('photo-1438761681033-6461ffad8d80', 900), base('photo-1547425260-76bcadfb4f2c', 900)],
  whitening: [base('photo-1544005313-94ddf0286df2', 900), base('photo-1524504388940-b1c1722653e1', 900)],
} as const;

// Doctor portraits (portrait orientation, object-cover)
export const doctorImages: Record<string, string> = {
  'maya-reyes': base('photo-1573496359142-b8d87734a5a2', 700),
  'james-okonkwo': base('photo-1500648767791-00dcc994a43e', 700),
  'sara-lindqvist': base('photo-1551836022-deb4988cc6c0', 700),
};

// Hero — a bright, friendly smile portrait
export const heroImage = base('photo-1535713875002-d1d0cf377fde', 900);
