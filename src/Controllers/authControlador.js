const db = require("../Models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../Middleware/config'); // Certifique-se de que este caminho está correto
const user = db.users; // Ajuste para o seu modelo de usuários
const Op = db.Sequelize.Op;


/*exports.login = async (req, res) => {
    const { email, password } = req.body;

    console.log(`Login request received for email: ${email}`);

    try {
        const userFound = await user.findOne({
            where: {
                email: email,
                //id_tipo: { [Op.in]: [1, 2, 3] } // Verifica se id_tipo está entre 1, 2 ou 3
            }
        });

        if (!userFound) {
            console.log(`Usuário não encontrado para o email: ${email}`);
            return res.status(401).json({ success: false, message: "Credenciais inválidas ou usuário não autorizado" });
        }

        console.log(`Usuário encontrado: ${JSON.stringify(userFound)}`);

        // Comparação de senha utilizando bcrypt.compare
        const isMatch = await bcrypt.compare(password, userFound.password);

        console.log(`Resultado da comparação de senha: ${isMatch}`);

        if (isMatch) {
            const token = jwt.sign({ email: userFound.email, id_user: userFound.id_user }, config.jwtSecret, {
                expiresIn: '1h' // Expira em 1 hora
            });

            console.log(`Autenticação bem-sucedida para o email: ${email}`);

            return res.json({
                success: true,
                message: 'Autenticação realizada com sucesso!',
                token: token
            });
        } else {
            console.log(`Senha incorreta para o email: ${email}`);
            return res.status(403).json({ success: false, message: 'Dados de autenticação inválidos.' });
        }
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        return res.status(500).json({
            success: false,
            message: "Erro ao fazer login. Tente novamente mais tarde.",
            error: error.message
        });
    }
};*/
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user2 = await user.findOne({ where: { email } });
      if (!user2) {
        return res.status(401).json({ error: 'Utilizador não encontrado' });
      }
      
      console.log(password, user2.password);
      
    bcrypt.compare(password, user2.password)
      .then(result => {
        if(result) {
            console.log('Password matches!');
        }
        else{console.log('Password does not match')}
      })
      .catch(err => {console.error(err);});
      /*if (!pass) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }*/
  
      const token = jwt.sign({ id: user2.id_user, email: user2.email, id_tipo: user2.id_tipo }, 'seuSegredoJWT', { expiresIn: '1h' });
  
      res.status(200).json({ message: 'Login bem-sucedido', token, role: user2.id_tipo, id: user2.id_user });
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      res.status(500).json({ error: 'Erro ao realizar login' });
    }
  };