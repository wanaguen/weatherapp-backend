var express = require("express");
var router = express.Router();

const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");


// inscription
router.post("/signup", (req, res) => {
    // check if signup data is valid
    if(!checkBody(req.body, ["name", "email", "password"])) {
        res.json({ result: false, error: "Missing or empty fields" });
        return;
    }
    // check if user is already registered in BDD
    User.findOne({ email: req.body.email }).then((data => {
        if (data === null) {            
            // user is not created => create a new user
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            // save the user in BDD
            newUser.save().then((data) => {
                res.json({ result: true });
            });
        } else {
            // user already exists in BDD
            res.json({ result: false, error: "User already exists" });
        }
    }
    ));
});



// connection
router.post("/signin", (req, res) => {
    // check if signin data is valid
    if(!checkBody(req.body, ["email", "password"])) {
        res.json({ result: false, error: "Missing or empty fields" });
        return;
    }
    // check if user is already registered in BDD   
    User.findOne({ email: req.body.email , password:req.body.password}).then((data => {
        if (data) {
            //user is found in BDD
            res.json({ result: true });
        } else {
            // user not found in BDD
            res.json({ result: false, error: "User not found" });
        }
    }
    ));
});


// router.post("/signup", (req, res) => {});


//router.post("/signin", (req, res) => {});


// check if the user already exists
// router.post("/signup", (req, res) => {
//   const { email, password, name } = req.body;
//   // premuere etape => check si email et password sont fournis
//   if (email && password) {
//     User.findOne({ email: email }).then((data) => {
//       if (data === null) {
//         const newUser = new User({
//           name: name,
//           email: email,
//           password: password,
//         });
//         // Finally save in database
//         newUser.save().then((data) => {
//           res.json({ result: true });
//         });
//       } else {
//         // User already exists in database
//         res.json({ result: false, error: "User already exists" });
//       }
//     });
//   } else {
//     // check if email and password are provided
//     res.json({ result: false, error: "Missing or empty fields" });
//   }
// });


// router.post("/signin", (req, res) => {
//     const { email, password, name } = req.body;

//     if (email && password) {
//         User.findOne({ email: email }).then((data) => {
//           if (data === null) {
//             res.json({ result: false, error: 'User not found' });
//           }
//         });
//       } else {
//         // check if email and password are provided
//         res.json({ result: false, error: "Missing or empty fields" });
//       }
//     });
// }


module.exports = router;
