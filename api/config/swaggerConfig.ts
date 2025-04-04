import swaggerJSDoc from "swagger-jsdoc";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.APP_PORT || 5555;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Heróis",
      version: "1.0.0",
      description: "Documentação da API de Heróis",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Servidor de Desenvolvimento",
      },
    ],
    components: {
      schemas: {
        Hero: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Superman" },
            nickname: { type: "string", example: "Homem de Aço" },
            date_of_birth: { type: "string", format: "date", example: "1978-06-18" },
            universe: { type: "string", example: "DC Comics" },
            main_power: { type: "string", example: "Super Força" },
            avatar_url: { type: "string", example: "https://exemplo.com/avatar.jpg" },
            is_active: { type: "boolean", example: true },
            created_at: { type: "string", format: "date-time", example: "2023-11-01T12:00:00Z" },
            updated_at: { type: "string", format: "date-time", example: "2023-11-02T14:30:00Z" },
          },
        },
        CreateHeroDTO: {
          type: "object",
          properties: {
            name: { type: "string", example: "Batman" },
            nickname: { type: "string", example: "Cavaleiro das Trevas" },
            date_of_birth: { type: "string", format: "date", example: "1975-05-27" },
            universe: { type: "string", example: "DC Comics" },
            main_power: { type: "string", example: "Inteligência estratégica" },
            avatar_url: { type: "string", example: "https://exemplo.com/batman.jpg" },
          },
        },
        UpdateHeroDTO: {
          type: "object",
          properties: {
            id: { type: "integer", example: 2 },
            name: { type: "string", example: "Flash" },
            nickname: { type: "string", example: "Velocista Escarlate" },
            date_of_birth: { type: "string", format: "date", example: "1990-03-20" },
            universe: { type: "string", example: "DC Comics" },
            main_power: { type: "string", example: "Super Velocidade" },
            avatar_url: { type: "string", example: "https://exemplo.com/flash.jpg" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"], // Garante que a documentação das rotas será gerada
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;
