# Teste técnico para Social Bank

## Projeto em java usando spring boot

### Executando
- rode o script **create_database.sql** no seu mysql local
- compilar o projeto: `mvn clean install`
- executando: `java -jar target/sb-0.1.0.jar`

### Serviços REST

#### Transferência de uma conta para outra
**POST** /account/transfer

Request example:
```
{
  "fromAccountId": 1,
  "toAccountId": 2,
  "value": 100.0
}
```

#### Criação de uma conta
**POST** /account/create

Request example:
```
{
  "name": "Account 1",
  "parent": true,
  "parentId": null,
  "personId": 1
}
```

#### Ativar conta
**POST** /activate/{id}

#### Bloquear conta
**POST** /block/{id}

#### Cancelar conta
**POST** /cancel/{id}

#### Carga de conta
**POST** /charge/{id}
```
Request example:
{
  "value": 100.0
}
```
