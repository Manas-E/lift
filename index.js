let liftArea = document.getElementById("liftArea");

let liftDoorsActive =[];
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
let floorsArr = [];
let currentLift = 0;
let totalFloors;
let totalLifts;
const ELEVATOR_SPEED = 500; // pixels per second

const delay = (delayInms) => {
  return new Promise((resolve) =>{ setTimeout(resolve, delayInms) 
                                 console.log("delay")   });
}

function controller(destFloorID) {
  let liftGates = document.getElementsByClassName("liftGate");

  if (floorsArr[destFloorID].includes(1)) {
   let liftNumber = floorsArr[destFloorID].indexOf(1)
   let diff = totalFloors - 1 - destFloorID;
   if(!liftDoorsActive[liftNumber])
   animateDoor(liftNumber,destFloorID);
  }
  else{
    let dl =0,liftNumber, time;

    while(liftDoorsActive[liftNumber] || (floorsArr[destFloorID + dl] && !floorsArr[destFloorID + dl].includes(1)) || (floorsArr[destFloorID - dl] && !floorsArr[destFloorID - dl].includes(1))   ){
      dl++;
      if(floorsArr[destFloorID + dl] === undefined && floorsArr[destFloorID - dl] === undefined)
      break

      if (floorsArr[destFloorID + dl] && floorsArr[destFloorID + dl].includes(1)) {
        liftNumber = floorsArr[destFloorID + dl].indexOf(1)
        let diff = totalFloors - 1 - destFloorID;
        time = Math.abs(diff) * 10000/ ELEVATOR_SPEED
        if(!liftDoorsActive[liftNumber])
        {
          
          floorsArr[destFloorID + dl][liftNumber] =0;
          floorsArr[destFloorID][liftNumber] =1
          animateLiftMotion(liftGates[liftNumber], diff,liftNumber);
         
          break;
        }
      }

       if (floorsArr[destFloorID -dl] && floorsArr[destFloorID -dl].includes(1)) {
        liftNumber = floorsArr[destFloorID -dl].indexOf(1)
        let diff = totalFloors - 1 - destFloorID;
        time =Math.abs(diff) * 10000 / ELEVATOR_SPEED
  
        if(!liftDoorsActive[liftNumber]){
          floorsArr[destFloorID - dl][liftNumber] =0;
          floorsArr[destFloorID][liftNumber] =1
          animateLiftMotion(liftGates[liftNumber], diff,liftNumber);
          break;
        }
     

      }

     
    }    
    
    const getPrevFloor = liftNumber=>{
     for(let i=0;i<floorsArr.length;i++) {
        if(floorsArr[i][liftNumber] === 1)
          return i;  
    }
   
    }

    

    let arrived = new Promise((resolve, reject) => setTimeout(() => {
      resolve("Success!"); // Yay! Everything went well!
    }, time + 1000))
    arrived.then(()=>{
      let prevFloor =getPrevFloor(liftNumber);
      let diff = totalFloors - 1 - destFloorID;

      if(!floorsArr[destFloorID].includes(1))
      {
        floorsArr[destFloorID][liftNumber] =1;
        floorsArr[prevFloor][liftNumber] =0;
        animateLiftMotion(liftGates[liftNumber], diff,liftNumber);
      }
     
        
      animateDoor(liftNumber, parseInt(totalFloors) + 1)
     

        console.log('micro task')
        })
    
  }

}
let liftStack = [],liftGates;
btn.addEventListener("click", () => {

  floorsArr =[]
  liftDoorsActive=[]
  totalFloors = 5
  //  document.getElementById("floorInput").value;
  totalLifts = 3
  //  document.getElementById("liftInput").value;

  console.log(totalFloors,totalLifts);
  createLifts(totalFloors, totalLifts);

  liftGates = document.getElementsByClassName("liftGate");
  let allLeftLiftGates = document.getElementsByClassName("liftGateLeft");
  let allRightLiftGates = document.getElementsByClassName("liftGateRight");
  console.log(allLeftLiftGates, allRightLiftGates, liftGates);

  let upbtns = document.getElementsByClassName("upButton");
  upbtns = [...upbtns];

  console.log(upbtns);

  upbtns.forEach((upbtn, idx) =>
    upbtn.addEventListener("click", (e) => {
      let diff = totalFloors - 1 - idx;
      let liftNumber =0, currentFloorID = idx;
      console.log(idx, "btn clicked", diff);
      controller(idx)
    })
  );
});

function animateLiftMotion(liftElement, diff, liftNumber) {
  diff = -(diff * 106 + diff);
  if(Math.abs( diff ) === 0 )
  liftElement.style.transitionDuration = `${Math.abs(107) / ELEVATOR_SPEED}s`
  else
  liftElement.style.transitionDuration = `${Math.abs(diff) / ELEVATOR_SPEED}s`

  liftElement.style.transitionTimingFunction = "linear";

  liftElement.style.transform = `translateY(${diff}%)`;

  setTimeout(()=>{ 
  },5000);
  for (let i = 0; i < diff; i++) {
  }
}

async function animateDoor(liftNumber,destFloorID) {
  let upbtns = document.getElementsByClassName("upButton");
  liftDoorsActive[liftNumber] = true;

  let allLeftLiftGates = document.getElementsByClassName("liftGateLeft");
  let allRightLiftGates = document.getElementsByClassName("liftGateRight");
  let l1 = allLeftLiftGates[liftNumber];
  let l2 = allRightLiftGates[liftNumber];

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
  setTimeout(()=>{ 
    let diff = totalFloors - 1 - destFloorID;
    liftDoorsActive[liftNumber] = false;  
 
  },5000);
}   


function createLifts(totalFloors, totalLifts) {
  let HTML = "";
  let gateHTML = "";
  let arr= [];
  liftArea.innerHTML = "";

  floorNum = totalFloors;

  for (i = 0; i < totalLifts; i++){
     gateHTML += liftGateHTML;
     arr.push(0)
     liftDoorsActive.push(false);
  }
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
i + 1 == totalFloors ? floorsArr.push([...arr.fill(1)]) : floorsArr.push([...arr.fill(0)])
    HTML += liftHTML;

    floorNum--;
  }
  console.log(floorsArr);
  let l1 = document.createElement("div");
  l1.innerHTML = HTML;
  liftArea.appendChild(l1);
}


