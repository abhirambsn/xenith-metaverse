$(document).ready(function () {
  setTimeout(function () {
    $("#preLoader").addClass("uk-hidden");
    $("#postLoader").removeClass("uk-hidden");
  }, 3000);

  $(window).scroll(function () {
    var nav = $("#navbarMain");
    var top = 200;
    if ($(window).scrollTop() >= top) {
      nav.addClass("background-xenith");
    } else {
      nav.removeClass("background-xenith");
    }
  });
});

const setActive = (id) => {
  if (id > 7) return;
  if (id < 1) return;
  
  var ids = [1, 2, 3, 4, 5, 6, 7];
  ids.map((id) =>
    document.getElementById(`ni-${id}`).classList.remove("active")
  );
  document.getElementById(`ni-${id}`).classList.add("active");
};

const signs = document.querySelectorAll("x-sign");
const randomIn = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const mixupInterval = (el) => {
  const ms = randomIn(2000, 4000);
  el.style.setProperty("--interval", `${ms}ms`);
};

signs.forEach((el) => {
  mixupInterval(el);
  el.addEventListener("webkitAnimationIteration", () => {
    mixupInterval(el);
  });
});

const createTeamCard = (name, designation, imageUrl) => {
  var parent = document.createElement("div");
  parent.className = "col-md-4";
  parent.style.marginTop = "30px";

  var card = document.createElement("div");
  card.className = "team-card";

  var cardContainer = document.createElement("div");
  cardContainer.className = "container";

  var image = document.createElement("img");
  image.className = "team-card-img";
  image.src = imageUrl;

  var heading = document.createElement("h1");
  heading.innerHTML = name;

  var type = document.createElement("span");
  type.innerHTML = designation;

  cardContainer.appendChild(image);
  cardContainer.appendChild(type);
  cardContainer.appendChild(heading);
  card.appendChild(cardContainer);
  parent.appendChild(card);
  document.getElementById("teamContainer").appendChild(parent);
};

const createSponsorCard = (name, spType, imageUrl, link = "") => {
  var parent = document.createElement("div");
  parent.className = "col-md-4";
  parent.style.marginTop = "30px";

  var card = document.createElement("div");
  card.className = "sponsor-card";

  var cardContainer = document.createElement("div");
  cardContainer.className = "container";

  var image = document.createElement("img");
  image.src = imageUrl;
  image.width = 200;
  image.height = 100;
  image.onclick = () => window.open(link, "_blank", "noopener noreferrer");
  image.style.cursor = "pointer";

  var heading = document.createElement("h1");
  heading.innerHTML = name;

  var type = document.createElement("span");
  type.innerHTML = spType;

  cardContainer.appendChild(image);
  cardContainer.appendChild(type);
  cardContainer.appendChild(heading);
  card.appendChild(cardContainer);
  parent.appendChild(card);
  document.getElementById("sponsorContainer").appendChild(parent);
};

var images = [];
fetch("./teamData.json")
  .then((res) => res.json())
  .then((data) => {
    data.map((image) =>
      createTeamCard(image.name, image.designation, image.image)
    );
  })
  .catch((err) => console.error(err));

var sponsors = [];
fetch("./sponsorData.json")
  .then((res) => res.json())
  .then((data) => {
    data.map((sponsor) =>
      createSponsorCard(sponsor.name, sponsor.type, sponsor.image, sponsor.link)
    );
  })
  .catch((err) => console.error(err));
