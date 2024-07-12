const db = require('../Models');
const Venda = db.vendas;
const Produto = db.produtos;
const User = db.users;

// Criar venda---------------------------------------------------------------------------------------------
exports.create = async (req, res) => {
    const { id_prod, id_user, quantidadepc } = req.body;
    
    try {
        // Buscar o produto para obter valorbase e desconto
        const produto = await Produto.findOne({
            where: { id_prod: id_prod }
        });

        if (!produto) {
            return res.status(404).json({
                success: false,
                message: "Produto não encontrado"
            });
        }

        // Calcular o valorfinal
        const valorfinal = quantidadepc * produto.valorbase * (1 - (produto.desconto / 100));

        const data = await Venda.create({
            id_prod: id_prod,
            id_user: id_user,
            valorfinal: valorfinal,
            quantidadepc: quantidadepc
        });
        
        res.status(200).json({
            success: true,
            message: "Venda criada com sucesso",
            data: data
        });
    } catch (error) {
        console.error("Erro ao criar venda: " + error);
        res.status(500).json({
            success: false,
            message: "Erro ao criar venda",
            error: error.message
        });
    }
}
//-------------------------------------------------------------------------------------------------
// Listar todas as vendas-------------------------------------------------------------------------
exports.findAll = async (req, res) => {
    try {
        const vendas = await Venda.findAll({
            include: [
                { model: Produto, as: 'produto' },
                { model: User, as: 'usuario' }
            ]
        });
        res.status(200).json(vendas);
    } catch (error) {
        console.error("Erro ao listar vendas: " + error);
        res.status(500).json({ message: "Erro interno do servidor", error: error.message });
    }
};
//-----------------------------------------------------------------------------------------------
// Obter uma venda por id_prod e id_user--------------------------------------------------------
exports.get = async (req, res) => {
    const { id_prod, id_user } = req.params;
    try {
        const venda = await Venda.findOne({
            where: { id_prod: id_prod, id_user: id_user },
            include: [
                { model: Produto, as: 'produto' },
                { model: User, as: 'usuario' }
            ]
        });
        if (venda) {
            res.json({ success: true, data: venda });
        } else {
            res.status(404).json({ success: false, message: 'Venda não encontrada' });
        }
    } catch (error) {
        console.error("Erro ao obter venda: " + error);
        res.status(500).json({ success: false, message: "Erro interno do servidor", error: error.message });
    }
};
//----------------------------------------------------------------------------------------------------
// Atualizar uma venda---------------------------------------------------------------------------------
exports.update = async (req, res) => {
    const { id_prod, id_user } = req.params;
    const { valorfinal, quantidadepc } = req.body;

    try {
        const data = await Venda.update(
            {
                valorfinal: valorfinal,
                quantidadepc: quantidadepc
            },
            {
                where: { id_prod: id_prod, id_user: id_user }
            }
        );

        if (data[0] === 1) {
            res.json({ success: true, message: "Venda atualizada com sucesso" });
        } else {
            res.status(404).json({ success: false, message: "Venda não encontrada ou dados não alterados" });
        }
    } catch (error) {
        console.error("Erro ao atualizar venda: " + error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            error: error.message
        });
    }
};
//-----------------------------------------------------------------------------------------
// Apagar uma venda-------------------------------------------------------------------------
exports.delete = async (req, res) => {
    const { id_prod, id_user } = req.body;
    try {
        const del = await Venda.destroy({
            where: { id_prod: id_prod, id_user: id_user }
        });

        if (del) {
            res.json({ success: true, message: "Venda apagada com sucesso" });
        } else {
            res.status(404).json({ success: false, message: "Venda não encontrada" });
        }
    } catch (error) {
        console.error("Erro ao apagar venda: " + error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            error: error.message
        });
    }
};