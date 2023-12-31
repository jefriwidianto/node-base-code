(async function() {
        const environments = require('custom-env').env();
        environments.env(process.env.NODE_ENV,'Environment/');
        const express = require('express');
        const compression = require('compression');
        const bodyParser = require('body-parser');
        const cookieParser = require('cookie-parser');
        const cors = require('cors');

        const app = express();
        app.enable('trust proxy')
        const http = require('http').Server(app);
        const connectMongo = require('./Services/MongoDB/mongo');

        app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
        app.use(bodyParser.json({ limit: '50mb' }));
        app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
        app.use(cookieParser());
        app.use(compression({ level: 9 }));
        app.use(cors());

        //Init for all Environment & connect to all DB ENGINE
        let conMongo = await connectMongo.connectMongo();
        global.rootPath = __dirname;
        global.$hostPath = process.env.HOST_PATH;
        console.log(conMongo);

        // Init for swagger API Doc.
        const swaggerUi = require('swagger-ui-express');
        const openApiDocumentation = require('./openApiDocumentation/openApiDocumentation.json');

        //Collected All Routing API
        app.use('/tested', require('./src/tested'));
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

        http.listen(process.env.NODE_SERVER_PORT, () => {
            console.log(`Successfully load config on => ${process.env.NODE_ENV}`)
            console.log(`Successfully connecting server on port => ${process.env.NODE_SERVER_PORT}`)
        });
})();