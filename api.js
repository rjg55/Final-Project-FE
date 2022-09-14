import axios from "axios";

function getEvents() {
  return axios
    .get(`http://54.86.179.94:8080/api/events`)
    .then(({ data }) => {
      return data.events;
    })
    .catch((err) => {
      console.log(err);
    });
}

function getAllGroups() {
  return axios.get("http://54.86.179.94:8080/api/groups").then(({ data }) => {
    return data.groups;
  });
}

function getSingleEvent(id) {
  return axios
    .get(`http://54.86.179.94:8080/api/events/${id}`)
    .then(({ data }) => {
      return data.event;
    });
}

function getGroupByID(id) {
  return axios
    .get(`http://54.86.179.94:8080/api/groups/${id}`)
    .then(({ data }) => {
      return data.group;
    });
}

function getEventMessages(id) {
  return axios
    .get(`http://54.86.179.94:8080/api/event-messages/events/${id}`)
    .then(({ data }) => {
      return data.messages;
    });
}

function postGroup(newGroupName, groupCategory, newGroupDescription, username) {
  return axios.post("http://54.86.179.94:8080/api/groups", {
    title: newGroupName,
    category: groupCategory,
    description: newGroupDescription,
    admin: username,
  });
}

function patchGroupById(_id, updatedMembers) {
  return axios.post(`http://54.86.179.94:8080/api/groups/${group_id}`, {
    members: updatedMembers,
  });
}

module.exports = {
  getAllGroups,
  getEvents,
  getSingleEvent,
  getEventMessages,
  getGroupByID,
  postGroup,
  patchGroupById,
};
