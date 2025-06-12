# 📢 API Reporter do Meu Bairro

- **Versão:** v1  
- **Base URL:** `http://localhost:8080/v1/controle-usuario/...`  
- **Formato:** JSON  
- **Autenticação:** Nenhuma (inicialmente)

---

## 📝 Descrição

A API *Reporter do Meu Bairro* permite o cadastro, consulta, atualização e exclusão de usuários no sistema. Essa versão inicial não possui autenticação e utiliza JSON para troca de dados.

---

## 📎 Observações
### 🔹 Para criar e utilizar a API precisamos instalar:

### express - comando: npm install express --save
#### Framework para Node.js que facilita a criação de servidores HTTP e rotas de API.
----
### cors - comando: npm install cors --save
#### Middleware que permite que a API seja acessada por outros domínios (necessário para evitar bloqueios de segurança do navegador).
----
### body-parser - comando: npm install body-parser --save
##### Middleware que interpreta o corpo (body) das requisições HTTP, como JSON e dados de formulários.
----
### prisma - comando: npm install prisma --
#### Ferramenta para gerenciamento de esquemas e migrações do banco de dados.
----
### prisma/client - comando: npm install @prisma/client --save
#### Biblioteca que permite interagir com o banco de dados através do código (realiza consultas, inserções etc.).
----
### comando: npx prisma migrate dev
#### Cria e aplica uma migração com base nas alterações feitas no schema.prisma, atualizando o banco de dados automaticamente.
----
### comando: npx prisma init 
#### Cria a estrutura inicial do Prisma, com a pasta prisma e o arquivo schema.prisma para definir o modelo do banco.

## 📌 Endpoints

### 🔹 Criar Usuário

**POST /v1/controle-usuario/usuario**  
Cadastra um novo usuário no sistema.

#### 📥 Corpo da Requisição:
```json
{
  "nome": "Maria",
  "email": "maria@gmail.com",
  "senha": "12345678"
}
```

#### 📤 Resposta:
```json
{
  "status": true,
  "status_code": 201,
  "message": "Item criado com sucesso!!!"
}
```

---

### 🔹 Listar Todos os Usuários

**GET /v1/controle-usuario/usuario**  
Retorna todos os usuários cadastrados.

#### 📤 Resposta:
```json
{
  "status": true,
  "status_code": 200,
  "itens": 2,
  "users": [
    {
      "id_usuario": 4,
      "nome": "João",
      "email": "joao@gmail.com",
      "senha": "12345678"
    },
    {
      "id_usuario": 2,
      "nome": "João",
      "email": "joao@gmail.com",
      "senha": "12345678"
    }
  ]
}
```

---

### 🔹 Listar Usuário por ID

**GET /v1/controle-usuario/usuario/:id**  
Retorna um usuário específico pelo seu ID.

#### 📌 Exemplo:
`GET /usuarios/4`

#### 📤 Resposta:
```json
{
  "status": true,
  "status_code": 200,
  "itens": 1,
  "users": [
    {
      "id_usuario": 4,
      "nome": "João",
      "email": "joao@gmail.com",
      "senha": "12345678"
    }
  ]
}
```

---

### 🔹 Atualizar Usuário

<<<<<<< HEAD
**PUT /v1/controle-usuario/usuario:id**  
=======
**PUT /v1/controle-usuario/usuario/:id**  
>>>>>>> 7d056d4153c2d61a026075f56fa10246f7d2f946
Atualiza os dados de um usuário específico.

#### 📌 Exemplo:
`PUT /usuarios/4`

#### 📥 Corpo da Requisição:
```json
{
  "nome": "João da Silva",
  "email": "joao@gmail.com",
  "senha": "novaSenha123"
}
```

#### 📤 Resposta:
```json
{
  "status": true,
  "status_code": 200,
  "message": "Item atualizado com sucesso!!"
}
```

---

### 🔹 Deletar Usuário

<<<<<<< HEAD
**DELETE /v1/controle-usuario/usuario:id**  
Remove um usuário do sistema.

#### 📤 Resposta:
```json
{
  "status": true,
  "status_code": 200,
  "message": "Item excluído com sucesso!!!"
}
```

---

### 🔹 Login do Usuário

**DELETE /v1/controle-usuario/usuario:id**  
Remove um usuário do sistema.

#### 📤 Resposta:
```json
{
  "status": true,
  "status_code": 200,
  "message": "Item excluído com sucesso!!!"
}
```

---

### 🔹 Deletar Usuário

**DELETE /v1/controle-usuario/usuario:id**  
=======
**DELETE /v1/controle-usuario/usuario/:id**  
>>>>>>> 7d056d4153c2d61a026075f56fa10246f7d2f946
Remove um usuário do sistema.

#### 📌 Exemplo:
`DELETE /usuarios/4`

#### 📤 Resposta:
```json
{
  "status": true,
  "status_code": 200,
  "message": "Item excluído com sucesso!!!"
}
```

---

## 📎 Observações

- Esta API ainda está em fase inicial e não implementa autenticação.
- O campo `senha` é retornado nas respostas apenas para testes locais; recomenda-se ocultá-lo em produção.
