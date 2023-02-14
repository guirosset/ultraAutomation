const newman = require('newman'); // require newman in your project
// call newman.run to pass `options` object and wait for callback
newman.run({
    collection: require('../../support/collection/apiUltraAutomation.json'),
    reporters: 'cli'
}, function(err){
    if(err) {
        console.log(err)
        throw err
    }
});