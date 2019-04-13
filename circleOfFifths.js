let outRatio = 0.8;
let outC1;
let outC2;
let outCH;
let outCT;
let outCSP; // 分隔
let outText = ["沒有升降", "1 個 #", "2 個 #", "3 個 #", "4 個 #", "7 個 b / 5 個 #", "6 個 b / 6 個 #", "5 個 b / 7 個 #", "4 個 b", "3 個 b", "2 個 b", "1 個 b"]
let outTextSize = 15;

let majorRatio = 0.74;
let majorC1;
let majorC2;
let majorCT;
let majorText = ["C", "G", "D", "A", "E", "Cb/B", "Gb/F#", "Db/C#", "Ab", "Eb", "Bb", "F"]
let majorTextSize = 22;

let minorRatio = 0.65;
let minorC1;
let minorC2;
let minorCT;
let minorText = ["Am", "Em", "Bm", "F#m", "C#m", "Abm/G#m", "Ebm/D#m", "Bbm/A#m", "Fm", "Cm", "Gm", "Dm"]
let minorTextSize = 17;

let detailText1 = [
  "C 大調 ─ A 小調",
  "G 大調 ─ E 小調",
  "D 大調 ─ B 小調",
  "A 大調 ─ F# 小調",
  "E 大調 ─ C# 小調",
  "Cb 大調 ─ Ab 小調 / B 大調 ─ G# 小調",
  "Gb 大調 ─ Eb 小調 / F# 大調 ─ D# 小調",
  "Db 大調 ─ Bb 小調 / C# 大調 ─ A# 小調",
  "Ab 大調 ─ F 小調",
  "Eb 大調 ─ C 小調",
  "Bb 大調 ─ G 小調",
  "F 大調 ─ D 小調"
]
let detailTextSize = 22;

let coreRatio = 0.57;
let coreType = "Detail";

let dbText = "Circle of Fifths by NiceChord (Wiwi Kuan)"

let mouseDir;

let acc = 0;
let vel = 0;
let angle = -3.5; // 1 = 1/12 TAU, global angle

let locked = true;

let imgStaff;
let imgSharp;
let imgFlat;

let modeLabel = ["Major/Minor", "Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"];

let paintingArray = new Array();

function preload() {
  imgStaff = loadImage("./staff.png");
  imgFlat = loadImage("./flat.png");
  imgSharp = loadImage("./sharp.png");
}

function setup() {
  createCanvas(800, 800);
  ellipseMode(CENTER);
  colorMode(HSB, 100);
  //colors
  outC1 = color(60, 30, 70);
  outC2 = color(60, 30, 80);
  outCH = color(60, 30, 100);
  outCT = color(60, 0, 95);
  outCSP = color(60, 20, 95);
  majorC1 = color(80, 30, 80);
  majorC2 = color(80, 30, 70);
  majorCT = color(80, 30, 20);
  minorC1 = color(80, 30, 75);
  minorC2 = color(80, 30, 65);
  minorCT = color(80, 10, 90);

  outTextSize = width * 0.01875;
  majorTextSize = width * 0.0275;
  minorTextSize = width * 0.02125;
  detailTextSize = width * 0.0275;

  lockButton = createButton('[已鎖定]');
  lockButton.position(19, 19);
  lockButton.mousePressed(toggleLocked);


}

function toggleLocked() {
  if (locked) {
    lockButton.html("鎖定");
    locked = false;
  } else {
    lockButton.html("[已鎖定]");
    locked = true;
  }
}

function highlighted() {
  let x = mouseDir - angle;
  while (x < 0) {
    x += 12;
  }
  x = ((x * 10000) % 120000) / 10000;

  return floor(x);
}

function drawOuter(ang) {
  stroke(outCSP);
  strokeWeight(width / 600);
  for (i = 0; i < 12; i++) {
    fill((i % 2 == 0) ? outC1 : outC2);
    if (i == highlighted()) {
      fill(outCH);
    }
    let j = i + ang;
    arc(0, 0, width * outRatio, height * outRatio, TAU * (j / 12), TAU * ((j + 1) / 12) - 0.000001, PIE);
  }
  stroke(20);
  noFill();
  ellipse(0, 0, width * outRatio);
}

function drawOuterText(ang) {
  for (i = 0; i < 12; i++) {
    let j = i + ang + 3.5; // 把第一個字畫到右方
    push();
    rotate(TAU * (j / 12));
    textAlign(CENTER);
    textSize(outTextSize);
    noStroke();
    fill(outCT);
    text(outText[i], 0, -(height * outRatio / 2 * 0.945));
    pop();
  }

}

function drawMajor(ang) {
  stroke(90);
  for (i = 0; i < 12; i++) {
    fill((i % 2 == 0) ? majorC1 : majorC2);
    let j = i + ang;
    arc(0, 0, width * majorRatio, height * majorRatio, TAU * (j / 12), TAU * ((j + 1) / 12) - 0.000001);
  }
}

function drawMajorText(ang) {
  for (i = 0; i < 12; i++) {
    let j = i + ang + 3.5;
    push();
    rotate(TAU * (j / 12));
    textAlign(CENTER);
    textSize(majorTextSize);
    noStroke();
    fill(majorCT);
    text(majorText[i], 0, -(height * majorRatio / 2 * 0.91));
    pop();
  }

}

function drawMinor(ang) {
  noStroke();
  for (i = 0; i < 12; i++) {
    fill((i % 2 == 0) ? minorC1 : minorC2);
    let j = i + ang;
    arc(0, 0, width * minorRatio, height * minorRatio, TAU * (j / 12), TAU * ((j + 1) / 12) - 0.000001);
  }
}

function drawMinorText(ang) {
  for (i = 0; i < 12; i++) {
    let j = i + ang + 3.5;
    push();
    rotate(TAU * (j / 12));
    textAlign(CENTER);
    textSize(minorTextSize);
    noStroke();
    fill(minorCT);
    text(minorText[i], 0, -(height * minorRatio / 2 * 0.91));
    pop();
  }
}

function drawCore(ang) {
  switch (coreType) {
    case "Empty":
      drawCoreEmpty(ang);
      break;
    case "Black":
      drawCoreBlack(ang);
      break;
    case "Detail":
      drawCoreDetail(ang);
      break;
    default:
      drawCoreEmpty(ang);
  }
}

function drawCoreDetail(ang) {
  fill(100);
  stroke(40);
  ellipse(0, 0, width * coreRatio);
  fill(20);
  noStroke();
  textAlign(CENTER);
  textSize(detailTextSize);
  text(detailText1[highlighted()], 0, height * 0.08);

  imageMode(CENTER);
  image(imgStaff, 0, height * -0.03, width / 2, height * 0.15);
  let sig = highlighted();
  sig = (sig > 6) ? sig - 12 : sig;

  //


  // dbText = sig;
  switch (sig) {
    case 5:
      stroke(0);
      strokeWeight(width / 400);
      line(width * -0.008, height * -0.066, width * -0.008, height * 0.009);
      strokeWeight(width / 800);
      drawKeySig(5, 0.02, 1);
      drawKeySig(-7, -0.16, 1);
      drawSigNumber(5, -7);
      break;
    case 6:
      stroke(0);
      strokeWeight(width / 400);
      line(width * -0.008, height * -0.066, width * -0.008, height * 0.009);
      strokeWeight(width / 800);
      drawKeySig(6, 0.02, 1);
      drawKeySig(-6, -0.16, 1);
      drawSigNumber(6, -6);
      break;
    case -5:
      stroke(0);
      strokeWeight(width / 400);
      line(width * -0.008, height * -0.066, width * -0.008, height * 0.009);
      strokeWeight(width / 800);
      drawKeySig(7, 0.02, 1);
      drawKeySig(-5, -0.16, 1);
      drawSigNumber(7, -5);
      break;
    default:
      drawKeySig(sig, -0.16, 1);
      drawSigNumber((sig > 0) ? sig : 0, (sig < 0) ? sig : 0);
  }


}

function drawSigNumber(s, f) {
  // draw center one
  noStroke();
  fill(80);
  let acci = [
    "Fb", "Cb", "Gb", "Db", "Ab", "Eb", "Bb", "",
    "F#", "C#", "G#", "D#", "A#", "E#", "B#"
  ]
  let sp = 0.024; // space
  let w = 0.02; // width
  let h = 0.004; // height
  rectMode(CENTER);
  textAlign(CENTER);
  for (i = -7; i < 8; i++) {
    switch (true) {
      case (i < 0): // flat
        fill(20, (i < f) ? 20 : 100, (i < f) ? 90 : 70);
        break;
      case (i > 0): // sharp
        fill(100, (i > s) ? 20 : 90, (i < s) ? 90 : 80);
        break;
      default:
        fill(80);
        textSize(width / 60);
        text("♮", 0, height * 0.14);
        fill(60);
    }
    rect((0 + sp * i) * width, height * 0.12, height * w, height * h);
    textSize(width / 74);
    text(acci[i + 7], (0 + sp * i) * width, height * 0.138);
  }
  textSize(width / 60);
  fill(90);
  text(`（${-f} 個降記號 / ${s} 個升記號）`, 0, height * 0.16);
}

function drawKeySig(sig, x, y) {
  let sx = x;
  let sp = 0.02;
  if (sig > 0) {
    imageMode(CENTER);
    let sy = [-0.066, -0.039, -0.077, -0.0475, -0.017, -0.0575, -0.02875];
    for (i = 0; i < sig; i++) {
      image(imgSharp, width * (sx + (i * sp)), height * sy[i], width / 16, height / 16);
    }
  }
  if (sig < 0) {
    imageMode(CENTER);
    let sy = [-0.0289, -0.059, -0.021, -0.049, -0.012, -0.04, -0.002];
    for (i = 0; i < abs(sig); i++) {
      image(imgFlat, width * (sx + (i * sp)), height * sy[i], width / 16, height / 16);
    }
  }
}

function drawCoreEmpty(ang) {
  fill(100);
  stroke(40);
  ellipse(0, 0, width * coreRatio);
}

function drawCoreBlack(ang) {
  fill(0);
  stroke(40);
  ellipse(0, 0, width * coreRatio);
}

function debugText() {
  fill(0);
  noStroke();
  textAlign(CENTER);
  text(dbText, 0, height * 0.45);
}

function mouseAngle(ang) {
  let v = createVector(mouseX - width / 2, mouseY - height / 2);
  let h = v.heading(); // -PI ~ PI
  let i = map(h, -PI, PI, 6, 18);
  mouseDir = (i > 12) ? i - 12 : i;

}

function rotateGlobal() {
  acc = (mouseX - width / 2) / width;
  if (abs(acc) > 0.4) {
    vel += acc / 70;
    vel = constrain(vel, -0.1, 0.1);
  }

  if (locked) {
    vel = 0; // friction
  } else {
    vel *= 0.9
  }
  angle += vel;
}



function draw() {
  background(95);
  translate(width / 2, height / 2);
  mouseAngle(angle);
  rotateGlobal();
  highlighted();
  drawOuter(angle);
  drawOuterText(angle);
  drawMajor(angle);
  drawMajorText(angle);
  drawMinor(angle);
  drawMinorText(angle);
  drawCore(angle);
  debugText();

}
