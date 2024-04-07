import {sql} from './db.js'

sql`
CREATE TABLE funcionarios (
    id Text PRIMARY KEY,
    nome TEXT,
    email TEXT,
    data_nasc DATE,
    cpf BIGINT
);
`.then(() => {
    console.log('tabela criada!')
})