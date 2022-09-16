let liftArea = document.getElementById("liftArea");

let floorNum = 0;
let submitBtn = document.getElementById("btnSave");
let liftHTML = `
  <div class="floor">
    <div id="commands">
      <button  id="upButton">+</button>
      <button>-</button>
    </div>

    <div id="gates">


    <div class="liftGate">
      <div class="liftGateLeft"></div>
      <div class="liftGateRight"></div>
    </div>
    </div>

    <h2>Floor: ${floorNum}</h2>
  </div>
`;

let liftGateHTML = `<div class="liftGate">
<div class="animateLeft">
<div class="liftGateLeft "></div>
</div>
<div class="animateRight">
<div class="liftGateRight"></div>
</div>
</div>`;

let l1 = {
  isGateOpen: false,
};
let floorsArr = {}[([l1], [], [], [])];
let currentLift = 0;
let totalFloors;
let totalLifts;

function controller(destFloor) {}

btn.addEventListener("click", () => {
  totalFloors = document.getElementById("floorInput").value;
  totalLifts = document.getElementById("liftInput").value;

  console.log(totalFloors);
  createLifts(totalFloors, totalLifts);

  let liftGates = document.getElementsByClassName("liftGate");
  let allLeftLiftGates = document.getElementsByClassName("liftGateLeft");
  let allRightLiftGates = document.getElementsByClassName("liftGateRight");
  console.log(allLeftLiftGates, allRightLiftGates, liftGates);

  let upbtns = document.getElementsByClassName("upButton");
  upbtns = [...upbtns];

  console.log(upbtns);

  upbtns.forEach((upbtn, idx) =>
    upbtn.addEventListener("click", () => {
      let diff = totalFloors - 1 - idx;
      console.log(idx, "btn clicked", diff);
      animateDoor(diff);

      animateLiftMotion(liftGates[0], diff);
    })
  );
});

function animateLiftMotion(liftElement, diff, dir) {
  diff = -(diff * 106);
  liftElement.style.transform = `translateY(${diff}%)`;

  for (let i = 0; i < diff; i++) {
    liftElement.classList.add("animUp");
  }
}

function animateDoor(diff) {
  let allLeftLiftGates = document.getElementsByClassName("liftGateLeft");
  let allRightLiftGates = document.getElementsByClassName("liftGateRight");
  let l1 = allLeftLiftGates[diff];
  let l2 = allRightLiftGates[diff];

  let width = 37;
  let reduce = true;
  // timer = setInterval(() => {
  //   if (reduce) {
  //     l1.style.width = width-- + "px";
  //     l2.style.width = width-- + "px";

  //     if (width <= 0) reduce = false;
  //   } else {
  //     l1.style.width = width++ + "px";
  //     l2.style.width = width++ + "px";

  //     if (width >= 37) clearInterval(timer);
  //   }
  // }, 1000 / 60);

  l1.classList.toggle("animRight");
  l2.classList.toggle("animLeft");
}
function createLifts(totalFloors, totalLifts) {
  let HTML = "";
  let gateHTML = "";

  liftArea.innerHTML = "";

  floorNum = totalFloors;

  for (i = 0; i < totalLifts; i++) gateHTML += liftGateHTML;

  for (let i = 0; i < totalFloors; i++) {
    liftHTML = `
  <div class="floor">
    <div id="commands">
      <button class="upButton">+</button>
      <button>-</button>
    </div>
   
    ${i + 1 == totalFloors ? gateHTML : ""}

    <h2>Floor: ${floorNum}</h2>
  </div>
`;

    HTML += liftHTML;

    floorNum--;
  }
  console.log(gateHTML);
  let l1 = document.createElement("div");
  l1.innerHTML = HTML;
  liftArea.appendChild(l1);
}
