import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import dirname from "./path.cjs";

const app = express();
app.use(express.json());
app.use(cors());

const dataBase = mysql.createConnection({
  host: "localhost",
  password: "",
  user: "root",
  database: "campas",
});

dataBase.connect((err) => {
  if (err) {
    console.log("Can't connect dataBase");
  } else {
    console.log("DataBase connected");
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Resume");
    // console.log(req,file)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const randomNumber = Math.round(Math.random() * 1e9);

    const fileName = file.fieldname + "-" + randomNumber + ext;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, resp) => {
  const student_id = req.body.student_id;
  const fileName = req.file.filename;
  console.log(fileName);
  const filePath = path.join(dirname, "Resume", req.file.filename);
  const statement =
    "insert into student_file(user_id,file_name,file_path)values(?,?,?);";
  dataBase.query(statement, [student_id, fileName, filePath], (err, res) => {
    if (err) {
      console.log(err);
      return resp.status(500).send("Unable to upload file");
    } else {
      return resp.status(200).send("Uploaded");
    }
  });
});

app.get("/allresume", (req, resp) => {
  dataBase.query("select * from student_file;", (err, res) => {
    if (err) return resp.send("Cannot fetch student_file");
    return resp.json(res);
  });
});
app.get("/dwn", (req, res) => {
  res.sendFile("D:\\Campus Career Hub\\Backend\\Resume\\file-782131130.pdf");
});
app.get("/downloadresume/:id", (req, resp) => {
  const { id } = req.params;
  console.log(id);
  const sql = "select file_path from student_file where user_id=?";
  dataBase.query(sql, [id], (err, res) => {
    if (err) {
      return console.log(err);
    } else if (res.length <= 0) {
      console.log(res);
      return resp.status(404).send("no data");
    } else {
      console.log(res);
      const filePath = res[0].file_path;
      console.log(filePath);

      return resp.sendFile(filePath);
      // return resp.sendFile(filePath, (err) => {
      //   console.log("Error in sending file");
      // });
    }
  });
}); 

app.post("/addscore", (req, resp) => {
  const { std_id, std_name, scoreType, scoreValue } = req.body;
  console.log(std_id, std_name, scoreType, scoreValue);
  const selectStatement = "SELECT * FROM studentscores WHERE std_id=?";
  dataBase.query(selectStatement, [std_id], (err, res) => {
    if (err) {
      console.log(err);
      return resp.status(500).json({ status: "server error" });
    } else if (res.length > 0) {
      console.log(res[0]);
      const existingScores = res[0];
      let updateRequired = false;
      if (scoreType === "arithmetic" && scoreValue > existingScores.arithmetic) {
        existingScores.arithmetic = scoreValue;
        updateRequired = true;
      } else if (scoreType === "verbal" && scoreValue > existingScores.verbal) {
        existingScores.verbal = scoreValue;
        updateRequired = true;
      } else if (scoreType === "logical" && scoreValue > existingScores.logical) {
        existingScores.logical = scoreValue;
        updateRequired = true;
      } else if (scoreType === "interpretation" && scoreValue > existingScores.interpretation) {
        existingScores.interpretation = scoreValue;
        updateRequired = true;
      }

      if (updateRequired) {
        const updateStatement = `UPDATE studentscores SET ${scoreType}=? WHERE std_id=?`;
        const updateValues = [scoreValue, std_id];
        dataBase.query(updateStatement, updateValues, (err, result) => {
          if (err) {
            return resp.status(500).json({ status: "server error" });
          } else {
            return resp.status(200).json({ status: "success" });
          }
        });
      } else {
        return resp.status(200).json({ status: "scores not higher, no update needed" });
      }
    } else {
      const insertStatement = "INSERT INTO studentscores (std_id, std_name, ??) VALUES (?, ?, ?)";
    const insertValues = [scoreType, std_id, std_name, scoreValue];
    dataBase.query(insertStatement, insertValues, (err, result) => {
      if (err) {
        return resp.status(500).json({ status: "server error" });
      } else {
        return resp.status(200).json({ status: "success" });
      }
    });
  }
    
  });
});

app.get("/seescore", (req, res) => {
  const selectStatement = "SELECT std_name, arithmetic, verbal, logical, interpretation FROM studentscores";
  dataBase.query(selectStatement, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ status: "server error" });
    } else {
      const students = rows.map(row => ({
        std_name: row.std_name,
        scores: {
          arithmetic: row.arithmetic,
          verbal: row.verbal,
          logical: row.logical,
          interpretation: row.interpretation
        }
      }));
      return res.status(200).json(students);
    }
  });
});



app.post("/addnotice", (req, resp) => {
  const {
    company_name,
    designation,
    required_skills,
    vacancies,
    target_degree_branches,
    job_location,
    interview_date,
  } = req.body;
  console.log(company_name);
  const statement =
    "INSERT INTO notice (company_name, designation,required_skills, vacancies, target_degree_branches, job_location, interview_date) VALUES (?, ?, ?,?, ?, ?, ?)";

  dataBase.query(
    statement,
    [
      company_name,
      designation,
      required_skills,
      vacancies,
      target_degree_branches,
      job_location,
      interview_date,
    ],
    (err, res) => {
      if (err) {
        console.log(err);
        resp.status(500).json({ error: "Failed to add notice" });
      } else {
        resp.status(200).json({ message: "Notice added successfully" });
      }
    }
  ); 
});
app.post("/addintern", (req, resp) => {
  const {
    company_name,
    open_position,
    contact_email,
    contact_number,
    enroll_now_link,
  } = req.body;
  console.log(company_name);
  const statement =
    "INSERT INTO internship(company_name, open_position,contact_email, contact_number, enroll_now_link) VALUES(?, ?, ?,?, ?)";
  dataBase.query(
    statement,
    [
      company_name,
      open_position,
      contact_email,
      contact_number,
      enroll_now_link,
    ],
    (err, res) => {
      if (err) {
        console.log(err);
        resp.status(500).json({ error: "Failed to add intern" });
      } else {
        resp.status(200).json({ message: "Intern added successfully" });
      }
    }
  );
});
app.post("/addappoint", (req, resp) => {
  const {
    company_name,
    position,
    title,
    location
  } = req.body;
  console.log(company_name);
  const statement =
    "INSERT INTO appointees(company_name,position,title,location) VALUES(?, ?, ?,?)";
  dataBase.query(
    statement,
    [
      company_name,
      position,
      title,
      location
    ],
    (err, res) => {
      if (err) {
        console.log(err);
        resp.status(500).json({ error: "Failed to Add" });
      } else {
        resp.status(200).json({ message: "Added successfully" });
      }
    }
  );
});
app.get("/appointees", (req, resp) => {
  const statement = "select * from appointees";
  dataBase.query(statement, (err, res) => {
    if (err) {
      return resp.status(500).send("Server error");
    } else {
      return resp.status(200).json(res);
    }
  });
});
app.get("/events", (req, resp) => {
  const statement = "select * from events";
  dataBase.query(statement, (err, res) => {
    if (err) {
      return resp.status(500).send("Server error");
    } else {
      return resp.status(200).json(res);
    }
  });
});

app.post("/addevent", (req, resp) => {
  const {
    eventDetails
  } = req.body;
  const statement =
    "INSERT INTO events(eventDetails) VALUES(?)";
  dataBase.query(
    statement,
    [
      eventDetails
    ],
    (err, res) => {
      if (err) {
        console.log(err);
        resp.status(500).json({ error: "Failed to add event" });
      } else {
        resp.status(200).json({ message: "Event added successfully" });
      }
    }
  );
});

app.get("/students", (req, resp) => {
  dataBase.query("select * from students;", (err, res) => {
    if (err) {
      return resp.send("Cannot fetch users");
    } else {
      return resp.json(res);
    }
  });
});

app.post("/std_login", (req, resp) => {
  const { email, password } = req.body;
  const statement = "SELECT * FROM students WHERE student_email=?";
  dataBase.query(statement, [email], async (err, res) => {
    try {
      if (err) {
        console.log(err);
        return resp.status(500).send("Server error");
      } else if (res.length > 0) {
        if (res[0].student_password == password) {
          console.log(res[0]);
          const data = {
            student_id: res[0].student_id,
            student_name: res[0].student_name,
            student_email: res[0].student_email,
            student_password: res[0].student_password,
          };
          return resp.status(200).json({ data });
        } else {
          return resp.status(400).json({ status: "password mismatch" });
        }
      } else {
        return resp.status(404).json({ status: "invalid user" });
      }
    } catch (error) {
      console.log(error);
      return resp.status(500).json({ status: "Server error" });
    }
  });
});

app.post("/faculty_login", (req, resp) => {
  const { email, password } = req.body;
  const statement =
    "SELECT faculty_password FROM faculty WHERE faculty_email=?";
  dataBase.query(statement, [email], async (err, res) => {
    try {
      if (err) {
        console.log(err);
        return resp.status(500).send("Server error");
      } else if (res.length > 0) {
        if (res[0].faculty_password === password) {
          return resp.status(200).json({ status: "user verified" });
        } else {
          return resp.status(400).json({ status: "password mismatch" });
        }
      } else {
        return resp.status(404).json({ status: "invalid user" });
      }
    } catch (error) {
      console.log(error);
      return resp.status(500).json({ status: "Server error" });
    }
  });
});

app.post("/admin_login", (req, resp) => {
  const { email, password } = req.body;
  const statement = "SELECT admin_password FROM admin WHERE admin_email=?";
  dataBase.query(statement, [email], async (err, res) => {
    try {
      if (err) {
        console.log(err);
        return resp.status(500).send("Server error");
      } else if (res.length > 0) {
        if (res[0].admin_password === password) {
          return resp.status(200).json({ status: "admin verified" });
        } else {
          return resp.status(400).json({ status: "password mismatch" });
        }
      } else {
        return resp.status(404).json({ status: "invalid admin" });
      }
    } catch (error) {
      console.log(error);
      return resp.status(500).json({ status: "Server error" });
    }
  });
});

app.post("/recruiter_login", (req, resp) => {
  const { email, password } = req.body;
  const statement =
    "SELECT recruiter_password FROM recruiter WHERE recruiter_email=?";
  dataBase.query(statement, [email], async (err, res) => {
    try {
      if (err) {
        console.log(err);
        return resp.status(500).send("Server error");
      } else if (res.length > 0) {
        if (res[0].recruiter_password === password) {
          return resp.status(200).json({ status: "recruiter verified" });
        } else {
          return resp.status(400).json({ status: "password mismatch" });
        }
      } else {
        return resp.status(404).json({ status: "invalid recruiter" });
      }
    } catch (error) {
      console.log(error);
      return resp.status(500).json({ status: "Server error" });
    }
  });
});

app.post("/std_register", async (req, resp) => {
  const { name, email, password } = req.body;
  const statement = "SELECT * FROM students WHERE student_name=?";
  dataBase.query(statement, [name], async (err, res) => {
    if (err) {
      return resp.status(500).json({ status: "server error" });
    } else if (res.length <= 0) {
      dataBase.query(
        "INSERT INTO students(student_name, student_email, student_password) VALUES (?, ?, ?);",
        [name, email, password],
        (err, res) => {
          if (err) {
            console.log(err);
            return resp.status(501).json(res);
          } else {
            dataBase.query(
              "select student_id from students where student_email=?",
              [email],
              (err, res) => {
                const data = { student_id: res[0].student_id };
                console.log(res);
                console.log(data);
                return resp.status(200).json({ data });
              }
            );
          }
        }
      );
    } else {
      return resp.status(400).json({ status: "user exists" });
    }
  });
});

app.post("/faculty_register", async (req, resp) => {
  const { name, email, password } = req.body;
  const statement = "SELECT * FROM faculty WHERE faculty_name=?";
  dataBase.query(statement, [name], async (err, res) => {
    if (err) {
      return resp.status(500).json({ status: "server error" });
    } else if (res.length <= 0) {
      dataBase.query(
        "INSERT INTO faculty(faculty_name, faculty_email, faculty_password) VALUES (?, ?, ?);",
        [name, email, password],
        (err, res) => {
          if (err) {
            console.log(err);
            return resp.status(501).json(res);
          } else {
            return resp.status(200).json({ status: "user added successfully" });
          }
        }
      );
    } else {
      return resp.status(400).json({ status: "user exists" });
    }
  });
});

app.post("/admin_register", async (req, resp) => {
  const { name, email, password } = req.body;
  const statement = "SELECT * FROM admin WHERE admin_name=?";
  dataBase.query(statement, [name], async (err, res) => {
    if (err) {
      return resp.status(500).json({ status: "server error" });
    } else if (res.length <= 0) {
      dataBase.query(
        "INSERT INTO admin(admin_name, admin_email, admin_password) VALUES (?, ?, ?);",
        [name, email, password],
        (err, res) => {
          if (err) {
            console.log(err);
            return resp.status(501).json(res);
          } else {
            return resp
              .status(200)
              .json({ status: "admin added successfully" });
          }
        }
      );
    } else {
      return resp.status(400).json({ status: "admin exists" });
    }
  });
});

app.post("/recruiter_register", async (req, resp) => {
  const { name, email, password } = req.body;
  const statement = "SELECT * FROM recruiter WHERE recruiter_name=?";
  dataBase.query(statement, [name], async (err, res) => {
    if (err) {
      return resp.status(500).json({ status: "server error" });
    } else if (res.length <= 0) {
      dataBase.query(
        "INSERT INTO recruiter(recruiter_name, recruiter_email, recruiter_password) VALUES (?, ?, ?);",
        [name, email, password],
        (err, res) => {
          if (err) {
            console.log(err);
            return resp.status(501).json(res);
          } else {
            return resp
              .status(200)
              .json({ status: "recruiter added successfully" });
          }
        }
      );
    } else {
      return resp.status(400).json({ status: "recruiter exists" });
    }
  });
});

app.get("/internship", (req, resp) => {
  const statement = "select * from internship";
  dataBase.query(statement, (err, res) => {
    if (err) {
      return resp.status(500).send("Server error");
    } else {
      return resp.status(200).json(res);
    }
  });
});
app.get("/notice", (req, resp) => {
  const statement = "select * from notice";
  dataBase.query(statement, (err, res) => {
    if (err) {
      return resp.status(500).send("Server error");
    } else {
      return resp.status(200).json(res);
    }
  });
});

// app.post("/std_register", async (req, resp) => {
//   const { student_name, student_email, student_password } = req.body;
//   const statement = "select * from students where student_name=?";
//   dataBase.query(statement, [student_name], async (err, res) => {
//     if (err) {
//       return resp.status(500).json({ status: "server error" });
//     } else if (res.length <= 0) {
//       const hashedPass = await bcrypt.hash(student_password, 5);

//       dataBase.query(
//         "insert into students(student_name,student_email,student_password) values(?,?,?);",
//         [student_name, student_email, hashedPass],
//         (err, res) => {
//           if (err) {
//             console.log(err);
//             return resp.status(501).json(res);
//           } else {
//             return resp.status(200).json({ status: "user added successfully" });
//           }
//         }
//       );
//     } else {
//       return resp.status(400).json({ status: "user exists" });
//     }
//   });
// });

// app.post("/std_login", (req, resp) => {
//   const { student_email, student_password } = req.body;
//   console.log(req.body);
//   const statement =
//     "select student_password from students where student_email=?;";
//   dataBase.query(statement, [student_email], async (err, res) => {
//     try {
//       if (err) {
//         console.log(err);
//         return resp.status(500).send("Server error");
//       } else if (res.length > 0) {
//         console.log(res);
//         const decryptedPass = await bcrypt.compare(
//           student_password,
//           res[0].student_password
//         );
//         console.log(decryptedPass);
//         if (decryptedPass) {
//           return resp.status(200).json({ status: "user verified" });
//         } else {
//           return resp.status(400).json({ status: "password mismatch" });
//         }
//       } else if (res.length <= 0) {
//         console.log(res);
//         return resp.status(404).json({ status: "invalid user" });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   });
// });
app.listen("8080", (err) => {
  if (err) {
    console.log("Not running");
  } else {
    console.log("Running at port 8080");
  }
});
