// Copy from the Landing frame (143:64). Figma typos corrected: Serveys, Consultans, Appoinment, Consultalting.
export const landingNav = [
  { label: "Shop", href: "/shop" },
  { label: "Consultation", href: "/consultation" },
  { label: "Surveys", href: "/consultation#how-it-works" },
  { label: "FAQ", href: "/contact#faq" },
  { label: "Blog", href: "/about" },
];

export const services = [
  { slug: "skin", title: "Skin", icon: "consult-skin" },
  { slug: "hair", title: "Hair", icon: "consult-hair" },
  { slug: "feeding", title: "Feeding", icon: "consult-feeding" },
] as const;

export const serviceCopy =
  "Lorem ipsum dolor sit amet consectetur. Ac facilisi magna bibendum eget et quis. Aenean imperdiet sed tristique suspendisse nibh purus. Accumsan amet nisi erat pulvinar ullamcorper faucibus turpis eu. Ut vestibulum sed mauris ut faucibus elementum potenti pharetra. Cum rhoncus arcu elementum blandit maecenas facilisi non urna. Elit Ut vestibulum sed.";

export const steps = [
  { title: "Answer Surveys", icon: "step-survey" },
  { title: "Sign Up", icon: "step-signup" },
  { title: "Book Appointment", icon: "step-appointment" },
] as const;

export const stepCopy =
  "Lorem ipsum dolor sit amet Volutpat placerat mauris mauris nunc sed. Tortor arcu vestibulum vel in etiam";

export const consultants = [
  { name: "Jenny Wilson", avatar: "/images/consultation/consultant-jenny-wilson.webp" },
  { name: "Esther Howard", avatar: "/images/consultation/consultant-esther-howard.webp" },
  { name: "Kristin Watson", avatar: "/images/consultation/consultant-kristin-watson.webp" },
  { name: "Robert Fox", avatar: "/images/consultation/consultant-robert-fox.webp" },
].map((c) => ({
  ...c,
  role: "Cosmetologist",
  bio: "Lorem ipsum dolor sit amet .Have you always had that special interest in beauty products such as body lotions, facial washes,moisturizers.",
  specialist: "Lorem ipsum dolor sit amet special interest skin products.",
  rating: 5,
  reviews: 215,
}));

export const testimonials = [
  {
    name: "Esther Howard",
    avatar: "/images/consultation/testimonial-esther-howard.webp",
    quote:
      "Lorem ipsum dolor sit amet consectetur. Pharetra dolor ultrices magna vel eleifend Vestibulum senectus vestibulum grants.",
  },
  {
    name: "Jenny Wilson",
    avatar: "/images/consultation/testimonial-jenny-wilson.webp",
    quote:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type specimen book. It has survived not only specimen book. It has survived not just.",
  },
  {
    name: "Dianne Russell",
    avatar: "/images/consultation/testimonial-dianne-russell.webp",
    quote:
      "Lorem ipsum dolor sit amet consectetur. Pharetra dolor ultrices magna vel eleifend Vestibulum senectus vestibulum grants.",
  },
];

export const whyPoints = Array.from({ length: 3 }, () => ({
  title: "Lorem ipsum dolor sit amet consectetur.",
  text: "Lorem ipsum dolor sit amet consectetur. Maecenas aliquam id ac suspendisse praesent tristique cras faucibus aenean. At erat.",
}));
