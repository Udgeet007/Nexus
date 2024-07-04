import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { generate } from "./utils";
import { getAllFiles } from "./file";
import path from "path";
import { uploadFile } from "./aws";
import { createClient} from "redis";
const publisher = createClient();
publisher.connect();


const app = express();
app.use(cors());
app.use(express.json());

//POSTMAN
app.post("/deploy", async (req,res) => {
  const repoUrl = req.body.repoUrl; //github.com/
  const id = generate();
  await simpleGit().clone(repoUrl,path.join(__dirname, `output/${id}`));

  const files = getAllFiles(path.join(__dirname, `output/${id}`));

  files.forEach(async file => {
      await uploadFile(file.slice(__dirname.length + 1), file);
  })

  publisher.lPush("build-queue", id);
  
  res.json({
    id: id
  })
  
})

app.listen(3000);


//1DXWofL7iEpt1BBMdwGonNR4ikj9rNDiJbRAGo9naqBjoue5nm8CwH6QFRdZ8oRvR75fbLkLxsajurLnwoSxBWVyiL9CCSPY1PbY71QBP3hWzg3WFF9KWYeNeQWwSGwbGCBPk1y4a1Rk5wmK5VYFRMtUmrvfDeuRmCgCmobx3M7xmUkc9XuzrnF1bsnVLnfhRuizRRRuWJgDhNoK8w4bR6sae9FrrxuKiMo2HfFRBELTitCtYMY7fMnuq3u6z3wPNVrPrwMHL61F6GSCWVjdJZGFjME7BKcGxmDPvynaAsBakFkkskfib3M532hUgEPyZ3ADqU34VqqY8Bpqk1oF8L

// jwlwxz3zrxzvr56ebsserqxkmjpq (access key)
// j2yv4jlhxp7myioyugjqhi2zvsih7ijo63fhzrcadbqpfzuoz5lxm (secret Key)
// https://gateway.storjshare.io  (endpoint)