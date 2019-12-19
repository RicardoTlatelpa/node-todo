if(process.env.NODE_ENV === 'production') {
    console.log("we're in production");
    module.exports = require('./prod');
}else{
    console.log("we're not in production :(");
   module.exports =  require('./dev');
}