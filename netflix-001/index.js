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

    //LOGIN: PELÍCULAS POR CATEGORÍA. ADD -> INSERT                                     
    //app.post("/usuarios/", (req, res)=>{
    //});

    //ELIMINAR -> DELETE
    //app.delete("/usuarios/", (req, res));   

    //MODIFICAR -> PUT
    //app.put("/usuarios/", (req, res));      

