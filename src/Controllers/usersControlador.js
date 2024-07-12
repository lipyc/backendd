const db = require('../Models');
const jwt = require('jsonwebtoken');
const config = require('../Middleware/config');
const User = db.users;
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
//const config = require('../Middleware/config');

//criar User-------------------------------------------------------------------------------
exports.create = async (req, res) => {
    
    try {
        const { nome, email, password, id_tipo} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(password, hashedPassword);
        const data = await User.create({
            nome, 
            email,
            password: hashedPassword,
            id_tipo,
        });
        
        res.status(200).json({
            success: true,
            message: "Registado",
            data: data
        });
    } catch (error) {
        console.error("Erro: " + error);
        res.status(500).json({
            success: false,
            message: "Erro ao registrar",
            error: error.message
        });
    }
};
//------------------------------------------------------------------------------------------
//listar Users------------------------------------------------------------------------------
exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll(); // Supondo que User é o modelo de usuário
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: "Erro interno do servidor",
            error: error.message 
        });
    }
};

//--------------------------------------------------------------------------------------------
//listar 1 User
/*exports.findOne = async(req,res) => {
    try {
        const user = await user.findByPk(id_user);

        if(user){
            res.send(user);
        }else{
            res.status(404).send({
                message: `Cannot find User with id=${id_user}.`
            });
        }

    }catch (error){
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor", error: error.message });
    }
}*/
//--------------------------------------------------------------------------------------------
exports.get = async (req, res) => {
    const { id_user } = req.params;

    try {
        const data = await User.findByPk(id_user);

        if (!data) {
            return res.status(404).json({ success: false, message: 'Usuário com id ${id_user} não encontrado' });
        }

        res.json({ success: true, data: data });
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ success: false, message: 'Erro ao buscar usuário', error: error.message });
    }
};
//--------------------------------------------------------------------------------------------
//editar users--------------------------------------------------------------------------------
exports.update = async (req, res) => {
    const { id_user } = req.params;
    const { nome, email, password, id_tipo } = req.body;

    try {
        const data = await User.update({
            nome: nome,
            email: email,
            password: password,
            id_tipo: id_tipo
        }, {
            where: { id_user: id_user }
        });

        res.json({ success: true, data: data, message: 'Usuário atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ success: false, message: 'Erro ao atualizar usuário', error: error.message });
    }
};
//---------------------------------------------------------------------------------------------
//apagar users---------------------------------------------------------------------------------
exports.delete = async (req, res) => {
    const { id_user } = req.params; // Usar req.params para obter o ID do usuário da URL

    try {
        const result = await User.destroy({ where: { id_user } });

        if (result) {
            return res.status(200).json({
                success: true,
                message: 'User deleted successfully'
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
    } catch (error) {
        console.error("Error deleting user: ", error);
        return res.status(500).json({
            success: false,
            message: 'Error deleting user',
            error: error.message
        });
    }
};

//---------------------------------------------------------------------------------------------
