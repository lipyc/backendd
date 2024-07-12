const db = require('../Models');
const Suporte = db.suportes;
const User = db.users;
const TipoSuporte = db.tipos_sup;

// Criar suporte-----------------------------------------------------------------------------------
exports.create = async (req, res) => {
    const { id_user, id_tipo4, use_id_user, mensagem } = req.body;

    try {
        const data = await Suporte.create({
            id_user: id_user,
            id_tipo4: id_tipo4,
            use_id_user: use_id_user,
            mensagem: mensagem
        });

        res.status(200).json({
            success: true,
            message: "Suporte criado com sucesso",
            data: data
        });
    } catch (error) {
        console.error("Erro: " + error);
        res.status(500).json({
            success: false,
            message: "Erro ao criar suporte",
            error: error.message
        });
    }
};
//------------------------------------------------------------------------------------------
// Listar suportes------------------------------------------------------------------------
exports.findAll = async (req, res) => {
    try {
        const suportes = await Suporte.findAll();
        res.status(200).json(suportes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor", error: error.message });
    }
};
//----------------------------------------------------------------------------------------------
// Obter um suporte específico-------------------------------------------------------------------
exports.get = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Suporte.findAll({
            where: { id_sup: id },
            include: [
                {
                    model: User,
                    as: 'user'
                },
                {
                    model: TipoSuporte,
                    as: 'tipo_suporte'
                }
            ]
        });
        if (data.length > 0) {
            res.json({ success: true, data: data });
        } else {
            res.status(404).json({ success: false, message: 'Suporte não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Erro interno do servidor", error: error.message });
    }
};
//-------------------------------------------------------------------------------------------------
// Editar suporte----------------------------------------------------------------------------------
exports.update = async (req, res) => {
    const { id } = req.params;
    const { id_user, id_tipo4, use_id_user, mensagem } = req.body;

    try {
        const data = await Suporte.update(
            {
                id_user: id_user,
                id_tipo4: id_tipo4,
                use_id_user: use_id_user,
                mensagem: mensagem
            },
            {
                where: { id_sup: id }
            }
        );

        if (data[0] === 1) { // Verifica se alguma linha foi atualizada
            res.json({ success: true, message: "Suporte atualizado com sucesso" });
        } else {
            res.status(404).json({ success: false, message: "Suporte não encontrado ou dados não alterados" });
        }
    } catch (error) {
        console.error("Erro ao atualizar suporte:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            error: error.message
        });
    }
};
//-------------------------------------------------------------------------------------------------
// Apagar suporte-----------------------------------------------------------------------------------
exports.delete = async (req, res) => {
    const { id } = req.body;
    try {
        const del = await Suporte.destroy({
            where: { id_sup: id }
        });
        if (del) {
            res.json({ success: true, message: "Suporte deletado com sucesso", deleted: del });
        } else {
            res.status(404).json({ success: false, message: "Suporte não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao deletar suporte:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            error: error.message
        });
    }
};