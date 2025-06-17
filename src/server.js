import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { favouriteRecipesTable } from "./db/schema.js";

const app = express();
const PORT = ENV.PORT || 8081;

app.use(express.json())

app.get("/api/health", (req, res) => {
    res.status(200).json({ success: true });
});

app.get("/api/favouriteRecipes", async (req, res) => {

    
    
    try {

        res.status(200).json({ success: true });
         /*
        const { userId, recipeId, title, image, cookTime, servings } = req.body;

        if(!userId || !recipeId || !title) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newFavoriteRecipe = await db.insert(favoriteRecipesTable).values({
            userId,
            recipeId,
            title,
            image,
            cookTime,
            servings
        })
        
        .returning();
        
        res.status(201).json(newFavoriteRecipe[0]);

        */

    } catch (error) {
        console.log("Error adding favorite", error)
        res.status(500).json({error: "Something went wrong"});
        
    }
});

app.delete("/api/favouriteRecipes/:userId/:recipeId", async(req,res) => {
    try {
       const {userId, recipeId } = req.params

       await db
       .delete(favoriteRecipesTable)
       .where(
        and(eq(favoriteRecipesTable.userId,userId), eq(favoriteRecipesTable.recipeId, parseInt(recipeId)))
       )

       res.status(200).json({ message: "Favorite removed successfully" });
        
    } catch (error) {
        console.log("Error removing favorite", error)
        res.status(500).json({error: "Something went wrong"});  
    }
});

app.get("/api/favouriteRecipes/:userId", async(req, res) => {
    try {
        const { userId } = req.params;

        await db.select().from(favoriteRecipesTable).where(eq(favoriteRecipesTable.userId,userId))

        res.status(200).json(userFavoriteRecipes)
        
    } catch (error) {
        console.log("Error fetching favorite", error)
        res.status(500).json({error: "Something went wrong"});  
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT:`, PORT);
});