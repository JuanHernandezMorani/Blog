const { Router } = require("express");
const path = require("path");

const app = Router();

app.get('/favicon.ico', (req, res) => {
    try {
        const faviconPath = path.join(__dirname, 'favicon.ico');
        return res.sendFile(faviconPath);
    } catch (error) {
        console.error("Error al obtener el favicon: ", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});

module.exports = app;