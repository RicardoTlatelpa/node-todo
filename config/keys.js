if(process.env.NODE_ENV === 'production') {
    console.log("we're in production");
    module.exports = require('./prod');
}else{
   module.exports =  require('./dev');
}