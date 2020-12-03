const axios = require("axios");
const mail = require("./sendMail.js");
const getFromDP = require("./getFromDP.js");

module.exports.getInfo = () => {
  const cpf = process.env.CPF;
  const cpf_url = `https://www.fnde.gov.br/digef/rs/spba/publica/pessoa/1/10/${cpf}`;

  axios
    .get(cpf_url)
    .then((response) => {
      console.log("------------------------------");
      console.log("CPF request successful");
      const currentHash = `https://www.fnde.gov.br/digef/rs/spba/publica/pagamento/${response.data.pessoas[0].hash}`;
      axios
        .get(currentHash)
        .then(async (response) => {
          console.log("Hash request successful");
          // Variables from API
          const payments =
            response.data.programas[0].entidades[78680337000184].funcoes[49]
              .pagamentos;
          const info = {
            paymentsSize: payments.length,
          };

          // Check if it has changed
          const data = await getFromDP.readData();

          console.log(`Current: ${data} x API: ${info.paymentsSize}`);

          if (data != info.paymentsSize) {
            await getFromDP.insertData(info.paymentsSize);
            console.log("Mandando e-mail");
            mail.sendMail(
              (subject = "Bolsa provavelmente caiu!"),
              (text =
                "A API notou uma alteração nos dados, há a chance de a bolsa ter caído. ")
            );
          } else {
            console.log("Payment size remains the same!");
          }
          console.log("------------------------------");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log("Error on CPF_URL"));
};
