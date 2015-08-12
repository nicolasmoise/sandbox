var express = require("express"),
    app = express(),
    path = require('path');

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, '')));

/* serves main page */
app.get("/*", function(req, res) {
    res.render('index');
});

var port = 8080;

app.listen(port, function() {
    console.log("Listening on " + port);
});
