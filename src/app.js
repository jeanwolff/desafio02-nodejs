const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  
  const repository = {
    id: uuid(),
    title, 
    url,
    techs,
    likes: 0
  }
  repositories.push(repository);
  return response.json(repository)
});


app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const index = repositories.findIndex(repo => repo.id ===id);

  if(index < 0 ){
    return response.status(400).json({error: 'Repository not found'});
  }

  const likes = repositories[index].likes;

  const repo = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[index] = repo;
  return response.json(repo);
});


app.delete("/repositories/:id", (request, response) => {
const { id } = request.params;

const index = repositories.findIndex(repo => repo.id ===id);

if(index < 0 ){
  return response.status(400).json({error: 'Repository not found'});
}

repositories.splice(index, 1);

return response.status(204).send();
});


app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(repo => repo.id ===id);
  
  if(index < 0){
    return response.status(400).json({error: 'Repository not found'});
  }

  const { title, url, techs, likes } = repositories[index];

  const repo = {
    id, 
    title,
    url, 
    techs, 
    likes: likes +1
  }

  repositories[index] = repo;

  return response.json(repo);
});

module.exports = app;
