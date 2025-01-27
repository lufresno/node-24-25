/*

//API REST 

//IMPORTS EN JAVA
const express= require("express");  //API REST -> NODE JS CON EXPRESS
const { Pool }= require("pg");       // HABLAR BD PG EN AWS

//INSTANCIAR LOS OBJETOS QUE NECESITAMOS 
const app= express();
const port= 3000;

    //CONSULTAR -> SELECT * FROM USUARIOS
    app.get("/usuarios/", (req, res)=>{
        //req -> no lo necesito
        //res-> sí
        res.send('Has solicitado una lista de usuarios. ')
    }); 

    app.get("/usuarios/:id", (req, res)=>{
        const userId = req.params.id;
        res.send(`El ID del usuario es: ${userId}`);
    });

    //---
    app.listen(port, ()=>{
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
*/
    //LOGIN: PELÍCULAS POR CATEGORÍA. ADD -> INSERT                                     
    //app.post("/usuarios/", (req, res)=>{
    //});

    //ELIMINAR -> DELETE
    //app.delete("/usuarios/", (req, res));   

    //MODIFICAR -> PUT
    //app.put("/usuarios/", (req, res));      

/*17-01-2025*/
// listar películas NODE JS CON AWS
// API REST
const express = require("express"); // API REST -> NODE JS CON EXPRESS
const { Pool } = require("pg");      // HABLAR BD PG DE AWS

// INSTANCIAR LOS OBJETOS QUE NECESITAMOS
const app = express();
const port = 3000;

app.use(express.json());

// Configuración de la base de datos
const pool = new Pool({
    user: "postgres",
    host: "netflix-01.cupetnmlumhn.us-east-1.rds.amazonaws.com",
    database: "postgres",
    password: "LUCASLUCAS", // Considera usar variables de entorno para gestionar contraseñas
    port: 5432,
    ssl: {
      rejectUnauthorized: false, // Cambia a false si tienes problemas de certificados pero trata de evitarlo por seguridad
    },
});

// Endpoint para listar todas las películas o filtrar por título
app.get("/peliculas", async (req, res) => {
    const { titulo } = req.query; // Leer el parámetro "titulo"
    try {
        let query = "SELECT * FROM peliculas";
        const values = [];

        // Si se proporciona el parámetro "titulo", agregar el filtro
        if (titulo) {
            query += " WHERE titulo ILIKE $1"; // Búsqueda insensible a mayúsculas
            values.push(`%${titulo}%`); // Agregar el título como valor para la consulta
        }

        // Ejecutar la consulta
        const { rows } = await pool.query(query, values);
        
        // Validar si hay resultados
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron películas con ese título." });
        }

        // Enviar los resultados encontrados
        res.json(rows);
    } catch (error) {
        console.error("Error al consultar las películas:", error);
        res.status(500).send("Error interno del servidor");
    }
});

// Endpoint para insertar una nueva película
app.post("/peliculas", async (req, res) => {
    const { id, titulo, director, anio } = req.body; // Leer parámetros del cuerpo de la solicitud

    // Validar los campos requeridos
    if (!id || !titulo || !director || !anio) {
        return res.status(400).json({ 
            mensaje: "Faltan datos obligatorios: id, titulo, director, anio" 
        });
    }

    try {
        const query = `
            INSERT INTO peliculas (id, titulo, director, anio)
            VALUES ($1, $2, $3, $4) RETURNING *;
        `;
        const values = [id, titulo, director, anio];

        // Ejecutar la consulta
        const { rows } = await pool.query(query, values);

        // Devolver la película recién insertada
        res.status(201).json({
            mensaje: "Película agregada exitosamente",
            pelicula: rows[0],
        });
    } catch (error) {
        console.error("Error al insertar la película:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});

// CONSULTAR -> SELECT * FROM USUARIOS
app.get("/usuarios/", (req, res) => {
    res.send('Has solicitado una lista de usuarios');
});

// Consultar usuario por ID
app.get("/usuarios/:id", (req, res) => {
    const userId = req.params.id;
    res.send(`El ID del usuario es: ${userId}`);
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});