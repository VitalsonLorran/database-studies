import { Request, Response } from 'express';
import { sequelize } from '../instances/mysql';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { Op, where } from 'sequelize';

export const home = async (req: Request, res: Response)=>{

    /*
    await User.destroy({
        where: {
            name: 'Ciclano'
        }
    })
    /*
    let results = await User.findAll({ where: { id: 7 } }) //retorna um array com o resultado pedido (nessa caso o id específico)
    if(results.length > 0) {
        let usuario = results[0] //pegue o primeiro item do array
        
        usuario.name = 'Trocou de nome' //trocar o nome aqui nao significa que trocará no database
        await usuario.save() //aqui de fato muda o nome no database
    }*/

    /*await User.update({ age: 18 }, { //função para atualizar alguma informação do banco de dados
        where: {
            age: {
                [Op.lt]: 18
            }
        }
    })*/

    let users = await User.findAll()
    //build + save
    /*const user = User.build({
        name: 'Fulano',
        age: 10
    })*/
    //await user.save() <-- Vai criar um usuario novo toda vez que rodar o codigo
    /*const user = await User.create({
        name: 'Ciclano',
        age: 28
    })*/
    
    //let users = await User.findAll({  //pegando os usuários do banco de dados definido no arquivo User.ts
        
        //where: {  //Op.gt Op.gte Op.lt Op.lte (> >= < <=)
                  // name: { [Op.like]: '%abc%'} procurar nomes que contenham 'abc'
            //[Op.or]: [
                //{ age : 55},
                //{ name: 'Clara'}
            //]
        //}
        //where: { age: 30 }            <--- Atributo para filtrar algo especifico: nome, idade, salario, temperatura, distancia e etc
        //attributes: ['name', 'age']   <--- Atributos para a filtragem, escolher o que quer vir do database
    //}) 

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


export const novoUsuario = async (req:Request, res: Response) => {
    let { name, age } = req.body

    if(name) {
        const newUser = User.build({ name })
        if (age) {
            newUser.age = parseInt(age)
        }
        await newUser.save()
    }
    res.redirect('/')
}

export const deleteUser = async (req: Request, res: Response) => {
    let result = req.body
    console.log(result)
}