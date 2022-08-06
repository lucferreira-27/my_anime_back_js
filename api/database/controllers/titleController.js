const {Title:TitleRepository} = require("../models/models.js");


async function findAll() {
  const Titles = await TitleRepository.findAll();
  return Titles;
}
async function findById(id) {
  const Title = await TitleRepository.findById(id);
  return Title;
}
async function create(title) {
  const newTitle =  await TitleRepository.create(title, {
    include: [{
      association: TitleRepository.Rate
    }]
  });
  return newTitle;
}
async function update(id, Title) {
  const updatedTitle = await TitleRepository.update(id, title);
  return updatedTitle;
}
async function remove(id) {
  const deletedTitle = await TitleRepository.remove(id);
  return deletedTitle;
}

module.exports ={ findAll, findById, create, update, remove };