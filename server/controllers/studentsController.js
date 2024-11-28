const mysql = require("mysql");

// MySql connection
const con = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

exports.view = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("connection successful");

      connection.query("select * from users", (err, rows) => {
        connection.release();

        if (!err) {
          console.log("connection good");

          // page render
          res.render("home", { rows });
        } else {
          console.log("Error in Listening Data" + err);
        }
      });
    }
  });
};

exports.adduser = (req, res) => {
  res.render("adduser");
};

exports.save = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("connection successful");

      const { name, age, city } = req.body;

      connection.query(
        "insert into users (NAME,AGE,CITY) values(?,?,?)",
        [name, age, city],
        (err, rows) => {
          connection.release();

          if (!err) {
            res.render("adduser", { msg: "User Details Added Success" });
          } else {
            console.log("Error in Listening Data" + err);
          }
        }
      );
    }
  });
};


exports.edituser = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("connection successful");

      //Get ID from url
      let id = req.params.id;

      connection.query("select * from users where id=?",[id], (err, rows) => {
        connection.release();


        if (!err) {
          console.log("connection good");

          // page render
          res.render("edituser", { rows });
        } else {
          console.log("Error in Listening Data" + err);
        }
      });
    }
  });
};

//save after edit
exports.edit = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("connection successful");
      
       //Get ID from url
      let id = req.params.id;
      const { name, age, city } = req.body;

      connection.query(
        "update users set NAME=?,AGE=?,CITY=? where ID=?",[name, age, city,id],(err, rows) => {
          connection.release();

          if (!err) {

            con.getConnection((err, connection) => {
              if (err) {
                console.log("Error " + err);
              } else {
                console.log("connection successful");
          
                //Get ID from url
                let id = req.params.id;
          
                connection.query("select * from users where id=?",[id], (err, rows) => {
                  connection.release();
          
          
                  if (!err) {
                    console.log("connection good");
          
                    // page render
                    res.render("edituser", { });
                    res.render("edituser", { rows, msg: "User Details Updated Success" });
                  } else {
                    console.log("Error in Listening Data" + err);
                  }
                });
              }
            });


           
          } else {
            console.log("Error in Listening Data" + err);
          }
        }
      );
    }
  });
};


exports.delete=(req,res)=>{
  con.getConnection((err,connection)=>{
    if(err) throw err
    //Get ID url
    let id = req.params.id;
    connection.query("delete from users where id=?",[id],(err,rows)=>{
       connection.release();
       if(!err){
         res.redirect("/");
       }
       else{
        console.log(err);
        
       }
    })
  });
}