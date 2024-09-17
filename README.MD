Node version 20.11.0
# ihem-backend
# For Migration with Sequelize in command prompt
# npm install sequelize
# npm install -g sequelize-cli
# sequelize init
# Configuring the config.js file with the connected database.

# Create the model
# sequelize model:generate --name User --attributes username:string,email:string
# To create migration for relation
# sequelize migration:create --name addCategoryIdToProducts

# Run the Migration
# sequelize db:migrate

# For undo migration
# sequelize db:migrate:undo

# For checking migration status
# sequelize db:migrate:status

{  "sample":{
      "hair_type":1,
      "thickness":4,
      "position":6,
      "growth":7,
      "length":54,
      "white_hair":34,
      "density":67
},
    "uuid_user":"userId2",
    "comments":"hello workd",
    "currcolor":1.24,
    "wishedcolor":1.24,
    "gotcolor":1.24,
    "quantity":134,
    "recipe": {
        "recipe_color_033":0.123,
        "recipe_color_11":0.423,
        "recipe_color_42":0.623,
        "recipe_color_50":0.723,
        "recipe_color_566":0.523,
        "recipe_color_100":0.143,
        "recipe_oxytype":0.153,
        "recipe_oxygen":0.1263,
        "recipe_exposure":0.323
    },
        "recipehem": {
        "recipehem_color_033":0.123,
        "recipehem_color_11":0.423,
        "recipehem_color_42":0.623,
        "recipehem_color_50":0.723,
        "recipehem_color_566":0.523,
        "recipehem_color_100":0.143,
        "recipehem_oxytype":0.153,
        "recipehem_oxygen":0.1263,
        "recipehem_exposure":0.323
    }
}