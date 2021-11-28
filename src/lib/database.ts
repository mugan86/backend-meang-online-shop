import { Db, MongoClient } from "mongodb";
import chalk from "chalk";
class Database {
    db?: Db;

    async init(): Promise<Db | undefined> {
        console.log("================DATABASE================");
        try {
            const MONGODB = process.env.DATABASE || "mongodb://localhost:27017/jwt-login-register-21";
            const mongoClient = await MongoClient.connect(MONGODB);

            this.db = mongoClient.db();
            // Mensaje visual con el estado
            console.log(`STATUS: ${chalk.greenBright("ONLINE")}`);
            console.log(`DATABASE: ${chalk.greenBright(this.db.databaseName)}`);
        } catch(error) {
            console.log(`ERROR: ${error}`);
            console.log(`STATUS: ${chalk.redBright("OFFLINE")}`);
            console.log(`DATABASE: ${chalk.redBright(this.db?.databaseName)}`);
        }
        return this.db;
    }
}

export default Database;