let liftArea = document.getElementById("liftArea");

let liftDoorsActive =[];
let floorNum = 0;
let submitBtn = document.getElementById("btnSave");
const form = document.querySelector('form')

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
let diffFloor=0;

const ELEVATOR_SPEED = 75; // pixels per second

const delay = (delayInms) => {
  return new Promise((resolve) =>{ setTimeout(resolve, delayInms) 
                                 console.log("delay")   });
}


const getPrevFloor = liftNumber=>{
  for(let i=0;i<floorsArr.length;i++) {
     if(floorsArr[i][liftNumber] === 1)
       return i;  
 }

 }


function controller(destFloorID) {
  let liftGates = document.getElementsByClassName("liftGate");

  if (floorsArr[destFloorID].includes(1)) {
   let liftNumber = floorsArr[destFloorID].indexOf(1)
   let diff = totalFloors - 1 - destFloorID;
   let isLiftActive =  liftGates[liftNumber].getAttribute("data-active") == "true"

   if(!liftDoorsActive[liftNumber] && !isLiftActive)
   animateDoor(liftNumber,destFloorID,liftGates[liftNumber]);
   
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
        time = Math.ceil(Math.abs(dl*106)*1000 / ELEVATOR_SPEED) 
        console.log("diff:",dl,"time:",time)
        isLiftActive =  liftGates[liftNumber].getAttribute("data-active") == "true"

        if(!liftDoorsActive[liftNumber] && !isLiftActive)
        {
          diffFloor=dl;
          floorsArr[destFloorID + dl][liftNumber] =0;
          floorsArr[destFloorID][liftNumber] =1
          animateLiftMotion(liftGates[liftNumber], diff,dl);
         
          break;
        }
      }

       if (floorsArr[destFloorID -dl] && floorsArr[destFloorID -dl].includes(1)) {
        liftNumber = floorsArr[destFloorID -dl].indexOf(1)
        let diff = totalFloors - 1 - destFloorID;
        time = Math.ceil(Math.abs(dl*106) * 1000 / ELEVATOR_SPEED) 
        console.log("diff:",dl,"time:",time)
        isLiftActive =  liftGates[liftNumber].getAttribute("data-active") == "true"

        if(!liftDoorsActive[liftNumber] && !isLiftActive){
          diffFloor=dl;
          floorsArr[destFloorID - dl][liftNumber] =0;
          floorsArr[destFloorID][liftNumber] =1
          animateLiftMotion(liftGates[liftNumber], diff,dl);
          break;
        }
     

      }

     
    }    
    
 

console.log("time :",time)
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
        console.log("<< ", diff)
        animateLiftMotion(liftGates[liftNumber], diff,destFloorID-prevFloor);
        tk = Math.ceil(Math.abs((destFloorID-prevFloor)*106) * 1000 / ELEVATOR_SPEED) + 1500

        setTimeout(()=>animateDoor(liftNumber, parseInt(totalFloors) + 1,liftGates[liftNumber]),tk
        )
      }
      else
      animateDoor(liftNumber, parseInt(totalFloors) + 1,liftGates[liftNumber])
        console.log('micro task')
        })
    
  }

}
let timerId;

function debounce(f,time){
  if (timerId) {
		return
	}
  f()
	// Schedule a setTimeout after delay seconds
	timerId  =  setTimeout(function () {
    
		
		// Once setTimeout function execution is finished, timerId = undefined so that in <br>
		// the next scroll event function execution can be scheduled by the setTimeout
		timerId  =  undefined;
	}, time)
}

let liftStack = [],liftGates;
form.addEventListener('submit', (e) => {
  e.preventDefault();
  floorsArr =[]
  liftDoorsActive=[]
  totalFloors = document.getElementById("floorInput").value;
  totalLifts =  document.getElementById("liftInput").value;

  console.log(totalFloors,totalLifts);
  createLifts(totalFloors, totalLifts);

  liftGates = document.getElementsByClassName("liftGate");
  let allLeftLiftGates = document.getElementsByClassName("liftGateLeft");
  let allRightLiftGates = document.getElementsByClassName("liftGateRight");
  console.log(allLeftLiftGates, allRightLiftGates, liftGates);

  let upbtns = document.getElementsByClassName("upButton");
  upbtns = [...upbtns];

  console.log(upbtns);
  setTimeout(()=>{
    upbtns.forEach((upbtn, idx) =>
    upbtn.addEventListener("click", (e) => {
      let diff = totalFloors - 1 - idx;
      let liftNumber =0, currentFloorID = idx;
      controller(idx)
     
    })
  )
  },5000)

});
function animateLiftMotion(liftElement, diff, prevFloor) {
  liftElement.setAttribute("data-active",true) 

  let resK = screen.width < 640 ? 112 : 106;
  console.log("animate lift")

  let totalDistance =diffFloor * resK + diff
  diff = -(diff * resK + diff);
  if(Math.abs( diff ) === 0 ){
    console.log(prevFloor)
    liftElement.style.transitionDuration = `${Math.abs( prevFloor*resK) / ELEVATOR_SPEED}s`

  }
  else
  liftElement.style.transitionDuration = `${Math.abs(totalDistance) / ELEVATOR_SPEED}s`

  liftElement.style.transitionTimingFunction = "linear";

  console.log(diff)
  liftElement.style.transform = `translateY(${diff}%)`;


}

async function animateDoor(liftNumber,destFloorID,liftElement) {
  let upbtns = document.getElementsByClassName("upButton");
  liftDoorsActive[liftNumber] = true;
  liftElement.setAttribute("data-active",false) 

  console.log("animate door")

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
    console.log("settimeout door")
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


