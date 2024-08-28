const express = require("express"); //Importa o módulo  Express

//Define uma classe para organizar a lógica da aplicação
class AppController {
  constructor() {
    //Cria uma nova instancia do Express dentro da classe
    this.express = express();
    //Chama o método middlewares
    this.middlewares();
    //Chama o método routes para definir as rotas da API
    this.routes();
  }
  middlewares() {
    //Pertimitir que a aplicação receba dados em formato JSON nas requisições
    this.express.use(express.json());
  }
  //Define as rotas da nossa API
  routes() {
    const users = [];

    this.express.post("/users", (req, res) => {
      const { id, nome, email, senha } = req.body;
      users.push({ id, nome, email, senha });
      res.status(200).send({ message: "Usario cadastrado com sucesso" });
    });

    this.express.post("/auth", (req, res) => {
        const { senha, email } = req.body;
        const user = users.find((user) => user.senha == senha && user.email == email);
        if (user) {
            res.status(200).send({ message: "Usario logado com sucesso" });
        }
        else{
            res.status(400).send({ message: "Usario não encontrado" });
        } 
        

      });
    
    this.express.get("/users/:id", (req, res) => {
      const { id } = req.params;
      const user = users.find((user) => user.id == id);

      if (user) {
        res.status(200).send(user);
      } else {
        res.status(400).send({ message: "Usario não encontrado" });
      }
    });

    //Define uma rota GET para o caminho health
    this.express.get("/health/", (req, res) => {
      res.send({ TIME: "CORINTHIANS", CPF: "44549715871", Idade: "17" });
    }); //Essa rota é usada para verificar se API esta OK
  }
}

//Exportando a instancia de Express configurada, para que seja acessada em outros arquivos
module.exports = new AppController().express;
