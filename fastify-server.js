const fastify = require("fastify")();

const students = [
  {
    id: 1,
    last: "Last1",
    fist: "First1",
  },
  {
    id: 2,
    last: "Last2",
    fist: "First2",
  },
  {
    id: 3,
    last: "Last3",
    fist: "First3",
  },
];

fastify.get("/cit/student:", (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "application/json; chareset=utf-8")
    .send(students);
});

//retrun single student
fastify.get("/cit/student/:id", (request, reply) => {
  const { id } = request.params;
  let student = null;
  for (const item of students) {
    if (item.id === parseInt(id)) {
      student = item;
      break;
    }
  }
  if (!student) {
    reply
      .code(404)
      .header("Content-Type", " text/text; charset=utf-8")
      .send("Not Found");
  } else {
    reply
      .code(200)
      .header("Content-Type", " application/json; charset=utf-8")
      .send(student);
  }
});

//student post
fastify.post("/cit/student", (request, reply) => {
    console.log("body", request.body);
  const { last, first } = request.body;
  if (!last || !first) {
    reply
      .code(404)
      .header("Content-Type", " text/html; charset=utf-8")
      .send("Not Found");
  } 
  else {
    let id = 0;
    for (const student of students) {
      if (student.id > id) {
        id = student.id;
      }
    }
    id++;
    students.push({ id, last, first });
    reply
      .code(200)
      .header("Content-Type", " application/json; charset=utf-8")
      .send(students[students.length - 1]);
  }
  let response = request.body;
  reply
    .code(200)
    .header("Content-Type", " application/json; charset=utf-8")
    .send(response);
});

//unmatched
fastify.get("*", (request, reply) =>{
  reply
  .code(404)
  .header("Content-Type", "text/html; charset=utf-8")
  .send("<h1>Unsupported request or page!</h1>");
}
);

const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, adress) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${adress}`);
});
