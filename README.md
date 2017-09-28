# exemplo-cqrs-kafka
Exemplo com aplicação de CQRS entre Postgres e MongoDB utilizando o **Apache Kafka**.
 
## Como Instalar e Rodar?

1 - Caso você ainda não tenha, instale o [Docker](https://www.docker.com).
2 - Na pasta raiz do projeto, pelo terminal, execute os seguintes comandos:
```bash
  docker-compose build
  docker-compose up -d
```
**OBS:** Na primeira vez que for utilizar o docker, ele vai solicitar para que você crie uma máquina virtual. Basta você seguir as instruções informadas no terminal.
**OBS2:** O IP padrão da máquina virtual é **192.168.0.100**. NÃO O ALTERE pois o projeto necessita desse IP para rodar. Tentei configurar via nome do serviço/container, mas não consegui realizar nesse projeto.

4 - Acesse a aplicação pelo seu navegador: http://192.168.99.100/

5 - Caso deseje limpar e resetar os dados, rode o clear_and_build.sh

## O que este projeto instala e roda?
 - Aplicação client com React + NginX
 - MongoDB para consulta
 - Postgres para inserção
 - Server NodeJS para gerenciamento de eventos
 - Apache Kafka para integração via mensagens
 - Server NodeJS para consumir o Kafka
 
## Bibliotecas utilizadas
 - [kafka-node](https://www.npmjs.com/package/kafka-node) - Biblioteca node para o kafka
 - [pg](https://www.npmjs.com/package/pg) - Bilbioteca node para o Postgres
 - [mongodb](https://www.npmjs.com/package/mongodb) - Biblioteca node para o Mongo