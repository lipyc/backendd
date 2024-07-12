const db = require('../Models');
const Pacote = db.pacotes;

// Criar pacote
exports.create = async (req, res) => {
    const { nome } = req.body;
    
    try {
        const data = await Pacote.create({ nome });
        res.status(200).json({
            success: true,
            message: "Pacote criado com sucesso",
            data: data
        });
    } catch (error) {
        console.error("Erro: " + error);
        res.status(500).json({
            success: false,
            message: "Erro ao criar pacote",
            error: error.message
        });
    }
};

// Listar todos os pacotes
exports.findAll = async (req, res) => {
    try {
        const pacotes = await Pacote.findAll();
        res.status(200).json(pacotes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor", error: error.message });
    }
};

// Obter um pacote por ID
exports.get = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Pacote.findByPk(id);
        if (data) {
            res.json({ success: true, data: data });
        } else {
            res.status(404).json({ success: false, message: 'Pacote não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Erro interno do servidor", error: error.message });
    }
};
//-----------------------------------------------------------------------------------------------
// Editar pacote--------------------------------------------------------------------------------
exports.update = async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    try {
        const data = await Pacote.update(
            { nome },
            { where: { id_pacotes: id } }
        );

        if (data[0] === 1) { // Verifica se alguma linha foi atualizada
            res.json({ success: true, message: "Pacote atualizado com sucesso" });
        } else {
            res.status(404).json({ success: false, message: "Pacote não encontrado ou dados não alterados" });
        }
    } catch (error) {
        console.error("Erro ao atualizar pacote:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            error: error.message
        });
    }
};

// Apagar pacote
exports.delete = async (req, res) => {
    const { id } = req.body;

    try {
        const del = await Pacote.destroy({
            where: { id_pacotes: id }
        });

        if (del) {
            res.json({ success: true, message: "Pacote deletado com sucesso" });
        } else {
            res.status(404).json({ success: false, message: "Pacote não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao deletar pacote:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            error: error.message
        });
    }
};