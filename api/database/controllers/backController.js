const { Back: BackRepository, Title, Rate } = require("../models/models.js");


async function findAll() {
  const backs = await BackRepository.findAll({ include: [Title, Rate] });
  return backs;
}
async function findById(id) {
  const back = await BackRepository.findById(id);
  return back;
}
async function create(back) {
  const newBack = await BackRepository.create(back, {
    include: [{
      association: BackRepository.Title
    },{
      association: BackRepository.Rate
    }]
  });

  return newBack;
}
async function update(id, back) {
  const updatedback = await BackRepository.update(id, back);
  return updatedback;
}
async function remove(id) {
  const deletedback = await BackRepository.remove(id);
  return deletedback;
}

module.exports = { findAll, findById, create, update, remove };