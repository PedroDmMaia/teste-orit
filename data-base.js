import { randomUUID } from "node:crypto"
import { sql } from "./db.js"

export class DatabasePostgres {
    #funcionarios = new Map()

    async list(search) {
        let funcionarios

        if (search) {
            funcionarios = await sql`select * from funcionarios where title ilike ${'%' + search + '%'}`
        } else {
            funcionarios = await sql`select * from funcionarios`
        }

        return funcionarios
    }

    async create(funcionario) {
        const funcionarioId = randomUUID()
        const { nome, email, data_nasc, cpf } = funcionario

        await sql`insert into funcionarios (id, nome, email, data_nasc, cpf) values (${funcionarioId}, ${nome}, ${email}, ${data_nasc}, ${cpf})`
    }

    async update(id, funcionario) {
        const { nome, email, data_nasc, cpf } = funcionario

        await sql`update funcionarios set nome=${nome}, email=${email}, data_nasc=${data_nasc}, cpf=${cpf} WHERE id=${id}`
    }

    async delete(id) {
        await sql`delete from funcionarios WHERE id=${id}`
    }
}