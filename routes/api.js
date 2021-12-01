const pool = require("../config/dbPool.js");

module.exports = (app) => {
    /*
    Two APIs for getting chapters from database.
    1. /chapters?action=all
        -Returns all data from the chapters table.
    2. /chapters?action=titles
        -Returns the id and title for every chapter
    */
    app.get("/chapters", function(req, res){
        let sql;
        let sqlParams = [];
        switch (req.query.action) {
            case "all":       sql = "SELECT * FROM chapters";
                              break;
            case "titles":    sql = "SELECT id, title FROM chapters";
                              break;
            case "single":    sql = "SELECT * from chapters WHERE id = ?";
                              sqlParams = [req.query.id];
                              break;
            default:          res.status(400).send('Invalid API action');
                              return;
        }

        pool.query(sql, sqlParams, function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.status(500).send('Internal database error');
            } else {
                // console.log(rows); //testing
                res.send(rows);//sends data
            }
        });
    }); // "/chapters"

    /*
    Three APIs for getting pages from database.
    1. /pages?action=page&id={}
        -Returns a single page based upon the page_id
    2. /pages?action=chapter&id={}
        -Returns an entire chapter of pages based upon the chapter_id
    3. /pages?action=titles
        -Returns all titles in the format: page_title, page_id, chapter_title, chapter_id
    */
    app.get("/pages", function(req, res){
        let sql;
        let sqlParams = [];

        switch(req.query.action){
            case "page":      sql = "SELECT * FROM pages WHERE id = ?";
                              sqlParams.push(req.query.id);
                              break;
            case "chapter":   sql = "SELECT * FROM pages WHERE chapter_id = ?";
                              sqlParams.push(req.query.id);
                              break;
            case "titles":    sql = `
                              SELECT ch.id AS chapter_id,
                                     ch.title AS chapter_title,
                                     p.id AS page_id,
                                     p.title AS page_title
                              FROM pages AS p
                              JOIN chapters AS ch
                                  ON ch.id = p.chapter_id
                              ORDER BY ch.id, p.id
                              `;
                              break;
            case "visit":     sql = `UPDATE users SET lastVisited = ? WHERE id = ?`;
                              sqlParams.push(`/chapter?id=${req.query.chapterId}&pageInd=${req.query.pageInd}`, req.session.passport.user.id);
                              break;
            default:          res.status(400).send('Invalid API action');
                              return;
        }

        pool.query(sql, sqlParams, function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.status(500).send('Internal database error');
            } else {
              // console.log(rows); //testing
              res.send(rows);//sends
            }
        });
    }); // "/pages"
};
