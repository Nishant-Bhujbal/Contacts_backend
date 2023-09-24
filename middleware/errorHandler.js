const {constants} = require('../constants')

// this helps to convert error in html to json
const errorHandler = (err,req,res,next) =>{
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({title:"Validation Failed" ,message : err.message, stackTrace : err.stack});
            break;
        
            case constants.NOT_FONUD:
                res.json({title:"Not Found" ,message : err.message, stackTrace : err.stack});
                break;

            case constants.UNAUTHORIZED:
                res.json({title:"Unauthorized" ,message : err.message, stackTrace : err.stack});
                break;

            case constants.FORBIDDEN:
                res.json({title:"Forbidden" ,message : err.message, stackTrace : err.stack});
                break;

            case constants.SERVER_ERROR:
                res.json({title:"Server Error" ,message : err.message, stackTrace : err.stack});
                break;
        default:
            console,log("NO Error");
            break;
    }
};

module.exports = errorHandler;