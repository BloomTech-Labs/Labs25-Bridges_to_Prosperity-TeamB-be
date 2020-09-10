const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const jsdocConfig = require('../config/jsdoc');
const dotenv = require('dotenv');
const config_result = dotenv.config();
const dsModel = require('./dsService/dsModel');
const bridgeModel = require('./bridge/bridgeModel');
if (process.env.NODE_ENV != 'production' && config_result.error) {
  throw config_result.error;
}

const swaggerSpec = swaggerJSDoc(jsdocConfig);
const swaggerUIOptions = {
  explorer: true,
};

//###[  Routers ]###
const indexRouter = require('./index/indexRouter');
const profileRouter = require('./profile/profileRouter');
const dsRouter = require('./dsService/dsRouter');
const bridgeRouter = require('./bridge/bridgeRouter');

const app = express();

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
// docs would need to be built and committed
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUIOptions)
);

app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// application routes
app.use('/', indexRouter);
app.use(['/profile', '/profiles'], profileRouter);
app.use('/bridges', bridgeRouter);
app.use('/data', dsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err instanceof createError.HttpError) {
    res.locals.message = err.message;
    res.locals.status = err.statusCode;
    if (process.env.NODE_ENV === 'development') {
      res.locals.error = err;
    }
  }
  console.error(err);
  if (process.env.NODE_ENV === 'production' && !res.locals.message) {
    res.locals.message = 'ApplicationError';
    res.locals.status = 500;
  }
  if (res.locals.status) {
    res.status(res.locals.status || 500);
    const errObject = { error: res.locals.error, message: res.locals.message };
    return res.json(errObject);
  }
  next(err);
});

// Set interval will run every 24 hours

const updateBridgesFromDS = async () => {
  try {
    const dsBridges = await dsModel.bridgeData();
    const bridges = (await bridgeModel.getAllProjectCodes()).map((b) => {
      return b['project_code'];
    });
    const newBridges = dsBridges.data.filter((dsBridge) => {
      return !bridges.includes(dsBridge['project_code']);
    });
    const newBridgesTransformed = newBridges.map((bridge) => {
      return {
        country: bridge['Country'],
        province: bridge['Province'],
        district: bridge['District'],
        sector: bridge['Sector'],
        cell: bridge['Cell'],
        bridge_site_name: bridge['Bridge Site Name'],
        project_stage: bridge['Project Stage'],
        sub_stage: bridge['Project Sub-Stage'],
        project_code: bridge['Project Code'],
        bridge_type: bridge['Bridge Type'],
        span: bridge[' Span (m)'],
        lat: bridge[' GPS (Latitude)'],
        long: bridge['GPS (Longitude)'],
        individuals_directly_served: bridge['Individuals Directly Served'],
        form_name: bridge['Form: Form Name'],
        community_served_1: bridge['Community Served 1'],
        community_served_2: bridge['Community Served 2'],
        community_served_3: bridge['Community Served 3'],
        community_served_4: bridge['Community Served 4'],
        community_served_5: bridge['Community Served 5'],
        community_served_6: bridge['Community Served 6'],
        community_served_7: bridge['Community Served 7'],
        community_served_8: bridge['Community Served 8'],
        community_served_9: bridge['Community Served 9'],
        community_served_10: bridge['Community Served 10'],
        casesafeid_form: bridge['CaseSafeID Form'],
        bridge_opportunity_id: bridge['Bridge Opportunity: Opportunity ID'],
      };
    });

    await bridgeModel.addBridge(newBridgesTransformed);
  } catch (error) {
    console.log(error);
  }
};

setInterval(updateBridgesFromDS, 1000 * 60 * 60 * 24);

if (process.env.NODE_ENV !== 'test') {
  updateBridgesFromDS();
}

module.exports = app;
