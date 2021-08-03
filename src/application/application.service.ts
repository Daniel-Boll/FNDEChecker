import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { AppSearchDto } from "./dto/app-search.dto";

interface CPFURLPayload {
  pessoas: [{ hash: string }];
}

interface HashURLPayload {
  programas: [{ entidades: { funcoes: Array<any> } }];
}

@Injectable()
export class ApplicationService {
  constructor(private httpService: HttpService) {}

  async search(appSearchDto: AppSearchDto): Promise<Array<any>> {
    const baseURL = "https://www.fnde.gov.br/digef/rs/spba/publica";
    const cpfURL = `${baseURL}/pessoa/1/10/${appSearchDto.cpf}`;

    const {
      data: {
        pessoas: [usuario],
      },
    } = await this.httpService
      .get(cpfURL)
      .toPromise<AxiosResponse<CPFURLPayload>>();

    if(!usuario) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "CPF não encontrado",
        },
        HttpStatus.NOT_FOUND,
      );
    };

    const { hash } = usuario;

    const hashURL = `${baseURL}/pagamento/${hash}`;

    const { data } = await this.httpService
      .get(hashURL)
      .toPromise<AxiosResponse<HashURLPayload>>();

    return data.programas[0].entidades[78680337000184].funcoes[49].pagamentos;
  }
}
