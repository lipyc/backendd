const db = require('../Models');
const Proposta = db.propostas;
const User = db.users;

// Criar proposta-----------------------------------------------------------------------------------
exports.create = async (req, res) => {
    const { id_user, descricao } = req.body;

    try {
        const data = await Proposta.create({
            id_user: id_user,
            descricao: descricao
        });

        res.status(200).json({
            success: true,
            message: "Proposta criada com sucesso",
            data: data
        });
    } catch (error) {
        console.error("Erro: " + error);
        res.status(500).json({
            success: false,
            message: "Erro ao criar proposta",
            error: error.message
        });
    }
};
//-----------------------------------------------------------------------------------------------------
// Listar propostas---------------------------------------------------------------------------------
exports.findAll = async (req, res) => {
    try {
        const propostas = await Proposta.findAll();
        res.status(200).json(propostas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor", error: error.message });
    }
};
//-------------------------------------------------------------------------------------------------------
// Obter uma proposta específica-------------------------------------------------------------------------
exports.get = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Proposta.findAll({
            where: { id_proposta: id },
            include: [
                {
                    model: User,
                    as: 'user'
                }
            ]
        });
        if (data.length > 0) {
            res.json({ success: true, data: data });
        } else {
            res.status(404).json({ success: false, message: 'Proposta não encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Erro interno do servidor", error: error.message });
    }
};
//-----------------------------------------------------------------------------------------------------
// Editar proposta-----------------------------------------------------------------------------------
exports.update = async (req, res) => {
    const { id } = req.params;
    const { id_user, descricao } = req.body;

    try {
        const data = await Proposta.update(
            {
                id_user: id_user,
                descricao: descricao
            },
            {
                where: { id_proposta: id }
            }
        );

        if (data[0] === 1) { // Verifica se alguma linha foi atualizada
            res.json({ success: true, message: "Proposta atualizada com sucesso" });
        } else {
            res.status(404).json({ success: false, message: "Proposta não encontrada ou dados não alterados" });
        }
    } catch (error) {
        console.error("Erro ao atualizar proposta:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            error: error.message
        });
    }
};
//-----------------------------------------------------------------------------------------------------
// Apagar proposta------------------------------------------------------------------------------------
exports.delete = async (req, res) => {
    const { id } = req.body;
    try {
        const del = await Proposta.destroy({
            where: { id_proposta: id }
        });
        if (del) {
            res.json({ success: true, message: "Proposta deletada com sucesso", deleted: del });
        } else {
            res.status(404).json({ success: false, message: "Proposta não encontrada" });
        }
    } catch (error) {
        console.error("Erro ao deletar proposta:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            error: error.message
        });
    }
};