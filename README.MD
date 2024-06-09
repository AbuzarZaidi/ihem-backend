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
