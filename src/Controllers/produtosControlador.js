const db = require('../Models');
const Produto = db.produtos;
const tipoProduto = db.tipos_prod;
const pacotes = db.pacotes;

// Criar produto
exports.create = async (req, res) => {
    const { id_tipo5, id_pacotes, nome, descricao, imagem, valorbase, versao, tempo, desconto } = req.body;
    
    try {
        // Adicionando logs para verificar os dados recebidos
        console.log('Dados recebidos:', req.body);

        // Validação adicional, se necessário
        if (!id_tipo5 || !id_pacotes || !nome || !descricao || !imagem || !valorbase || !versao || !tempo || !desconto) {
            return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
        }

        // Tentativa de criação do produto
        const data = await Produto.create({
            id_tipo5,
            id_pacotes,
            nome,
            descricao,
            imagem,
            valorbase,
            versao,
            tempo,
            desconto
        });

        console.log('Produto criado com sucesso:', data);

        res.status(200).json({
            success: true,
            message: 'Produto criado com sucesso',
            data: data
        });
    } catch (error) {
        console.error('Erro ao criar produto:', error);

        // Verifica se o erro é de unicidade
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ success: false, message: 'Já existe um produto com esses dados.', error: error.message });
        }

        res.status(500).json({
            success: false,
            message: 'Erro ao criar produto',
            error: error.message
        });
    }
};

// Listar produtos
exports.findAll = async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.status(200).json({
            success: true,
            data: produtos
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

// Obter produto por ID
exports.get = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Produto.findByPk(id, {
            include: [
                {
                    model: tipoProduto,
                    as: 'tipos_prod' // alias definido na associação do modelo produtos
                },
                {
                    model: pacotes,
                    as: 'pacote'
                }
            ]
        });
        if (data) {
            res.json({ success: true, data: data });
        } else {
            res.status(404).json({ success: false, message: 'Produto não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Erro interno do servidor", error: error.message });
    }
};

// Editar produto
exports.update = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, imagem, valorbase, versao, tempo, desconto, id_tipo5, id_pacotes } = req.body;
  
    try {
      const produto = await Produto.findByPk(id);
      if (!produto) {
        return res.status(404).json({ success: false, message: "Produto não encontrado" });
      }
  
      const updatedProduto = await produto.update({
        nome,
        descricao,
        imagem,
        valorbase,
        versao,
        tempo,
        desconto,
        id_tipo5,
        id_pacotes
      }, {
        include: [
          {
            model: tipoProduto,
            as: 'tipos_prod'
          },
          {
            model: pacotes,
            as: 'pacote'
          }
        ]
      });
  
      res.json({ success: true, message: "Produto atualizado com sucesso", data: updatedProduto });
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
        error: error.message
      });
    }
  };
//---------------------------------------------------------------------------------------------
// Apagar produto-------------------------------------------------------------------------------
exports.delete = async (req, res) => {
    const { id_prod } = req.body;

    try {
        const result = await Produto.destroy({ where: { id_prod } });

        if (result) {
            return res.status(200).json({
                success: true,
                message: 'Produto deletado com sucesso'
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Produto não encontrado'
            });
        }
    } catch (error) {
        console.error("Erro ao deletar produto: ", error);
        return res.status(500).json({
            success: false,
            message: 'Erro ao deletar produto',
            error: error.message
        });
    }
};