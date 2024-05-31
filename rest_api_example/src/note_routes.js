import { Router } from "express";
import { authenticate } from "./middlewares/auth.js";
import { db } from '../database/sqlite.js'

export const noteRouter = Router()

noteRouter.get("/notes", authenticate, (req, res) => {

    db.all("SELECT * FROM note", [], (err, rows) => {

        if (err) {
            return res.status(500).send()
        }

        res.json(rows)

    })
})

noteRouter.post("/notes", authenticate, (req, res) => {

    const { content } = req.body

    const stmt = db.prepare("INSERT INTO note VALUES (NULL, ?)")

    stmt.run(content, (err) => {
        if (err) {
            return res.status(500).json({
                error: "Muistilapun luomisessa tapahtui virhe"
            })
        }

        res.status(201).send('Muistilappu luotu onnistuneesti')

    })

})