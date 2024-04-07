import { fastify } from 'fastify';
import { DatabasePostgres } from './data-base.js'

const server = fastify();

const database = new DatabasePostgres();

server.post('/funcionarios', async (request, reply) => {
    const { nome, email, data_nasc, cpf } = request.body;

    await database.create({
        nome,
        email,
        data_nasc,
        cpf
    });

    return reply.status(201).send();
});

server.get('/funcionarios', async (request) => {
    const search = request.query.search;

    const funcionarios = await database.list(search);

    return funcionarios;
});

server.put('/funcionarios/:id', async (request, reply) => {
    const funcionarioId = request.params.id;
    const { nome, email, data_nasc, cpf } = request.body;

    await database.update(funcionarioId, {
        nome,
        email,
        data_nasc,
        cpf
    });

    return reply.status(204).send();
});

server.delete('/funcionarios/:id', async (request, reply) => {
    const funcionarioId = request.params.id;

    await database.delete(funcionarioId);

    return reply.status(204).send();
});

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
});
