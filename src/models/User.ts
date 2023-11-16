import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../instances/mysql'

export interface UserInstance extends Model {
    id: number,
    name: string,
    age: number
}

export const User = sequelize.define<UserInstance>("User", {
    id: {
        primaryKey: true, //chave primária no database
        type: DataTypes.INTEGER //número de id
    },
    name: {
        type: DataTypes.STRING //nome do cidadão
    },
    age: {
        type: DataTypes.INTEGER, //idade do cidadão
        defaultValue: 18 //valor de padrão definido tambem no database
    }
}, {
    tableName: 'users', //nome da tabela criada no database
    timestamps: false //se colocado como true, ele serve para quando foi criado e quando foi atualizado alguma info
})