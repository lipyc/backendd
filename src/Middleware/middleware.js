const jwt = require('jsonwebtoken');
const config = require('./config');

let checkToken = (req, res, next) => {
    // Obter o token do cabeçalho de autorização
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    
    // Verificar se o token começa com 'Bearer '
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    // Verificar se o token está disponível
    if (token) {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'O token não é válido.'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Token indisponível.'
        });
    }
};

module.exports = {
    checkToken: checkToken
};
        
