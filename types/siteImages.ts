export interface SiteImagesConfig {
  // About Us Section
  aboutImage1: string;
  aboutImage2: string;

  // Hero Section
  heroDesktop: string;
  heroMobile: string;
  heroSignature: string;

  // Brand Identity
  brandLogo: string;

  // Guides & Policies
  bangleSizeGuide: string;
  returnPolicyImage: string;
}

export const defaultSiteImages: SiteImagesConfig = {
  aboutImage1: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800",
  aboutImage2: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800",
  heroDesktop: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=1200",
  heroMobile: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800",
  heroSignature: "/bloom-craft-logo.png",
  brandLogo: "/bloom-craft-logo.png",
  bangleSizeGuide: "/bloom-craft-logo.png",
  returnPolicyImage: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800",
};
