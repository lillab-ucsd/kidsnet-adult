const DEMO_PARTICIPANT = "demo";

const MINI_PRACTICE_IMAGES = [
  "stimuli/food/sandwich.jpg",
  "stimuli/food/hamburger.jpg",
  "stimuli/food/french_fries_1.jpg",
  "stimuli/food/ice_cream_1.jpg",
  "stimuli/food/cookie.jpg",
];

const MINI_PRACTICE_IMAGES_2 = [
  "stimuli/food/toast.jpg",
  "stimuli/food/bread.jpg",
  "stimuli/food/croissant.jpg",
  "stimuli/food/chocolate_2.jpg",
  "stimuli/food/candy.jpg"
];

const NUM_BLOCKS = 2;
const TRIALS_PER_BLOCK = 6;
const TOTAL_MAIN_TRIALS = NUM_BLOCKS * TRIALS_PER_BLOCK;   // 12 trials total

let MAIN_BLOCKS = [];
let randomizedCategoryOrder = [];
let useReverseSetOrder = false;

const sorting_correct_page = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      height:100vh;
      text-align:center;
    ">

      <div style="
        font-size:36px;
        font-weight:700;
        margin-bottom:40px;
      ">
        Put things that go together closer!
      </div>

      <div style="position:relative; width:80vw; max-width:1000px;">
        <img src="stimuli/examples/correct_example.png"
             style="
               width:100%;
               max-height:65vh;
               object-fit:contain;
               border:8px solid #4CAF50;
             ">
        <div style="
          position:absolute;
          top:-30px;
          right:-30px;
          font-size:90px;
          color:#4CAF50;
          font-weight:bold;
        ">✓</div>
      </div>

      <button id="correct-next-btn" style="
        margin-top:40px;
        font-size:24px;
        padding:14px 40px;
        border-radius:16px;
        background:#4CAF50;
        color:white;
        border:none;
        cursor:pointer;
      ">
        Next
      </button>

    </div>
  `,
  choices: [],
  on_load: function() {
    document.getElementById("correct-next-btn")
      .addEventListener("click", function() {
        jsPsychInstance.finishTrial();
      });
  }
};

const sorting_wrong_page = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      height:100vh;
      text-align:center;
    ">

      <div style="
        font-size:36px;
        font-weight:700;
        margin-bottom:40px;
      ">
        Not like this
      </div>

      <div style="position:relative; width:80vw; max-width:1000px;">
        <img src="stimuli/examples/wrong_example.png"
             style="
               width:100%;
               max-height:65vh;
               object-fit:contain;
               border:8px solid #d32f2f;
             ">
        <div style="
          position:absolute;
          top:-30px;
          right:-30px;
          font-size:90px;
          color:#d32f2f;
          font-weight:bold;
        ">✗</div>
      </div>

      <button id="wrong-start-btn" style="
        margin-top:40px;
        font-size:24px;
        padding:14px 40px;
        border-radius:16px;
        background:#4CAF50;
        color:white;
        border:none;
        cursor:pointer;
      ">
        Next
      </button>

    </div>
  `,
  choices: [],
  on_load: function() {
    document.getElementById("wrong-start-btn")
      .addEventListener("click", function() {
        jsPsychInstance.finishTrial();
      });
  }
};

/* ---------- category structure ---------- */

const CATEGORIES = {
  animals: [
    ["stimuli/animals/peacock_1.jpg",
      "stimuli/animals/dolphin_1.jpg",
      "stimuli/animals/pigeon_1.jpg",
      "stimuli/animals/fox_1.jpg",
      "stimuli/animals/lion_1.jpg",
      "stimuli/animals/sheep_1.jpg",
      "stimuli/animals/horse_1.jpg",
      "stimuli/animals/fish_1.jpg",
      "stimuli/animals/squirrel_1.jpg",
      "stimuli/animals/butterfly_1.jpg",
      "stimuli/animals/ladybug_1.jpg",
      "stimuli/animals/wolf_1.jpg"],
    ["stimuli/animals/peacock_2.jpg",
      "stimuli/animals/dolphin_2.jpg",
      "stimuli/animals/pigeon_2.jpg",
      "stimuli/animals/fox_2.jpg",
      "stimuli/animals/lion_2.jpg",
      "stimuli/animals/sheep_2.jpg",
      "stimuli/animals/horse_2.jpg",
      "stimuli/animals/fish_2.jpg",
      "stimuli/animals/squirrel_2.jpg",
      "stimuli/animals/butterfly_2.jpg",
      "stimuli/animals/ladybug_2.jpg",
      "stimuli/animals/wolf_2.jpg"]
  ],
  emotions: [
    ["stimuli/emotions/happy_1.jpg",
      "stimuli/emotions/sad_1.jpg",
      "stimuli/emotions/angry_1.jpg",
      "stimuli/emotions/fearful_1.jpg",
      "stimuli/emotions/disgust_1.jpg",
      "stimuli/emotions/surprise_1.jpg",
      "stimuli/emotions/happy_2.jpg",
      "stimuli/emotions/sad_2.jpg",
      "stimuli/emotions/angry_2.jpg",
      "stimuli/emotions/fearful_2.jpg",
      "stimuli/emotions/disgust_2.jpg",
      "stimuli/emotions/surprise_2.jpg"],
    ["stimuli/emotions/happy_3.jpg",
      "stimuli/emotions/sad_3.jpg",
      "stimuli/emotions/angry_3.jpg",
      "stimuli/emotions/fearful_3.jpg",
      "stimuli/emotions/disgust_3.jpg",
      "stimuli/emotions/surprise_3.jpg",
      "stimuli/emotions/happy_4.jpg",
      "stimuli/emotions/sad_4.jpg",
      "stimuli/emotions/angry_4.jpg",
      "stimuli/emotions/fearful_4.jpg",
      "stimuli/emotions/disgust_4.jpg",
      "stimuli/emotions/surprise_4.jpg"]
  ],
  plants: [
    ["stimuli/plants/broccoli_1.jpg",
      "stimuli/plants/cabbage_1.jpg",
      "stimuli/plants/cactus_1.jpg",
      "stimuli/plants/cherry_1.jpg",
      "stimuli/plants/flower_1.jpg",
      "stimuli/plants/grass_1.jpg",
      "stimuli/plants/leaf_1.jpg",
      "stimuli/plants/tree_1.jpg",
      "stimuli/plants/acorn_1.jpg",
      "stimuli/plants/apple_1.jpg",
      "stimuli/plants/blueberry_1.jpg",
      "stimuli/plants/peanut_1.jpg"],
    ["stimuli/plants/broccoli_2.jpg",
      "stimuli/plants/cabbage_2.jpg",
      "stimuli/plants/cactus_2.jpg",
      "stimuli/plants/cherry_2.jpg",
      "stimuli/plants/flower_2.jpg",
      "stimuli/plants/grass_2.jpg",
      "stimuli/plants/leaf_2.jpg",
      "stimuli/plants/tree_2.jpg",
      "stimuli/plants/acorn_2.jpg",
      "stimuli/plants/apple_2.jpg",
      "stimuli/plants/blueberry_2.jpg",
      "stimuli/plants/peanut_2.jpg"]
  ],
  vehicle: [
    ["stimuli/vehicles/airplane_1.jpg", "stimuli/vehicles/car_1.jpg",
     "stimuli/vehicles/bike_1.jpg",     "stimuli/vehicles/firetruck_1.jpg",
     "stimuli/vehicles/boat_1.jpg",     "stimuli/vehicles/helicopter_1.jpg",
     "stimuli/vehicles/bus_1.jpg",      "stimuli/vehicles/motorcycle_1.jpg",
     "stimuli/vehicles/stroller_1.jpg", "stimuli/vehicles/train_1.jpg",
     "stimuli/vehicles/sled_1.jpg",     "stimuli/vehicles/truck_1.jpg"],
    ["stimuli/vehicles/airplane_2.jpg", "stimuli/vehicles/car_2.jpg",
     "stimuli/vehicles/bike_2.jpg",     "stimuli/vehicles/firetruck_2.jpg",
     "stimuli/vehicles/boat_2.jpg",     "stimuli/vehicles/helicopter_2.jpg",
     "stimuli/vehicles/bus_2.jpg",      "stimuli/vehicles/motorcycle_2.jpg",
     "stimuli/vehicles/stroller_2.jpg", "stimuli/vehicles/train_2.jpg",
     "stimuli/vehicles/sled_2.jpg",     "stimuli/vehicles/truck_2.jpg"]
  ],
  clothing: [
    ["stimuli/clothing/dress_1.jpg",    "stimuli/clothing/hat_1.jpg",
     "stimuli/clothing/necklace_1.jpg", "stimuli/clothing/pants_1.jpg",
     "stimuli/clothing/scarf_1.jpg",    "stimuli/clothing/shirt_1.jpg",
     "stimuli/clothing/shorts_1.jpg",   "stimuli/clothing/sock_1.jpg",
     "stimuli/clothing/sweater_1.jpg",  "stimuli/clothing/boot_1.jpg",
     "stimuli/clothing/shoe_1.jpg",     "stimuli/clothing/coat_1.jpg"],

    ["stimuli/clothing/dress_2.jpg",    "stimuli/clothing/hat_2.jpg",
     "stimuli/clothing/necklace_2.jpg", "stimuli/clothing/pants_2.jpg",
     "stimuli/clothing/scarf_2.jpg",    "stimuli/clothing/shirt_2.jpg",
     "stimuli/clothing/shorts_2.jpg",   "stimuli/clothing/sock_2.jpg",
     "stimuli/clothing/sweater_2.jpg",  "stimuli/clothing/boot_2.jpg",
     "stimuli/clothing/shoe_2.jpg",     "stimuli/clothing/coat_2.jpg"]
  ],
  household_items: [
    ["stimuli/household_items/bed_1.jpg",      "stimuli/household_items/bowl_1.jpg",
     "stimuli/household_items/camera1_1.jpg",   "stimuli/household_items/chair_1.jpg",
     "stimuli/household_items/clock_1.jpg",    "stimuli/household_items/plate_1.jpg",
     "stimuli/household_items/refrigerator_1.jpg",   "stimuli/household_items/lamp_1.jpg",
     "stimuli/household_items/scissors_1.jpg", "stimuli/household_items/vacuum_1.jpg",
     "stimuli/household_items/tape_1.jpg",     "stimuli/household_items/pillow_1.jpg"],
    ["stimuli/household_items/bed_2.jpg",      "stimuli/household_items/bowl_2.jpg",
     "stimuli/household_items/camera1_2.jpg",   "stimuli/household_items/chair_2.jpg",
     "stimuli/household_items/clock_2.jpg",    "stimuli/household_items/plate_2.jpg",
     "stimuli/household_items/refrigerator_2.jpg",   "stimuli/household_items/lamp_2.jpg",
     "stimuli/household_items/scissors_2.jpg", "stimuli/household_items/vacuum_2.jpg",
     "stimuli/household_items/tape_2.jpg",     "stimuli/household_items/pillow_2.jpg"]
  ]
};

const SET_CONDITIONS = [
  { animal: 0, plant: 0, artifact: 0 },
  { animal: 0, plant: 0, artifact: 1 },
  { animal: 0, plant: 1, artifact: 0 },
  { animal: 0, plant: 1, artifact: 1 },
  { animal: 1, plant: 0, artifact: 0 },
  { animal: 1, plant: 0, artifact: 1 },
  { animal: 1, plant: 1, artifact: 0 },
  { animal: 1, plant: 1, artifact: 1 }
];

/* ---------- fixed stage ---------- */

const BASE_TASK_WIDTH = 1160;
const BASE_TASK_HEIGHT = 760;

const GRID_COLS = 10;
const GRID_ROWS = 6;
const CELL_SIZE = 104;

const GRID_WIDTH = GRID_COLS * CELL_SIZE;
const GRID_HEIGHT = GRID_ROWS * CELL_SIZE;

const BOTTOM_AREA = 0;
const CONTAINER_HEIGHT = GRID_HEIGHT + BOTTOM_AREA;

const SMALL_SIZE = 90;
const FOCAL_SCALE = 2;
const DRAG_SCALE = 1.8;
const CONFLICT_OFFSET = 42;

const GAP = 40;

const focalWidth = SMALL_SIZE * FOCAL_SCALE;
const totalWidth = focalWidth + GAP + GRID_WIDTH;

const LEFT_EDGE = (BASE_TASK_WIDTH - totalWidth) / 2;

const GRID_X = LEFT_EDGE + focalWidth + GAP;
const GRID_Y = (BASE_TASK_HEIGHT - GRID_HEIGHT) / 2 + 20;

const WARNING_Y = 690;
const TOPBAR_Y = 10;


/* ---------- CSS ---------- */

(function injectStyles() {
  const style = document.createElement("style");
  style.textContent = `
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background: #f5f5f5;
      font-family: Arial, sans-serif;
    }

    .stim-img {
      position: absolute;
      object-fit: contain;
      transform: translate(-50%, -50%);
      touch-action: none;
      -webkit-user-drag: none;
      user-select: none;
      transition: width 120ms ease, height 120ms ease;
    }

    .stim-img.dragging {
      z-index: 9999;
    }

    .grid-line-v,
    .grid-line-h {
      position: absolute;
      background: #cfcfcf;
      pointer-events: none;
    }

    /* Persistent task-reminder banner ---------- */
    #task-reminder-banner {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #fff8e1;
      border-bottom: 2px solid #f9c74f;
      padding: 8px 20px;
      text-align: center;
      font-size: 14px;
      color: #5a4300;
      z-index: 10000;
      font-family: Arial, sans-serif;
      pointer-events: none;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    }
    #task-reminder-banner strong { color: #333; }
    /* Push jsPsych content down so it doesn't sit under the banner */
    body.reminder-visible #jspsych-target {
      padding-top: 40px;
      box-sizing: border-box;
    }
  `;
  document.head.appendChild(style);
})();

/* Mount the reminder banner and toggle it depending on trial type */
(function mountTaskReminder() {
  const attach = () => {
    if (document.getElementById("task-reminder-banner")) return;
    const banner = document.createElement("div");
    banner.id = "task-reminder-banner";
    banner.innerHTML =
      `Task reminder: Place pictures that <strong>go together</strong> close, ` +
      `and pictures that <strong>don't go together</strong> far apart.`;
    document.body.appendChild(banner);
    document.body.classList.add("reminder-visible");
  };
  if (document.body) attach();
  else document.addEventListener("DOMContentLoaded", attach);
})();

/* Helper: hide banner during welcome/finish, show during task */
function setReminderVisible(visible) {
  const banner = document.getElementById("task-reminder-banner");
  if (!banner) return;
  banner.style.display = visible ? "block" : "none";
  document.body.classList.toggle("reminder-visible", visible);
}

function getTaskScale() {
  const vw = window.visualViewport ? window.visualViewport.width : window.innerWidth;
  const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  return Math.min(vw / BASE_TASK_WIDTH, vh / BASE_TASK_HEIGHT, 1);
}

function getSingleStartPosition() {
  return {
    x: GRID_X + GRID_WIDTH / 2,
    y: GRID_Y + GRID_HEIGHT / 2
  };
}

function getFileName(path) {
  return path.split("/").pop();
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function getCellCenter(col, row) {
  return {
    x: GRID_X + col * CELL_SIZE + CELL_SIZE / 2,
    y: GRID_Y + row * CELL_SIZE + CELL_SIZE / 2,
    col,
    row
  };
}

function makePreviewPage(images) {
  return {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <div style="
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        height:85vh;
      ">
        <div style="
          display:grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          justify-content: center;
          gap:24px;
          max-width:1000px;
          margin:0 auto 40px auto;
        ">
          ${images.map(img => `
            <img src="${img}" style="
              width:130px;
              height:130px;
              object-fit:contain;
            ">
          `).join("")}
        </div>

        <button id="preview-start-btn" style="
          font-size:26px;
          padding:18px 50px;
          border-radius:16px;
          background:#4CAF50;
          color:white;
          border:none;
          cursor:pointer;
        ">
          Start
        </button>
      </div>
    `,
    choices: [],  // disable default jsPsych button
    on_load: function() {
      document.getElementById("preview-start-btn")
        .addEventListener("click", function() {
          jsPsychInstance.finishTrial();
        });
    }
  };
}

function nearestCellFromStagePoint(x, y) {
  const localX = x - GRID_X;
  const localY = y - GRID_Y;

  if (localX < 0 || localX > GRID_WIDTH || localY < 0 || localY > GRID_HEIGHT) {
    return null;
  }

  const col = Math.max(0, Math.min(GRID_COLS - 1, Math.floor(localX / CELL_SIZE)));
  const row = Math.max(0, Math.min(GRID_ROWS - 1, Math.floor(localY / CELL_SIZE)));

  return getCellCenter(col, row);
}

function sameCell(a, b) {
  return a && b && a.col === b.col && a.row === b.row;
}

function makeCSVContent(rows) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  return [
    headers.join(","),
    ...rows.map(row =>
      headers.map(h => `"${String(row[h] !== undefined ? row[h] : "").replace(/"/g, '""')}"`)
    )
  ].join("\n");
}

function downloadCSV(filename, rows) {
  if (!rows.length) return;
  const csv = makeCSVContent(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ---------- plugin ---------- */

class EmotionGridPlugin {
  constructor(jsPsych) {
    this.jsPsych = jsPsych;
  }

  trial(display_element, trial) {

    let highestZ = 10;
    const jsPsych = this.jsPsych;
    const participant = trial.participant;
    const phase = trial.phase;
    const trialNumber = trial.trial_number;
    const blockNumber = trial.block_number || null;

    const trialImages = trial.images || [];
    if (!trialImages.length) {
      console.error("No images passed to trial.");
      return;
    }

    /* ---------- State ---------- */

    const imageState = trialImages.map((path, i) => ({
      path,
      index: i,
      stageX: 0,
      stageY: 0,
      introduced: false,
      hasBeenMoved: false
    }));

    let dragState = null;

    let currentFocusIdx = 0;
    let allImagesShown = false;
    let warningMessage = "";

    const moveLog = [];


    function clamp(val, min, max) {
      return Math.max(min, Math.min(max, val));
    }

    function getCellCenter(col, row) {
      return {
        x: GRID_X + col * CELL_SIZE + CELL_SIZE / 2,
        y: GRID_Y + row * CELL_SIZE + CELL_SIZE / 2,
        col,
        row
      };
    }

    function getSnappedCellOrNull(stageX, stageY) {

  // If center is outside grid, don't snap
      if (
        stageX < 0 || stageX > GRID_WIDTH ||
        stageY < 0 || stageY > GRID_HEIGHT
      ) {
        return null;
      }

      const col = Math.floor(stageX / CELL_SIZE);
      const row = Math.floor(stageY / CELL_SIZE);

      return {
        x: col * CELL_SIZE + CELL_SIZE / 2,
        y: row * CELL_SIZE + CELL_SIZE / 2,
        col,
        row
      };
    }

    function getCenterPosition() {
      return {
        x: GRID_WIDTH / 2,
        y: GRID_HEIGHT / 2
      };
    }

    function getDisplaySize(item) {
      if (dragState && dragState.index === item.index)
        return SMALL_SIZE * DRAG_SCALE;

      if (!allImagesShown && item.index === currentFocusIdx)
        return SMALL_SIZE * FOCAL_SCALE;

      return SMALL_SIZE;
    }

/* ---------- Build HTML ---------- */

    display_element.innerHTML = `
      <div style="display:flex;justify-content:center;">
        <div id="stage" style="
          width:${BASE_TASK_WIDTH}px;
          height:${BASE_TASK_HEIGHT}px;
          position:relative;
          background:#f5f5f5;
        ">
          <div id="grid" style="
            position:absolute;
            left:${GRID_X - 3}px;
            top:${GRID_Y - 3}px;
            width:${GRID_WIDTH}px;
            height:${GRID_HEIGHT}px;
            border:3px solid #444;
            background:white;
          "></div>

          <div id="warning" style="
            position:absolute;
            top:${GRID_Y + GRID_HEIGHT + 20}px;
            left:50%;
            transform:translateX(-50%);
            text-align:center;
            color:#b00020;
            font-weight:600;
            font-size:20px;
          "></div>

          <button id="continue-btn" style="
            position:absolute;
            top:${GRID_Y - 60}px;
            left:50%;
            transform:translateX(-50%);
            padding:12px 28px;
            font-size:18px;
            display:none;
          ">
            Continue
          </button>
        </div>
      </div>
    `;

    const stage = display_element.querySelector("#stage");
    const grid = display_element.querySelector("#grid");
    const warningEl = display_element.querySelector("#warning");
    const continueBtn = display_element.querySelector("#continue-btn");

    /* ---------- Draw Grid Lines ---------- */

    for (let c = 1; c < GRID_COLS; c++) {
      const line = document.createElement("div");
      line.style.position = "absolute";
      line.style.left = `${c * CELL_SIZE}px`;
      line.style.top = "0";
      line.style.width = "1px";
      line.style.height = `${GRID_HEIGHT}px`;
      line.style.background = "#ccc";
      grid.appendChild(line);
    }

    for (let r = 1; r < GRID_ROWS; r++) {
      const line = document.createElement("div");
      line.style.position = "absolute";
      line.style.top = `${r * CELL_SIZE}px`;
      line.style.left = "0";
      line.style.height = "1px";
      line.style.width = `${GRID_WIDTH}px`;
      line.style.background = "#ccc";
      grid.appendChild(line);
    }

    /* ---------- Rendering ---------- */

    const imgEls = [];

    function render() {
      imgEls.forEach(el => el.remove());
      imgEls.length = 0;

      imageState.forEach((item, index) => {
        if (!item.introduced) return;

        const el = document.createElement("img");
        el.src = item.path;
        el.style.position = "absolute";
        el.style.left = `${item.stageX}px`;
        el.style.top  = `${item.stageY}px`;
        el.style.transform = "translate(-50%, -50%)";
        el.style.width = `${SMALL_SIZE}px`;
        el.style.height = `${SMALL_SIZE}px`;
        el.style.touchAction = "none";
        el.style.cursor = "grab";

        el.style.zIndex = item.zIndex || 1;
        stage.appendChild(el);
        imgEls.push(el);

        let scale = 1;

        if (dragState && dragState.index === index) {
          scale = DRAG_SCALE;
        }
        else if (!item.hasBeenMoved && index === currentFocusIdx) {
          scale = FOCAL_SCALE;
        }

        el.style.transform = `translate(-50%, -50%) scale(${scale})`;

        el.addEventListener("pointerdown", (e) => {

          e.preventDefault();

          const rect = stage.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          dragState = {
            index: index,
            offsetX: x - item.stageX,
            offsetY: y - item.stageY,
            pointerId: e.pointerId
          };

          highestZ++;
          item.zIndex = highestZ;
          el.style.zIndex = highestZ;

          el.setPointerCapture(e.pointerId);

          render();
        });
      });

      warningEl.textContent = warningMessage;
    }

    /* ---------- Dragging ---------- */

    stage.addEventListener("pointermove", (e) => {

      if (!dragState || e.pointerId !== dragState.pointerId) return;

      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const index = dragState.index;

      const newX = x - dragState.offsetX;
      const newY = y - dragState.offsetY;

      imageState[index].stageX = newX;
      imageState[index].stageY = newY;

      const el = imgEls[index];
      if (el) {
        el.style.left = `${newX}px`;
        el.style.top = `${newY}px`;
      }
    });

    stage.addEventListener("pointerup", (e) => {

      if (!dragState || e.pointerId !== dragState.pointerId) return;

      const index = dragState.index;
      dragState = null;

      const item = imageState[index];

      item.hasBeenMoved = true;
      const el = imgEls[index];  
      const half = SMALL_SIZE / 2;

      item.stageX = clamp(
        item.stageX,
        GRID_X + half,
        GRID_X + GRID_WIDTH - half
      );

      item.stageY = clamp(
        item.stageY,
        GRID_Y + half,
        GRID_Y + GRID_HEIGHT - half
      );

      if (el) {
        el.style.left = `${item.stageX}px`;
        el.style.top = `${item.stageY}px`;
      }

      moveLog.push({
        participant,
        phase,
        block: blockNumber,
        trial: trialNumber,
        image: item.path.split("/").pop(),
        posX: item.stageX,
        posY: item.stageY,
        timestamp: performance.now()
      });

// --- ADDED LOGIC: Spawn the next image in the sequence ---
      if (!allImagesShown && index === currentFocusIdx && item.hasBeenMoved) {
        if (currentFocusIdx < imageState.length - 1) {
          // Bring in the next image
          currentFocusIdx++;
          imageState[currentFocusIdx].introduced = true;

          // Renamed to nextPos to avoid conflict
          const nextPos = getLeftStartPosition(); 
          imageState[currentFocusIdx].stageX = nextPos.x;
          imageState[currentFocusIdx].stageY = nextPos.y;

          highestZ++;
          imageState[currentFocusIdx].zIndex = highestZ;
        } else {
          // If there are no more images, show the Continue button
          allImagesShown = true;
          continueBtn.style.display = "inline-block";
        }
      }

      render();
    });

    // --- ADDED LOGIC: Make the Continue button actually finish the trial ---
    continueBtn.addEventListener("click", () => {

      const placements = imageState.map(item => ({
        image_name: item.path.split("/").pop(),
        posX: item.stageX,
        posY: item.stageY
      }));

      jsPsych.finishTrial({
        participant,
        phase,
        block: blockNumber,
        trial: trialNumber,
        placements: JSON.stringify(placements),
        move_log: JSON.stringify(moveLog),
        is_final_summary: 1
      });

    });

    /* ---------- Start ---------- */

    imageState[0].introduced = true;

    const startPos = getLeftStartPosition();
    imageState[0].stageX = startPos.x;
    imageState[0].stageY = startPos.y;

    render();
  }
}

EmotionGridPlugin.info = {
  name: "emotion-grid",
  parameters: {}
};

/* ---------- jsPsych setup ---------- */

const jsPsychInstance = initJsPsych({
  display_element: 'jspsych-target',
  on_finish: function() {}
});

const BALLOON_IMAGES = [
  "stimuli/balloons/balloon_red.png",
  "stimuli/balloons/balloon_blue.png",
  "stimuli/balloons/balloon_green.png",
  "stimuli/balloons/balloon_yellow.png",
  "stimuli/balloons/balloon_purple.png",
  "stimuli/balloons/balloon_pink.png",
  "stimuli/balloons/balloon_violet.png",
  "stimuli/balloons/balloon_orange.png"
];

/* ── AUTO-ASSIGN FROM URL PARAMETERS (Prolific / MTurk) ─────────────────────── */
/* Reads participant ID from URL:
     ?PROLIFIC_PID=xxxxx  (Prolific)
     ?workerId=xxxxx      (MTurk)
     ?pid=xxxxx           (any other platform)
   Version 1–12 is assigned randomly and saved with the data.
   Falls back to a random ID if none provided (for testing).
*/

function getURLParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function getParticipantIdFromURL() {
  return getURLParam("PROLIFIC_PID")
      || getURLParam("workerId")
      || getURLParam("pid")
      || ("test_" + Math.random().toString(36).slice(2, 10));
}

function getVersionAssignment() {
  const urlVer = parseInt(getURLParam("version"), 10);
  if (urlVer >= 1 && urlVer <= 12) return urlVer;
  return Math.floor(Math.random() * 12) + 1;
}

/* This trial runs silently — participants never see or enter anything.
   It just sets globals, builds the main timeline, and advances. */
const participant_info_trial = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<div style="font-size:22px;padding:40px;text-align:center;">
               Setting up your study…
             </div>`,
  choices: [],
  // No trial_duration — we call finishTrial manually after DataPipe fetch
  on_load: async function() {

    // Hide the banner during this setup step
    setReminderVisible(false);

    const pid = getParticipantIdFromURL();
    window.PARTICIPANT_ID = pid;

    /* ---------- SET CONDITION via DataPipe ---------- */
    /* Configure "Number of conditions = 2" in DataPipe for experiment
       "dajiZTo2w9VO". getCondition() returns 0 or 1 in balanced sequence.
         0 → set 1 first in every block
         1 → set 2 first in every block
       URL param ?set_condition=1 or 2 forces a specific value for testing. */

    let condition;
    const urlSetCond = parseInt(
      new URLSearchParams(window.location.search).get("set_condition"), 10);

    if (urlSetCond === 1 || urlSetCond === 2) {
      condition = urlSetCond - 1;
    } else {
      try {
        condition = await jsPsychPipe.getCondition("dajiZTo2w9VO");
      } catch (e) {
        console.error("DataPipe condition fetch failed, falling back to random:", e);
        condition = Math.random() < 0.5 ? 0 : 1;
      }
    }

    const setCondition = condition + 1;   // 1-indexed for readability
    window.SET_CONDITION = setCondition;

    /* ---------- CATEGORY ORDER: fully random per participant ---------- */
    const CATEGORY_NAMES = ["animals", "plants", "emotions",
                            "vehicle", "clothing", "household_items"];

    randomizedCategoryOrder =
      jsPsychInstance.randomization.shuffle([...CATEGORY_NAMES]);

    useReverseSetOrder = (setCondition === 2);
    const firstSetIndex  = useReverseSetOrder ? 1 : 0;
    const secondSetIndex = useReverseSetOrder ? 0 : 1;

    /* Build MAIN_BLOCKS: 2 blocks × 6 categories.
       Block 0 uses the "first" set for every category (based on setCondition).
       Block 1 uses the "second" set for every category. */
    MAIN_BLOCKS = [[], []];
    randomizedCategoryOrder.forEach(category => {
      MAIN_BLOCKS[0].push(
        jsPsychInstance.randomization.shuffle([...CATEGORIES[category][firstSetIndex]])
      );
      MAIN_BLOCKS[1].push(
        jsPsychInstance.randomization.shuffle([...CATEGORIES[category][secondSetIndex]])
      );
    });

    /* ---------- BUILD MAIN TIMELINE ---------- */

    let globalTrialNumber = 1;

    for (let b = 0; b < NUM_BLOCKS; b++) {

      // Simple block intro
      timeline.push({
        type: jsPsychHtmlButtonResponse,
        stimulus: `
          <div style="max-width:700px;margin:auto;padding:40px;text-align:center;">
            <div style="font-size:26px;margin-bottom:20px;">
              Block ${b + 1} of ${NUM_BLOCKS}
            </div>
            <div style="font-size:18px;line-height:1.6;color:#333;">
              You'll complete ${TRIALS_PER_BLOCK} arrangements in this block,
              one for each category. Take your time.
            </div>
          </div>
        `,
        choices: ["Begin"]
      });

      for (let t = 0; t < TRIALS_PER_BLOCK; t++) {

        const shuffledImages =
          jsPsychInstance.randomization.shuffle([...MAIN_BLOCKS[b][t]]);

        timeline.push(makePreviewPage(shuffledImages));

        timeline.push({
          type: EmotionGridPlugin,
          participant: pid,
          phase: "main",
          block_number: b + 1,
          trial_number: globalTrialNumber,
          trial_number_in_block: t + 1,
          total_trials: TOTAL_MAIN_TRIALS,
          total_trials_in_block: TRIALS_PER_BLOCK,
          images: shuffledImages,
          image_order: shuffledImages
        });

        globalTrialNumber++;
      }

      // Simple continue between blocks (no balloons, no celebrations)
      if (b < NUM_BLOCKS - 1) {
        timeline.push({
          type: jsPsychHtmlButtonResponse,
          stimulus: `
            <div style="max-width:700px;margin:auto;padding:60px 40px;text-align:center;">
              <div style="font-size:24px;margin-bottom:20px;">
                Block ${b + 1} complete — halfway done!
              </div>
              <div style="font-size:16px;color:#555;">
                Take a short break if you'd like, then continue when you're ready.<br>
                In the next block, you'll arrange the same categories again with different pictures.
              </div>
            </div>
          `,
          choices: ["Continue"]
        });
      }
    }

    jsPsychInstance.data.addProperties({
      participant_id:   pid,
      prolific_session: new URLSearchParams(window.location.search).get("SESSION_ID"),
      prolific_study:   new URLSearchParams(window.location.search).get("STUDY_ID"),
      set_condition:    setCondition,
      category_order:   randomizedCategoryOrder.join(","),
      study_version:    "adult_v1"
    });

    timeline.push(save_data);
    timeline.push(finish_page);

    // Show the reminder banner from here on
    setReminderVisible(true);
    jsPsychInstance.finishTrial();
  }
};

const STATIC_IMAGES = [
  "stimuli/examples/correct_example.png",
  "stimuli/examples/wrong_example.png",
  "stimuli/star.png",
  "stimuli/fireworks.gif"
];

const preload_trial = {
  type: jsPsychPreload,
  images: [
    ...Object.values(CATEGORIES).flat(2),
    ...BALLOON_IMAGES,
    ...MINI_PRACTICE_IMAGES,
    ...MINI_PRACTICE_IMAGES_2,
    ...STATIC_IMAGES
  ],
  show_detailed_errors: true,   // surface any load failures
  continue_after_error: false,  // halt so you can see what failed
  max_load_time: 60000          // 60s budget (default is unlimited)
};

const practice_intro = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="
      display:flex;
      justify-content:center;
      align-items:center;
      height:60vh;
    ">
      <button id="practice-start-btn" style="
        font-size:28px;
        padding:20px 50px;
        border-radius:18px;
        cursor:pointer;
        background:#4CAF50;
        color:white;
        border:none;
      ">
        Start Practice
      </button>
    </div>
  `,
  choices: [],  // disable default jsPsych button
  on_load: function() {
    document.getElementById("practice-start-btn")
      .addEventListener("click", function() {
        jsPsychInstance.finishTrial();
      });
  }
};

const mini_practice_trial = {
  type: EmotionGridPlugin,
  participant: DEMO_PARTICIPANT,
  phase: "practice",
  trial_number: -1,  // distinguish from real practice
  total_trials: 1,
  images: MINI_PRACTICE_IMAGES
};

const mini_practice_trial_2 = {
  type: EmotionGridPlugin,
  participant: DEMO_PARTICIPANT,
  phase: "practice",
  trial_number: -2,  // just to distinguish it
  total_trials: 1,
  images: MINI_PRACTICE_IMAGES_2
};


const main_intro = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="max-width:720px;margin:auto;padding:40px 20px;text-align:left;line-height:1.65;">
      <h1 style="text-align:center;font-size:26px;margin-bottom:24px;">
        Practice Complete
      </h1>
      <p style="font-size:18px;">
        You're ready to begin the main task. There will be
        <strong>${NUM_BLOCKS} blocks</strong>, each with
        <strong>${TRIALS_PER_BLOCK} arrangements</strong>
        (${TOTAL_MAIN_TRIALS} in total). Each block covers all six categories
        once, using different pictures.
      </p>
      <p style="font-size:18px;">
        Remember: place pictures that <strong>go together close</strong>,
        and pictures that <strong>don't go together far apart</strong>.
        Take as long as you need.
      </p>
    </div>
  `,
  choices: ["Start Main Task"]
};

const welcome_page = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="max-width:720px;margin:auto;padding:40px 20px;text-align:left;line-height:1.65;">
      <h1 style="text-align:center;font-size:28px;margin-bottom:24px;">
        Welcome
      </h1>
      <p style="font-size:18px;">
        Thank you for taking part in this study. It should take approximately
        <strong>15–20 minutes</strong> to complete.
      </p>
      <p style="font-size:18px;">
        In this task, you will arrange sets of pictures on a grid based on
        how you think they relate to one another. There are
        <strong>no right or wrong answers</strong> — we're interested in your
        own intuitions.
      </p>
      <p style="font-size:18px;">
        Please complete the study in one sitting, on a device with a mouse
        or touchscreen.
      </p>
    </div>
  `,
  choices: ["Continue"]
};

const instructions_page = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="max-width:720px;margin:auto;padding:40px 20px;text-align:left;line-height:1.65;">
      <h1 style="text-align:center;font-size:26px;margin-bottom:24px;">
        Instructions
      </h1>
      <p style="font-size:18px;">
        On each round, you will see a set of pictures. Your task is to
        <strong>drag each picture onto the grid</strong> so that:
      </p>
      <ul style="font-size:18px;">
        <li style="margin-bottom:10px;">
          Pictures that <strong>go together</strong> are placed
          <strong>close to each other</strong>.
        </li>
        <li>
          Pictures that <strong>don't go together</strong> are placed
          <strong>far apart</strong>.
        </li>
      </ul>
      <p style="font-size:18px;">
        You'll do a short practice round first so you can get a feel for
        the task, then complete <strong>2 blocks of ${TRIALS_PER_BLOCK}
        arrangements</strong> (${TOTAL_MAIN_TRIALS} in total).
        Each block covers all ${TRIALS_PER_BLOCK} categories once, using
        different pictures in each block.
      </p>
      <p style="font-size:18px;color:#555;">
        Take your time. Once you place a picture, you can still drag it
        again to adjust.
      </p>
    </div>
  `,
  choices: ["Start Practice"]
};

const attention_star_page = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      padding:80px 20px 40px 20px;
      text-align:center;
    ">
      <img src="stimuli/star.png" style="
        width:160px;
        height:160px;
        animation: spinScale 1.5s ease-in-out infinite;
        margin-bottom:30px;
      ">
      <div style="font-size:28px; font-weight:600;">
        Great job!
      </div>
    </div>

    <style>
      @keyframes spinScale {
        0%   { transform: scale(1) rotate(0deg); }
        50%  { transform: scale(1.4) rotate(180deg); }
        100% { transform: scale(1) rotate(360deg); }
      }
    </style>
  `,
  choices: ["Next"]
};

function makeCelebrationPage(message = "Great job!") {
  return {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <div style="
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        padding:80px 20px 40px 20px;
        text-align:center;
      ">
        <img src="stimuli/fireworks.gif" style="
          width:300px;
          height:200px;
          animation: spinScale 1.5s ease-in-out infinite;
          margin-bottom:30px;
        ">
        <div style="font-size:28px; font-weight:600;">
          ${message}
        </div>
      </div>


    `,
    choices: ["Next"]
  };
}

function getLeftStartPosition() {

  const focalWidth = SMALL_SIZE * FOCAL_SCALE;

  return {
    x: LEFT_EDGE + focalWidth / 2,
    y: GRID_Y + GRID_HEIGHT / 2
  };
}

function balloonMiniGame(totalBalloons = 10) {
  return {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <div id="balloon-stage" style="
        position:relative;
        width:100vw;
        height:100vh;
        overflow:hidden;
        background: linear-gradient(#87CEEB, #E0F7FF);
      "></div>

      <style>
        .balloon {
          position:absolute;
          width:150px;
          height:150px;
          cursor:pointer;
          user-select:none;
          touch-action: manipulation;
          transition: transform 0.15s ease;
        }

        .balloon:active {
          transform: scale(1.1);
        }

        .pop {
          animation: popAnim 0.35s forwards;
        }

        @keyframes popAnim {
          0%   { transform: scale(1); opacity:1; }
          100% { transform: scale(1.8); opacity:0; }
        }
      </style>
    `,
    choices: [],
    on_load: function() {

      const stage = document.getElementById("balloon-stage");

      const balloonImages = [
        "stimuli/balloons/balloon_red.png",
        "stimuli/balloons/balloon_blue.png",
        "stimuli/balloons/balloon_green.png",
        "stimuli/balloons/balloon_yellow.png",
        "stimuli/balloons/balloon_purple.png",
        "stimuli/balloons/balloon_pink.png",
        "stimuli/balloons/balloon_violet.png",
        "stimuli/balloons/balloon_orange.png"
      ];

      let poppedCount = 0;

      function showBalloon() {

        // END condition
        if (poppedCount >= totalBalloons) {

          const doneButton = document.createElement("button");
          doneButton.textContent = "Continue";

          doneButton.style.position = "absolute";
          doneButton.style.left = "50%";
          doneButton.style.top = "50%";
          doneButton.style.transform = "translate(-50%, -50%)";
          doneButton.style.fontSize = "28px";
          doneButton.style.padding = "20px 50px";
          doneButton.style.borderRadius = "16px";
          doneButton.style.background = "#4CAF50";
          doneButton.style.color = "white";
          doneButton.style.border = "none";
          doneButton.style.cursor = "pointer";

          doneButton.addEventListener("click", () => {
            jsPsychInstance.finishTrial();
          });

          stage.appendChild(doneButton);
          return;
        }

        // CREATE BALLOON
        const balloon = document.createElement("img");
        balloon.className = "balloon";

        balloon.src =
          balloonImages[Math.floor(Math.random() * balloonImages.length)];

        const maxX = window.innerWidth - 140;
        const maxY = window.innerHeight - 200;

        balloon.style.left = Math.random() * maxX + "px";
        balloon.style.top = Math.random() * maxY + "px";

        balloon.addEventListener("pointerdown", function() {

          balloon.classList.add("pop");

          setTimeout(() => {
            balloon.remove();
            poppedCount++;
            showBalloon();   //call next balloon
          }, 300);
        });

        stage.appendChild(balloon);
      }

      //start first balloon
      showBalloon();
    }
  };
}


const timeline = [
  participant_info_trial,     // silent auto-assign from URL params
  preload_trial,
  welcome_page,
  instructions_page,
  makePreviewPage(MINI_PRACTICE_IMAGES),
  mini_practice_trial,
  sorting_wrong_page,
  sorting_correct_page,
  main_intro
];

const save_data = {
  type: jsPsychPipe,
  action: "save",
  experiment_id: "dajiZTo2w9VO",
  filename: () => `${window.PARTICIPANT_ID}.csv`,
  data_string: () => jsPsychInstance.data.get().csv()
};

const finish_page = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="max-width:720px;margin:auto;padding:60px 20px;text-align:center;line-height:1.65;">
      <h1 style="font-size:28px;margin-bottom:24px;">Thank you!</h1>
      <p style="font-size:18px;">
        You have completed the study. Your responses have been saved.
      </p>
      <p style="font-size:18px;">
        Please click the button below to return to Prolific and confirm your
        submission.
      </p>
    </div>
  `,
  choices: ["Return to Prolific"],
  on_start: function() { setReminderVisible(false); },
  on_finish: function() {
    // Replace with your actual Prolific completion URL:
    window.location.href = "https://app.prolific.com/submissions/complete?cc=XXXXXX";
  }
};

jsPsychInstance.run(timeline);