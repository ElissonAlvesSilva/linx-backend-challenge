# Linx Interview Challenge

**Para executar o projeto é necessário ter:**
 - Docker
 - Node
 - Ruby

Para começar a utilizar os projetos é necessário rodar:
```bash
make build
```

## PART-1

### Inicializar projeto
```bash
make start
``` 

### Parar o projeto
```bash
make stop
```

### Remover 
```bash
make remove
```

### Logs
```bash
make logs
```
ou

```bash
make logs-tail
```

### Redis

#### Limpar o cache
```bash
make clear-redis
```

#### Entrar no container do redis e executar o cli
```bash
make redis-cli
```


### Rotas

|   Rota   |  Metodo  | Descrição|
|:--------:|:--------:|:--------:|
| /version | GET      | Versão do projeto|
| /health  | GET      | Status da aplicação|
| /products| POST     | Rota de atualização de produto **Abaixo terá um exemplo de payload**|


##### Exemplo de payload da rota de produtos

```javascipt
{
    "data": [
        {
            "id": 1,
            "name": "camisa"
        },
        {
            "id": 2,
            "name": "camisa nike"
        },{
            "id": 3,
            "name": "camisa adidas"
        },{
            "id": 4,
            "name": "camisa Luis voiton"
        },{
            "id": 5,
            "name": "camisa de ginastica"
        }
    ]
}
```


#### Regras de negócio
 - A primeira request para api ela é gerada uma key(hash) onde é armazenada no cache para que quando o usuário for fazer uma nova request utilizando o mesmo body, em um intervalo de 10min, a resposta seja forbidden
 - A chave é gerada a partir do body
 - O TTL dessa chave no redis é de 10min
 - Após o termino do TTL pode fazer uma nova atualização com o mesmo body
 - Caso queira fazer uma atualiazação pode fazer novamente, desde que não seja um body anterior ou algum body que já tenha sido gerado a chave e que esteja dentro do redis com lock



## PART-2

**Para executar o projeto é necessário ter o ruby instalado, devido a dependência do sinatra (utilizado para fazer request das images)**

Feito o make build no inicio do projeto, pasta executar o comando abaixo passando o path do arquivo **tar.gz** e path do output de resultado

```bash
node part-2/src/index.js -i ./input-dump.tar.gz -o .

```

### Descrição dos parâmetros

|   Parametro   |  Tipo  | Descrição|
|:--------:|:--------:|:--------:|
| -i ou --input_dump   | String   | Arquivo de dump|
| -o ou --output   | String   | Path do arquivo de saída|
| -h ou --help    | Boolean  | Help para execução do projeto|


#### Descrição

Foi utilizado a seguinte ideia:
 - Como existe images repetidas e somos cobrados pela quantidade de requests, utilizamos um banco em memória(poderia ser texto, mas não achei uma implementação boa de **btree** para node) para armazenar as requests com seu status. Com isso, diminuimos o custo excessivo de request a api
