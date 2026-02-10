import BestSelling from "@/components/BestSelling/BestSelling";
import CategoriesCarousel from "@/components/Carrosel/Carrosel";
import CustomizeGarden from "@/components/CustomizeGarden/CustomizeGarden";
import MasonryImageList from "@/components/ImageList/ImageList";
import Offer from "@/components/Offer/Offer";
import Trend from "@/components/Trend/Trend";
import Vases from "@/components/Vase/Vase";

export default function Home() {
  return (
    <main className="bg-green-50">
      <CategoriesCarousel/>
      <BestSelling/>
      <Trend/>
      <Offer/>
      <Vases/>
      <CustomizeGarden/>
      <MasonryImageList/>
    </main>
  );
}
