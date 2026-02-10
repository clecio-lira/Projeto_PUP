import Image from "next/image";
import garden from "@/assets/images/garden.jpeg";

export default function CustomizeGarden() {
  return (
    <section className="flex flex-col p-4 mt-8 items-center justify-center">
      <div className="p-4 bg-white rounded-md shadow-md shadow-gray-500 flex flex-col md:flex-row gap-4 md:w-10/12 lg:w-10/12 xl:w-8/12 2xl:w-6/12">
        <div className="md:w-1/2">
          <h2 className="font-semibold text-2xl mb-4">Customize seu Jardim.</h2>
          <p>
            Cada jardim é único e especial, assim como cada pessoa. Por isso,
            oferecemos uma seleção de plantas e acessórios que permitem que você
            crie um espaço que reflita seu estilo e necessidades. Desde plantas
            tropicais exuberantes a vasinhos minimalistas e suportes elegantes,
            aqui você encontra tudo para dar aquele toque de charme e
            praticidade. Explore nossa coleção e transforme seu jardim em um
            lugar cheio de vida, cor e inspiração!
          </p>
        </div>
        <Image
          src={garden}
          alt="Banner"
          quality={100}
          loading="lazy"
          className="md:w-1/2 object-cover"
        />
      </div>
    </section>
  );
}
