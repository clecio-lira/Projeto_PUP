import MasonryImageList from "@/components/ImageList/ImageList";
import React from "react";

const About = () => {
  return (
    <section className="bg-green-50 text-green-900 font-sans">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          🌱 Bem-vindo ao Plante uma Planta!
        </h1>

        <p className="mb-4">
          No coração do nosso negócio está o amor pelas plantas e a crença de
          que cada folhinha carrega um pedacinho de vida que transforma qualquer
          ambiente. Aqui, você vai encontrar uma seleção cuidadosamente
          cultivada de plantas para todos os estilos, espaços e objetivos: de
          pequenos vasos para sua mesa de trabalho a plantas de porte médio para
          trazer aquele toque verde à sala de estar.
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mt-6 mb-2">
          🌿 Por que escolher nossas plantas?
        </h2>

        <p className="mb-4">
          Cada planta em nosso catálogo é cultivada com carinho e atenção.
          Garantimos que todas cheguem à sua casa saudáveis e prontas para
          crescer ao seu lado. Além disso, acreditamos que o cultivo das plantas
          vai muito além da estética: é sobre conexão com a natureza, bem-estar
          e harmonia.
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mt-6 mb-2">
          🌻 Nossa seleção:
        </h2>

        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>
            <strong>Plantas Briófitas</strong>: musgos e outras plantas que
            trazem um toque de delicadeza e textura para ambientes úmidos e
            sombreados.
          </li>
          <li>
            <strong>Pteridófitas</strong>: samambaias e avencas que trazem
            leveza e frescor para qualquer espaço, ideais para ambientes
            internos.
          </li>
          <li>
            <strong>Gimnospermas</strong>: coníferas e pinheiros que se adaptam
            a diferentes condições e trazem um ar de natureza selvagem e
            resistente.
          </li>
          <li>
            <strong>Angiospermas</strong>: plantas com flores e frutos que
            trazem cor, vida e aroma para sua casa ou jardim.
          </li>
          <li>
            <strong>Vasos e acessórios</strong>: explore nossa seleção de vasos
            e suportes para valorizar suas plantas e decorar seu ambiente com
            estilo.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-green-600 mt-6 mb-2">
          🌼 Nossa missão
        </h2>

        <p className="mb-4">
          Queremos que você tenha uma experiência única e satisfatória. Por
          isso, além de plantas incríveis, oferecemos dicas práticas de cuidado
          e cultivo, para que você se sinta confiante e animado para ver cada
          folhinha crescer. A natureza tem muito a nos ensinar, e estamos aqui
          para ajudar você a aproveitar ao máximo essa jornada verde.
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mt-6 mb-2">
          🌱 Explore, escolha e transforme seu espaço.
        </h2>

        <p className="mb-4">
          Deixe a natureza entrar na sua vida – ela vai trazer serenidade,
          beleza e um toque especial de frescor todos os dias!
        </p>

        <h3 className="text-xl font-semibold text-green-700 mt-6 mb-2">
          🌿 Comece agora!
        </h3>

        <p>Descubra as plantas que vão florescer junto com você.</p>
      </div>

      <MasonryImageList />
    </section>
  );
};

export default About;
