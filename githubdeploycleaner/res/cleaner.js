//See https://stackoverflow.com/a/61415131/3605220 for more info.

let tokenInput;
let reposInput;
let userInput;
let lastInput;
let logOutput;

const init = function() {
  tokenInput = document.getElementById('token');
  reposInput = document.getElementById('repos');
  userInput = document.getElementById('user');
  lastInput = document.getElementById('last');
  logOutput = document.getElementById('log');
};

(function(window, document, undefined){ window.onload = init; })(window, document, undefined);

const clean_OnClick = function() {
  clean(tokenInput.value, reposInput.value, userInput.value, lastInput.checked);
};

const clean = async function(token, repos, username, cleanLast) {
  if (token !== undefined && repos !== undefined && username !== undefined && cleanLast !== undefined) {

    let url = getUrl(repos, username);
    let authHeader = getAuthHeader(token);
    let start = cleanLast ? 0 : 1;

    let result = await getAllDeployments(url, authHeader);
    if (result !== null) {
      stampLog(`${result.length} deployments found`);
      
      if (result.length > start) {
        for (let index = start; index < result.length; index++) {
          const id = result[index].id;

          await makeDeploymentInactive(id, url, authHeader);
          stampLog(`${id} marked as "inactive"`);

          await deleteDeployment(id, url, authHeader);
          stampLog(`${id} deleted`);
        }

        alert(`${result.length - 1} deployments deleted.`);
      }
      else alert("There is no deployment to delete.");
    }
    else alert("Invalid parameters.");
  }
};

const getUrl = function(repos, username) {
  return `https://api.github.com/repos/${username}/${repos}/deployments`;
};

const getAuthHeader = function(token) {
  return `token ${token}`;
};

const getAllDeployments = async function(url, authHeader) {
  let params = {
    headers: { authorization: authHeader }
  };
  let deplList = await fetch(`${url}`, params);
  if (deplList.ok) {
    return await deplList.json();
  }
  else return null;
};

const makeDeploymentInactive = async function(id, url, authHeader) {
  let params = {
    method: "POST",
    body: JSON.stringify({ state: "inactive" }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.github.ant-man-preview+json",
      authorization: authHeader
    }
  };
  await fetch(`${url}/${id}/statuses`, params);
  return id;
};

const deleteDeployment = async function(id, url, authHeader) {
  let params = {
    method: "DELETE",
    headers: { authorization: authHeader }
  };
  await fetch(`${url}/${id}`, params);
  return id;
};

const stampLog = function(logLine) {
  logOutput.value += `> ${logLine}`;
  logOutput.value += `\n`;
}
