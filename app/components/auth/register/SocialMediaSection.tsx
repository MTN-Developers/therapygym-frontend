// Social Media Section
// import facebook from "@/assets/images/facebook.svg";
// import twitter from "@/assets/images/Twitter.svg";
import google from "@/assets/images/google.svg";
import Image from "next/image";
const SocialMediaSection = ({ t }) => {
  // Constants
  const SOCIAL_MEDIA_ICONS = [
    // { src: twitter, alt: "twitter" },
    // { src: facebook, alt: "facebook" },
    { src: google, alt: "google" },
  ];
  return (
    <div className="flex w-full flex-col gap-4 items-center justify-center lg:hidden mb-[20px]">
      <p className="text-gray-500">{t("Or")}</p>
      <div className="flex w-full items-center justify-center gap-[48px]">
        {SOCIAL_MEDIA_ICONS.map(({ src, alt }) => (
          <Image key={alt} src={src} alt={alt} />
        ))}
      </div>
    </div>
  );
};

export default SocialMediaSection;
