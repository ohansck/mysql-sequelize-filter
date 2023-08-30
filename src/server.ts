//import cors from 'cors';
import 'dotenv/config'
//require('dotenv').config();
import express from 'express';
import { sequelize, searchOrders } from './sequelize';
import bodyParser from 'body-parser';



(async () => {

    try {
        console.debug("Initialize database connection...");
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    // await sequelize.sync();

    const app = express();
    const port = process.env.PORT || 8080;

    app.use(bodyParser.json());

    // Root URI call
    app.get('/', async (req, res) => {
        //const payload = req.body;

        //Sample payload from endpoint. None is compulsory, all optional
        // payload format {
        //     orderNumber?: number;
        //     startDate?: Date;
        //     endDate?: Date;
        //     status?: string;
        // }
        //Payload example
        // const payload = {
        //     orderNumber: ParseInt(req.body.orderNumber),
        //     startDate: new Date(req.body.startDate),
        //     endDate: new Date(req.body.startDate),
        //     status: "Shipped",
        // }

        //const response = await searchOrders(payload);
        //res.send(response);
    });


    // Start the Server
    app.listen(port, () => {
        console.log(`server running on port ${port}`);
        console.log(`press CTRL+C to stop server`);
    });

})();
