/* eslint-disable linebreak-style */

/*roomList.remove = function (value) {
  for (let i = 0; i < roomList.length; i++) {
    if (roomList[i].name == value)
      {roomList.splice(i);}
  }
};*/
/*function checkExists(roomList, value) {
  for (let i = 0; i < roomList.length; i++) {
    if (roomList[i].name == value) {
      console.log(`${roomList[i].name} = ${value}`);
      return false;
    }
  }
  return true;
}*/
// prevent XSS
function htmlEscape(room) {
  return room.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = htmlEscape;
