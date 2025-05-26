# 📢 API Reporter do Meu Bairro

- **Versão:** v1  
- **Base URL:** `http://localhost:3030/v1/controle-usuario/usuario`  
- **Formato:** JSON  
- **Autenticação:** Nenhuma (inicialmente)

---

## 📝 Descrição

A API *Reporter do Meu Bairro* permite o cadastro, consulta, atualização e exclusão de usuários no sistema. Essa versão inicial não possui autenticação e utiliza JSON para troca de dados.

---

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

**GET /usuarios**  
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

**GET /usuarios/:id**  
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

**PUT /usuarios/:id**  
Atualiza os dados de um usuário específico.

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

**DELETE /usuarios/:id**  
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

## ⚠️ Erros Comuns (exemplo)

```json
{
  "status": false,
  "status_code": 400,
  "message": "Email já cadastrado"
}
```

---

## 📎 Observações

- Esta API ainda está em fase inicial e não implementa autenticação.
- O campo `senha` é retornado nas respostas apenas para testes locais; recomenda-se ocultá-lo em produção.
