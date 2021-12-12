const newUser = document.getElementById("add-user");
const main = document.getElementById("main");
const double = document.getElementById("double");
const millionaire = document.getElementById("show-millionaires");
const sort = document.getElementById("sort");
const wealthTotal = document.getElementById("calculate-wealth");
newUser.addEventListener("click", addUser);
double.addEventListener("click", doubleMoney);
millionaire.addEventListener("click", showMillionaires);
sort.addEventListener("click", richestList);
wealthTotal.addEventListener("click", totalWealth);
let users = [];

addUser();
addUser();
addUser();

// api request
function addUser() {
  fetch("https://randomuser.me/api/")
    .then((response) => response.json())
    .then((res) => {
      const infoName = res.results[0].name;
      const user = {
        fullName: `${infoName.first} ${infoName.last}`,
        wealth: Math.floor(Math.random() * 1000000),
      };

      addNewUser(user);
      updateDOM();
    });
}
// update the DOM after fetching the data
function updateDOM() {
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;
  users.forEach(function (user) {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${user.fullName}</strong>
    ${wealthFormat(user.wealth)}`;
    main.appendChild(element);
  });
}
// add new user into the array function
function addNewUser(user) {
  users.push(user);
  updateDOM();
}
// double money of all users function
function doubleMoney() {
  users = users.map(function (user) {
    return { ...user, wealth: user.wealth * 2 };
  });

  updateDOM();
}
// filter users by net worth function(over a million $)
function showMillionaires() {
  users = users.filter(function (user) {
    if (user.wealth > 1000000) {
      return users;
    }
  });
  updateDOM();
}
// wealth formatting function
function wealthFormat(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// sort by richest function

function richestList() {
  users.sort(function (a, b) {
    return b.wealth - a.wealth;
  });
  updateDOM();
}

// calculate total wealth

function totalWealth() {
  const total = users.reduce(function (total, user) {
    total += user.wealth;
    return total;
  }, 0);

  const element = document.createElement("div");
  element.innerHTML = `<h2>Total Wealth: <strong>${wealthFormat(
    total
  )}</strong></h2>`;
  main.appendChild(element);
}
