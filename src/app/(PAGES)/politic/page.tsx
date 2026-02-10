import React from "react";

const Politic = () => {
  return (
    <section className="bg-green-50 text-green-900 font-sans">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          🔒 Política de Privacidade
        </h1>

        <p className="mb-4">
          A sua privacidade é importante para nós. Esta Política de Privacidade
          descreve como coletamos, usamos e protegemos as suas informações
          pessoais ao utilizar nosso e-commerce de plantas.
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mt-6 mb-2">
          📦 Coleta de informações
        </h2>
        <p className="mb-4">
          Coletamos informações como nome, e-mail, endereço e telefone quando
          você faz um pedido ou se cadastra em nossa loja. Esses dados são
          utilizados apenas para processar suas compras e oferecer a melhor
          experiência possível.
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mt-6 mb-2">
          🔐 Uso das informações
        </h2>
        <p className="mb-4">Utilizamos seus dados para:</p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Processar e entregar seus pedidos.</li>
          <li>
            Entrar em contato com você sobre seu pedido ou sobre novidades e
            promoções (caso tenha autorizado).
          </li>
          <li>
            Melhorar nossos serviços e personalizar sua experiência em nosso
            site.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-green-600 mt-6 mb-2">
          🛡️ Proteção das informações
        </h2>
        <p className="mb-4">
          Seus dados são armazenados de forma segura e nunca são compartilhados
          com terceiros, exceto quando necessário para concluir seu pedido (por
          exemplo, transporte e entrega).
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mt-6 mb-2">
          🍃 Cookies
        </h2>
        <p className="mb-4">
          Usamos cookies para melhorar sua navegação e personalizar sua
          experiência em nossa loja. Você pode desativar os cookies no seu
          navegador, mas isso pode afetar algumas funcionalidades do site.
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mt-6 mb-2">
          📞 Contato
        </h2>
        <p className="mb-4">
          Se tiver dúvidas sobre esta Política de Privacidade ou quiser acessar,
          corrigir ou excluir suas informações, entre em contato conosco pelo
          e-mail:{" "}
          <a
            href="mailto:contato@lojadeplantas.com.br"
            className="text-green-700 underline"
          >
            contato@lojadeplantas.com.br
          </a>
          .
        </p>

        <p className="mt-6 text-sm text-green-700">
          Esta política pode ser atualizada periodicamente. Recomendamos que
          você consulte esta página regularmente para se manter informado.
        </p>
      </div>
    </section>
  );
};

export default Politic;
