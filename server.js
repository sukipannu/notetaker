const PORT = process.env.PORT || 3001;
const app = express();
const express = require('express'); 
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

//retrieve css and js files
app.use(express.static("public"));

//JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
//app.use(express.static('public'));

//PORT 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});

module.exports = app;