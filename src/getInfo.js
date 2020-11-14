const axios = require("axios");
const fs = require("fs");
const path = require("path");
const env = require("dotenv").config().parsed;

const mail = require("./sendMail.js");

module.exports.getInfo = () => {
  const cpf = env.CPF;
  const cpf_url = `https://www.fnde.gov.br/digef/rs/spba/publica/pessoa/1/10/${cpf}`;
  console.log("Fuck");
  axios.get(cpf_url).then((response) => {
    console.log("Reaching here");
    const currentHash = `https://www.fnde.gov.br/digef/rs/spba/publica/pagamento/${response.data.pessoas[0].hash}`;
    axios.get(currentHash).then((response) => {
      // Variables from API
      const payments =
        response.data.programas[0].entidades[78680337000184].funcoes[49]
          .pagamentos;
      const info = {
        paymentsSize: payments.length,
      };

      // Check if it has changed
      const rawData = fs.readFileSync(
        path.join(__dirname, "..", "storage", "info.json")
      );
      const data = JSON.parse(rawData);

      console.log(`${data.paymentsSize} x ${info.paymentsSize}`);

      if (data.paymentsSize != info.paymentsSize + 1) {
        fs.writeFile(
          path.join(__dirname, "..", "storage", "info.json"),
          JSON.stringify(info),
          (e) => console.log(e)
        );

        mail.sendMail(
          (subject = "Bolsa provavelmente caiu!"),
          (text =
            "A API notou uma alteração nos dados, há a chance de a bolsa ter caído. ")
        );
      }
    });
  });
};
