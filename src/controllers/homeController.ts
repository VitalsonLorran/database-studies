import { Request, Response } from 'express';
import { sequelize } from '../instances/mysql';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { Op } from 'sequelize';

export const home = async (req: Request, res: Response)=>{

    let users = await User.findAll({  //pegando os usuários do banco de dados definido no arquivo User.ts
        where: {  //Op.gt Op.gte Op.lt Op.lte (> >= < <=)
                  // name: { [Op.like]: '%abc%'} procurar nomes que contenham 'abc'
            [Op.or]: [
                { age : 55},
                { name: 'Clara'}
            ]
        }
        //where: { age: 30 }            <--- Atributo para filtrar algo especifico: nome, idade, salario, temperatura, distancia e etc
        //attributes: ['name', 'age']   <--- Atributos para a filtragem, escolher o que quer vir do database
    }) 

    let age: number = 90;
    let showOld: boolean = false;

    if(age > 50) {
        showOld = true;
    }

    let list = Product.getAll();
    let expensiveList = Product.getFromPriceAfter(12);

    res.render('pages/home', { //objeto com variaveis para mandar na pagina
        name: 'Lorran',
        lastName: 'Viana',
        showOld,
        products: list,
        expensives: expensiveList,
        frasesDoDia: [],
        users
    });
};