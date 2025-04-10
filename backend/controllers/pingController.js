// controllers/pingController.js
const ping = (req, res) => {
    res.status(200).json({ message: 'Servidor ativo! 🟢' });
  };
  
  module.exports = { ping };
  