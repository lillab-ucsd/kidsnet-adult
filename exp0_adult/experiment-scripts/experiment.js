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

const NUM_BLOCKS = 6;
const TRIALS_PER_BLOCK = 2;
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
      min-height:100vh;
      padding:30px 20px;
      box-sizing:border-box;
      text-align:center;
    ">

      <div style="
        font-size:36px;
        font-weight:700;
        margin-bottom:20px;
      ">
        Group pictures like this
      </div>

      <div style="
        max-width:900px;
        font-size:23px;
        line-height:1.55;
        margin:0 auto 30px auto;
        color:#333;
      ">
        Instead, group pictures so that <strong>pictures that go together are close
        together</strong> and <strong>pictures that are different are further apart</strong>.
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

      <button id="correct-next-btn" class="study-btn" style="margin-top:40px;">
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

/* ─────────────────────────────────────────────────────────────────────────
   WRONG EXAMPLE — split across three pages so no single screen is dense.
   Same image each time; only the explanation changes.
   ───────────────────────────────────────────────────────────────────────── */

function makeWrongExampleStep(bodyHTML, buttonLabel = "Next") {
  return {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <div style="
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        min-height:100vh;
        text-align:center;
      ">
        <div style="font-size:36px;font-weight:700;margin-bottom:18px;">
          Not like this
        </div>

        <div style="max-width:1000px;font-size:24px;line-height:1.55;
                    margin:0 auto 24px auto;color:#333;">
          ${bodyHTML}
        </div>

        <div style="position:relative;width:80vw;max-width:1000px;">
          <img src="stimuli/examples/wrong_example.png"
               style="width:100%;max-height:65vh;object-fit:contain;
                      border:8px solid #d32f2f;">
          <div style="position:absolute;top:-30px;right:-30px;font-size:90px;
                      color:#d32f2f;font-weight:bold;">✗</div>
        </div>

        <button class="wrong-step-btn study-btn">${buttonLabel}</button>
      </div>
    `,
    choices: [],
    on_load: function() {
      document.querySelector(".wrong-step-btn")
        .addEventListener("click", function() {
          jsPsychInstance.finishTrial();
        });
    }
  };
}

const wrong_step_1 = makeWrongExampleStep(
  `Look closely at what that does. The <strong>ice cream</strong> now sits right next to
   the <strong>hamburger</strong>, and the <strong>cookie</strong> sits right next to
   the <strong>fries</strong> — pairs that don't go together.`
);

const wrong_step_2 = makeWrongExampleStep(
  `However, the <strong>sandwich</strong> and <strong>fries</strong> are far apart from each other, even though they go together.`,
  "Next"
);


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
  `;
  document.head.appendChild(style);
})();

/* setReminderVisible retained as a no-op so existing calls in the code
   don't error. The reminder is now baked into the grid trial itself. */
function setReminderVisible(_visible) { /* no-op */ }

function getTaskScale() {
  const vw = window.visualViewport ? window.visualViewport.width : window.innerWidth;
  const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  return Math.min(vw / BASE_TASK_WIDTH, vh / BASE_TASK_HEIGHT, 1);
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
        min-height:85vh;
        padding:30px 20px;
        box-sizing:border-box;
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

      <button id="preview-start-btn" class="study-btn">
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

          <button id="continue-btn" class="study-btn" style="
            position:absolute;
            top:${GRID_Y - 60}px;
            left:50%;
            transform:translateX(-50%);
            display:none;
          ">
            Continue
          </button>
        </div>
      </div>

      <div id="grid-reminder" style="
        min-height:120px;
        box-sizing:border-box;
        display:flex;
        align-items:center;
        justify-content:center;
        max-width:1280px;
        margin:20px auto 30px auto;
        padding:20px 30px;
        text-align:center;
        background:#fff8e1;
        border:2px solid #f9c74f;
        border-radius:12px;
        font-family:Arial, sans-serif;
        font-size:24px;
        line-height:1.5;
        color:#5a4300;
      ">
      <div id="grid-reminder-content" style="width:100%;">
        ${trial.guidance_text || `
          <strong>Reminder:</strong> Place pictures that <strong style="color:#333;">go together</strong> close to each other,
          and pictures that <strong style="color:#333;">are different</strong> further apart.
          <br>
          <span style="font-size:20px;">
            When you're satisfied with your arrangement, click
            <strong style="color:#333;">Continue</strong>.
          </span>
        `}
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
          const scale = rect.width / BASE_TASK_WIDTH;
          const x = (e.clientX - rect.left) / scale;
          const y = (e.clientY - rect.top) / scale;

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
      updateGuidance();
    }

    /* Advance the guidance text as each picture is introduced.
       trial.guidance_steps maps an image filename → the message shown while
       that picture is the one being placed. trial.guidance_final is shown
       once every picture has been placed. Trials without guidance_steps
       keep whatever static content the reminder box was built with. */
    function updateGuidance() {
      if (!trial.guidance_steps) return;

      const box = display_element.querySelector("#grid-reminder-content");
      if (!box) return;

      if (allImagesShown) {
        box.innerHTML = trial.guidance_final ||
          `<span style="font-size:20px;">When you're satisfied with your arrangement,
           click <strong style="color:#333;">Continue</strong>.</span>`;
        return;
      }

      const current = imageState[currentFocusIdx];
      if (!current) return;

      const fileName = current.path.split("/").pop();
      const msg = trial.guidance_steps[fileName];
      if (msg) box.innerHTML = msg;
    }

    /* ---------- Dragging ---------- */

    stage.addEventListener("pointermove", (e) => {

      if (!dragState || e.pointerId !== dragState.pointerId) return;

      const rect = stage.getBoundingClientRect();
      const scale = rect.width / BASE_TASK_WIDTH;
      const x = (e.clientX - rect.left) / scale;
      const y = (e.clientY - rect.top) / scale;

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

/* Scale the current trial's content down so it always fits the viewport.
   Prevents scrolling and off-screen buttons on small screens. */
function fitContentToViewport() {
  const el = document.querySelector('.jspsych-content');
  if (!el) return;

  el.style.transform = 'none';
  el.style.transformOrigin = 'center center';

  const w = el.scrollWidth;
  const h = el.scrollHeight;
  if (!w || !h) return;

  const scale = Math.min(1, (window.innerWidth - 24) / w, (window.innerHeight - 24) / h);
  if (scale < 1) el.style.transform = `scale(${scale})`;
}

window.addEventListener('resize', fitContentToViewport);

/* ---------- jsPsych setup ---------- */

const jsPsychInstance = initJsPsych({
  display_element: 'jspsych-target',
  on_trial_load: function() {
    requestAnimationFrame(fitContentToViewport);
  },
  on_finish: function() {}
});

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

    /* Build MAIN_BLOCKS as one entry per category (block), each with 
       the two shuffled image sets (trials 1 and 2 of that block).
       Which set comes first within a block is determined by set_condition. */
    MAIN_BLOCKS = [];
    randomizedCategoryOrder.forEach(category => {
      MAIN_BLOCKS.push([
        jsPsychInstance.randomization.shuffle([...CATEGORIES[category][firstSetIndex]]),
        jsPsychInstance.randomization.shuffle([...CATEGORIES[category][secondSetIndex]])
      ]);
    });

    /* ---------- BUILD MAIN TIMELINE ---------- */

    let globalTrialNumber = 1;

    for (let b = 0; b < NUM_BLOCKS; b++) {

      const blockCategory = randomizedCategoryOrder[b];
      const categoryHint = (blockCategory === "emotions")
        ? `<div style="font-size:20px;line-height:1.6;color:#5a4300;
                       background:#fff8e1;border:2px solid #f9c74f;
                       border-radius:10px;padding:14px 20px;margin-top:20px;">
             For this block, think about how these pictures go together
             <strong>based on how they feel inside</strong>.
           </div>`
        : "";

      timeline.push({
        type: jsPsychHtmlButtonResponse,
        stimulus: `
          <div style="max-width:900px;margin:auto;padding:40px;text-align:center;">
            <div style="font-size:30px;margin-bottom:24px;">
              Block ${b + 1} of ${NUM_BLOCKS}
            </div>
            <div style="font-size:22px;line-height:1.6;color:#333;">
              You'll complete ${TRIALS_PER_BLOCK} arrangements in this block.
              Please treat each arrangement independently.
            </div>
            ${categoryHint}
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

      // Simple continue between blocks
      if (b < NUM_BLOCKS - 1) {
        timeline.push({
          type: jsPsychHtmlButtonResponse,
          stimulus: `
            <div style="max-width:900px;margin:auto;padding:60px 40px;text-align:center;">
              <div style="font-size:26px;margin-bottom:24px;">
                Block ${b + 1} of ${NUM_BLOCKS} complete.
              </div>
              <div style="font-size:20px;line-height:1.6;color:#555;">
                Take a short break if you'd like, then continue when you're ready.<br>
              </div>
            </div>
          `,
          choices: ["Continue"]
        });
      }
    }

    jsPsychInstance.data.addProperties({
      participant_id:    pid,
      session_uuid:      "s_" + Math.random().toString(36).slice(2, 10)
                              + "_" + Date.now().toString(36),
      start_timestamp:   new Date().toISOString(),
      prolific_session:  new URLSearchParams(window.location.search).get("SESSION_ID"),
      prolific_study:    new URLSearchParams(window.location.search).get("STUDY_ID"),
      set_condition:     setCondition,
      category_order:    randomizedCategoryOrder.join(","),
      study_version:     "adult_v1"
    });

    timeline.push(demographics_page);   // collected before saving
    timeline.push(save_data);
    timeline.push(debrief_page);        // shown after data is safely saved
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
    ...MINI_PRACTICE_IMAGES,
    ...MINI_PRACTICE_IMAGES_2,
    ...STATIC_IMAGES
  ],
  show_detailed_errors: true,   // surface any load failures
  continue_after_error: false,  // halt so you can see what failed
  max_load_time: 60000          // 60s budget (default is unlimited)
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
    <div style="max-width:960px;margin:auto;padding:40px 30px;text-align:left;line-height:1.7;">
      <h1 style="text-align:center;font-size:30px;margin-bottom:28px;">Practice Complete</h1>
      <p style="font-size:22px;">You're ready to begin the main task. There will be <strong>${NUM_BLOCKS} blocks</strong>, each with <strong>${TRIALS_PER_BLOCK} arrangements</strong> (${TOTAL_MAIN_TRIALS} in total). Each block focuses on one category.</p>
      <p style="font-size:22px;">Remember: place pictures that <strong>go together close</strong>, and pictures that <strong>are different further apart</strong>. Please treat each arrangement independently.</p>
      <p style="font-size:22px;">
        When you are <strong>satisfied with your arrangement</strong>, click
        <strong>Continue</strong> to move to the next round.
      </p>
    </div>
  `,
  choices: ["Start Main Task"]
};

/* ─────────────────────────────────────────────────────────────────────────
   CONSENT
   The IRB-approved consent PDF is embedded inline. A download/open link is
   provided as a fallback, since some mobile browsers will not render a PDF
   inside an iframe. Continue stays disabled until the box is checked.
   ───────────────────────────────────────────────────────────────────────── */

const CONSENT_PDF_PATH = "stimuli/Adult_Crowdsource_Consent_Form.pdf";

const consent_page = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="max-width:960px;margin:auto;padding:30px;text-align:left;line-height:1.7;">
      <h1 style="text-align:center;font-size:30px;margin-bottom:8px;">Consent to Participate in Research</h1>
      <p style="text-align:center;font-size:19px;margin-top:0;">
        Please read the consent form below.
        <a href="${CONSENT_PDF_PATH}" target="_blank" rel="noopener">
          Open it in a new tab
        </a> if it does not display or is hard to read.
      </p>

      <iframe src="${CONSENT_PDF_PATH}"
              style="width:100%;height:52vh;border:2px solid #ccc;border-radius:8px;
                     background:#fff;margin:18px 0;">
        <p style="font-size:20px;padding:20px;">
          Your browser cannot display the consent form here.
          <a href="${CONSENT_PDF_PATH}" target="_blank" rel="noopener">
            Click here to open the consent form.
          </a>
        </p>
      </iframe>

      <label style="display:flex;align-items:flex-start;gap:14px;font-size:21px;
                    background:#f0f7ff;border-left:5px solid #4CAF50;border-radius:6px;
                    padding:18px 22px;cursor:pointer;">
        <input type="checkbox" id="consent-checkbox"
               style="width:26px;height:26px;flex-shrink:0;margin-top:2px;cursor:pointer;">
        <span>I hereby give my consent to participate in this research study. I understand and agree to the terms as mentioned in the consent form..</span>
      </label>

      <div style="text-align:center;margin-top:26px;">
        <button id="consent-continue-btn" class="study-btn" disabled>
          Continue
        </button>
        <p id="consent-hint" style="font-size:17px;color:#888;margin-top:12px;">
          Please check the box above to continue.
        </p>
      </div>

      <p style="font-size:17px;color:#777;margin-top:22px;text-align:center;">
        If you do not wish to participate, please close this window and return your
        submission on Prolific.
      </p>
    </div>
  `,
  choices: [],   // no plugin-rendered button; we use our own above
  on_load: function() {
    const box  = document.getElementById("consent-checkbox");
    const btn  = document.getElementById("consent-continue-btn");
    const hint = document.getElementById("consent-hint");

    box.addEventListener("change", function() {
      const ok = box.checked;
      btn.disabled = !ok;
      hint.style.visibility = ok ? "hidden" : "visible";
    });

    btn.addEventListener("click", function() {
      if (!box.checked) return;
      jsPsychInstance.finishTrial({ consent_given: true });
    });
  }
};

const welcome_page = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="max-width:1080px;margin:auto;padding:40px 30px;text-align:left;line-height:1.7;">
      <h1 style="text-align:center;font-size:30px;margin-bottom:28px;">Welcome</h1>
      <p style="font-size:22px;">Thank you for taking part in this study. It should take approximately <strong>15–20 minutes</strong> to complete.</p>
      <p style="font-size:22px;">In this task, you will arrange sets of pictures on a grid based on how you think they relate to one another. There are <strong>no right or wrong answers</strong> — we're interested in your own intuitions.</p>
      <p style="font-size:22px;">Please complete the study in one sitting, on a device with a mouse or touchscreen.</p>
    </div>
  `,
  choices: ["Continue"]
};

const instructions_page_1 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="max-width:1100px;margin:auto;padding:40px 30px;text-align:left;line-height:1.7;">
      <h1 style="text-align:center;font-size:30px;margin-bottom:28px;">Instructions</h1>
      <p style="font-size:22px;">On each round, you will first see a set of pictures. After pressing <strong>Start</strong>, you can begin arranging the pictures. </p>
      <p style="font-size:22px;">Your task is to <strong>drag each picture onto the grid</strong>.</p>
      <p style="font-size:22px;">You will do this by pressing and holding on a picture, moving it to where you want, and releasing.</p>
      <p style="font-size:22px;">You can move pictures around the grid as much as you like before submitting your arrangement.</p>
    </div>
  `,
  choices: ["Continue"]
};

const instructions_page_2 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="max-width:960px;margin:auto;padding:40px 30px;text-align:left;line-height:1.7;">
      <h1 style="text-align:center;font-size:30px;margin-bottom:28px;">How to Arrange the Pictures</h1>
      <p style="font-size:22px;">As you place each picture, think about how it relates to the others already on the grid:</p>
      <ul style="font-size:22px;">
        <li style="margin-bottom:14px;">Pictures that <strong>go together</strong> should be placed <strong>close to each other</strong>.</li>
        <li>Pictures that <strong>are different</strong> should be placed <strong>further apart</strong>.</li>
      </ul>
      <p style="font-size:22px;">Let's walk through one together, and then you'll try it yourself.</p>
    </div>
  `,
  choices: ["Continue"]
};

/* ─────────────────────────────────────────────────────────────────────────
   GUIDED PRACTICE
   Two short text pages set up the reasoning, then the participant completes
   the first practice trial themselves with guidance shown under the grid.
   ───────────────────────────────────────────────────────────────────────── */

const guided_intro_1 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="max-width:1080px;margin:auto;padding:50px 30px;text-align:left;line-height:1.75;">
      <h1 style="text-align:center;font-size:30px;margin-bottom:30px;">Let's try one together</h1>
      <p style="font-size:23px;">You'll see five pictures of food, one at a time.
      Drag each one onto the grid as it appears.</p>
      <p style="font-size:23px;">Think about it like this: a <strong>hamburger</strong> goes with a
      <strong>sandwich</strong>, so you'd place those two <strong>close together</strong>.
      <strong>French fries</strong> go with them too.</p>
    </div>
  `,
  choices: ["Next"]
};

const guided_intro_2 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="max-width:900px;margin:auto;padding:50px 30px;text-align:left;line-height:1.75;">
      <h1 style="text-align:center;font-size:30px;margin-bottom:30px;">And the other two</h1>
      <p style="font-size:23px;"><strong>Ice cream</strong> is quite different from those three,
      so it belongs <strong>far away</strong> from them.</p>
      <p style="font-size:23px;">But a <strong>cookie</strong> goes with ice cream — so those two
      belong <strong>close to each other</strong>, and far from the first group.</p>
      <p style="font-size:23px;color:#555;">Go ahead and arrange them yourself on the next screen.</p>
    </div>
  `,
  choices: ["Start"]
};

/* Guidance shown under the grid during the first practice trial only */
/* Guidance shown under the grid during the first practice trial, keyed by
   image filename so the message advances as each picture is introduced.
   NOTE: practice images are passed unshuffled, so they appear in the order
   listed in MINI_PRACTICE_IMAGES. */
const GUIDED_PRACTICE_STEPS = {
  "sandwich.jpg": `
    <p style="margin:0;"><strong>Let's try one together.</strong>
    Drag each picture onto the grid as it appears.</p>
    <p style="margin:10px 0 0 0;">Here's a <strong>sandwich</strong>. It's the first picture,
    so you can place it anywhere.</p>`,

  "hamburger.jpg": `
    <p style="margin:0;">A <strong>hamburger</strong> goes with a sandwich —
    place it <strong style="color:#333;">close to the sandwich</strong>.</p>`,

  "french_fries_1.jpg": `
    <p style="margin:0;"><strong>French fries</strong> go with those two as well —
    place them <strong style="color:#333;">close to that group</strong>.</p>`,

  "ice_cream_1.jpg": `
    <p style="margin:0;"><strong>Ice cream</strong> is different from the first three —
    place it <strong style="color:#333;">far away</strong> from them.</p>`,

  "cookie.jpg": `
    <p style="margin:0;">A <strong>cookie</strong> goes with ice cream —
    place it <strong style="color:#333;">close to the ice cream</strong>,
    and far from the first group.</p>`
};

const GUIDED_PRACTICE_FINAL = `
  <p style="margin:0;">Nicely done!</p>
  <span style="font-size:20px;">
    When you're satisfied with your arrangement, click
    <strong style="color:#333;">Continue</strong>.
  </span>
`;

const guided_practice_trial = {
  type: EmotionGridPlugin,
  participant: DEMO_PARTICIPANT,
  phase: "practice",
  trial_number: -1,
  total_trials: 1,
  images: MINI_PRACTICE_IMAGES,
  guidance_steps: GUIDED_PRACTICE_STEPS,
  guidance_final: GUIDED_PRACTICE_FINAL
};

const instructions_page_3 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="max-width:960px;margin:auto;padding:40px 30px;text-align:left;line-height:1.7;">
      <h1 style="text-align:center;font-size:30px;margin-bottom:28px;">Before You Begin</h1>
      <p style="font-size:22px;">You'll do a short practice round first so you can get a feel for the task, then complete <strong>${NUM_BLOCKS} blocks of ${TRIALS_PER_BLOCK} arrangements</strong> (${TOTAL_MAIN_TRIALS} in total). Each block focuses on one category of pictures.</p>
      <p style="font-size:22px;">Take your time. Once you place a picture, you can still drag it again to adjust it.</p>
      <p style="font-size:22px;">
        When you are <strong>satisfied with your arrangement</strong>, click
        <strong>Continue</strong> to move to the next round.
      </p>
    </div>
  `,
  choices: ["Start Practice"]
};


function getLeftStartPosition() {

  const focalWidth = SMALL_SIZE * FOCAL_SCALE;

  return {
    x: LEFT_EDGE + focalWidth / 2,
    y: GRID_Y + GRID_HEIGHT / 2
  };
}


const timeline = [
  participant_info_trial,     // silent auto-assign from URL params
  preload_trial,

  consent_page,               // required checkbox before anything else
  welcome_page,

  instructions_page_1,        // what you'll do (dragging)
  instructions_page_2,        // the principle (close = related)

  // Practice 1 — guidance shown on the trial itself
  makePreviewPage(MINI_PRACTICE_IMAGES),
  guided_practice_trial,

  // Worked examples — wrong split across three light pages
  wrong_step_1,
  wrong_step_2,
  sorting_correct_page,

  instructions_page_3,        // practical details

  // Practice 2 — no guidance, different image set
  makePreviewPage(MINI_PRACTICE_IMAGES_2),
  mini_practice_trial_2,

  main_intro
];

/* ─────────────────────────────────────────────────────────────────────────
   DEMOGRAPHICS + DATA-QUALITY QUESTIONS
   Runs after the main task, before save_data, so responses are included
   in the saved CSV.
   ───────────────────────────────────────────────────────────────────────── */

const demographics_page = {
  type: jsPsychSurveyHtmlForm,
  preamble: `
    <div style="max-width:820px;margin:auto;padding:20px 0 0 0;text-align:left;">
      <h1 style="text-align:center;font-size:30px;margin-bottom:16px;">Survey Questions</h1>
      <p style="font-size:20px;line-height:1.6;">
        These take about a minute. All questions are optional.
      </p>
    </div>
  `,
  html: `
    <div style="max-width:820px;margin:auto;text-align:left;font-size:20px;line-height:1.9;">

      <p><label>Age:<br>
        <input name="age" type="number" min="18" max="120"
               style="font-size:19px;padding:7px;width:120px;"></label></p>

      <p><label>Gender:<br>
        <select name="gender" style="font-size:19px;padding:7px;">
          <option value="">— select —</option>
          <option value="woman">Woman</option>
          <option value="man">Man</option>
          <option value="non-binary">Non-binary</option>
          <option value="other">Other / prefer to self-describe</option>
          <option value="no_answer">Prefer not to say</option>
        </select></label></p>

      <p><label>What is your native language? (If more than one, list all.)<br>
        <input name="native_language" type="text"
               style="font-size:19px;padding:7px;width:340px;"></label></p>

      <p><label>Highest level of education completed:<br>
        <select name="education" style="font-size:19px;padding:7px;">
          <option value="">— select —</option>
          <option value="hs">High school or equivalent</option>
          <option value="some_college">Some college</option>
          <option value="bachelors">Bachelor's degree</option>
          <option value="masters">Master's degree</option>
          <option value="doctorate">Doctorate or professional degree</option>
          <option value="no_answer">Prefer not to say</option>
        </select></label></p>

      <p><label>What is your current country of residence? <br>
        <input name="country_of_residence" type="text"
               style="font-size:19px;padding:7px;width:340px;"></label></p>

      <hr style="margin:28px 0;border:none;border-top:1px solid #ddd;">

      <p><strong>How attentive were you while completing the arrangement task?</strong><br>
        <label><input type="radio" name="attentiveness" value="fully"> Fully attentive</label><br>
        <label><input type="radio" name="attentiveness" value="somewhat"> Somewhat distracted</label><br>
        <label><input type="radio" name="attentiveness" value="very"> Very distracted</label>
      </p>

      <p><label>What do you think the study was about?<br>
        <textarea name="study_purpose" rows="3"
                  style="font-size:18px;padding:8px;width:100%;max-width:600px;"></textarea></label></p>

      <p><strong>Did you experience any technical problems (pictures not loading,
         difficulty dragging, etc.)?</strong><br>
        <label><input type="radio" name="tech_issues" value="no"> No</label><br>
        <label><input type="radio" name="tech_issues" value="yes"> Yes</label><br>
        <input name="tech_issues_detail" type="text" placeholder="If yes, please describe"
               style="font-size:18px;padding:7px;width:100%;max-width:600px;margin-top:8px;">
      </p>

      <p><label>Did you use any particular strategy when arranging the pictures?<br>
        <textarea name="strategy" rows="3"
                  style="font-size:18px;padding:8px;width:100%;max-width:600px;"></textarea></label></p>

      <p><label>Any comments or feedback about this study?<br>
        <textarea name="feedback" rows="3"
                  style="font-size:18px;padding:8px;width:100%;max-width:600px;"></textarea></label></p>

    </div>
  `,
  button_label: "Submit"
};

/* ─────────────────────────────────────────────────────────────────────────
   DEBRIEF — shown after data has been saved
   ───────────────────────────────────────────────────────────────────────── */

const debrief_page = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="max-width:960px;margin:auto;padding:40px 30px;text-align:left;line-height:1.7;">
      <h1 style="text-align:center;font-size:30px;margin-bottom:28px;">Debriefing</h1>

      <p style="font-size:22px;">Thank you for participating!</p>

      <p style="font-size:22px;">The purpose of this study was to understand how adults
      mentally organize everyday concepts — such as animals, plants, emotions, vehicles,
      clothing, and household objects — and whether the way people group related items
      reveals consistent underlying structure.</p>

      <p style="font-size:22px;">We asked you to arrange pictures by distance because
      the space between items gives us a continuous measure of how closely related you
      consider them to be. We deliberately did not tell you the specific research
      question beforehand, since knowing it in advance could have changed how you
      approached the task. As we said at the start, there were genuinely
      <strong>no correct arrangements</strong> — we were interested in your own intuitions.</p>

      <p style="font-size:22px;">Your responses are identified only by your Prolific ID
      and will be reported in aggregate. If you would like your data withdrawn, or if you
      have questions about this research, please contact us at lillab@ucsd.edu.</p>

      <p style="font-size:22px;">Thank you again for your time and contribution.</p>
    </div>
  `,
  choices: ["Finish"]
};

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
    <div style="max-width:960px;margin:auto;padding:60px 30px;text-align:center;line-height:1.7;">
      <h1 style="font-size:30px;margin-bottom:28px;">Thank you!</h1>
      <p style="font-size:22px;">
        You have completed the study. Your responses have been saved.
      </p>
      <p style="font-size:22px;">
        Please click the button below to return to Prolific and confirm your
        submission.
      </p>
    </div>
  `,
  choices: ["Return to Prolific"],
  on_start: function() { setReminderVisible(false); },
  on_finish: function() {
    // Replace with your actual Prolific completion URL:
    window.location.href = "https://app.prolific.com/submissions/complete?cc=C15NSPWS";
  }
};

jsPsychInstance.run(timeline);