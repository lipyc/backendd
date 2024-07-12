const db = require('../Models');
const Addon = db.addons;
const Produto = db.produtos;

//criar addon---------------------------------------------------------------------------------
exports.create = async (req, res) => {
    const { id_prod, nome, descricao } = req.body;

    try {
        const data = await Addon.create({
            id_prod: id_prod,
            nome: nome,
            descricao: descricao
        });

        res.status(200).json({
            success: true,
            message: "Addon criado com sucesso",
            data: data
        });
    } catch (error) {
        console.error("Erro: " + error);
        res.status(500).json({
            success: false,
            message: "Erro ao criar addon",
            error: error.message
        });
    }
};
//_-----------------------------------------------------------------------------------
//listar addons-----------------------------------------------------------------------
exports.findAll = async (req, res) => {
    try {
        const addons = await Addon.findAll();
        res.status(200).json(addons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor", error: error.message });
    }
};
//--------------------------------------------------------------------------------------
//
exports.get = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Addon.findAll({
            where: { id_addon: id },
            include: [
                {
                    model: Produto,
                    as: 'produto'
                }
            ]
        });

        if (data.length > 0) {
            res.json({ success: true, data: data });
        } else {
            res.status(404).json({ success: false, message: 'Addon não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Erro interno do servidor", error: error.message });
    }
};
//----------------------------------------------------------------------------------------------
//editar addons---------------------------------------------------------------------------------
exports.update = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, id_prod } = req.body;

    try {
        const data = await Addon.update(
            {
                nome: nome,
                descricao: descricao,
                id_prod: id_prod
            },
            {
                where: { id_addon: id }
            }
        );

        if (data[0] === 1) { // Verifica se alguma linha foi atualizada
            res.json({ success: true, message: "Addon atualizado com sucesso" });
        } else {
            res.status(404).json({ success: false, message: "Addon não encontrado ou dados não alterados" });
        }
    } catch (error) {
        console.error("Erro ao atualizar addon:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            error: error.message
        });
    }
};
//---------------------------------------------------------------------------------------------------
//apagar addons------------------------------------------------------------------------------------
exports.delete = async (req, res) => {
    const { id } = req.body;

    try {
        const del = await Addon.destroy({
            where: { id_addon: id }
        });

        if (del) {
            res.json({ success: true, message: "Addon apagado com sucesso" });
        } else {
            res.status(404).json({ success: false, message: "Addon não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao deletar addon:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            error: error.message
        });
    }
};