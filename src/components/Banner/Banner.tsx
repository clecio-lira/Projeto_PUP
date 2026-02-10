import Image from "next/image";
import bannerImage from "@/assets/images/banner.jpeg";

export default function Banner() {
  return (
    <section className="relative w-full h-44 flex items-center justify-center shadow-md shadow-gray-500">
      <Image
        src={bannerImage}
        alt="Banner"
        fill
        quality={100}
        priority
        className="object-cover"
      />
      <p className="absolute tracking-widest text-white text-3xl md:text-5xl wordspa font-bold">
        Plante uma Planta
      </p>
    </section>
  );
}
