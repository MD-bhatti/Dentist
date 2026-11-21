export type Doctor = {
  id: string;
  name: string;
  credentials: string;
  role: string;
  specialty: string;
  bio: string;
  initials: string;
  tint: string;
};

export const doctors: Doctor[] = [
  {
    id: 'maya-reyes',
    name: 'Dr. Maya Reyes',
    credentials: 'DDS, FAGD',
    role: 'Founder & Lead Cosmetic Dentist',
    specialty: 'Cosmetic & Invisalign',
    bio: 'Fellow of the Academy of General Dentistry with 16 years sculpting natural, luminous smiles. Maya leads our Invisalign and veneer programs.',
    initials: 'MR',
    tint: 'from-teal-400 to-teal-600',
  },
  {
    id: 'james-okonkwo',
    name: 'Dr. James Okonkwo',
    credentials: 'DDS, MS',
    role: 'Implant & Restorative Specialist',
    specialty: 'Implants & Surgery',
    bio: 'Board-eligible periodontist trained at UT Health Houston. James places every implant with 3D-guided precision for a lifetime of stability.',
    initials: 'JO',
    tint: 'from-navy-500 to-navy-700',
  },
  {
    id: 'sara-lindqvist',
    name: 'Dr. Sara Lindqvist',
    credentials: 'DDS',
    role: 'General & Family Dentist',
    specialty: 'Family & Emergency',
    bio: 'Known for her calm, gentle touch, Sara cares for every age — from first checkups to urgent same-day relief. Fluent in English and Swedish.',
    initials: 'SL',
    tint: 'from-gold-400 to-teal-500',
  },
];
