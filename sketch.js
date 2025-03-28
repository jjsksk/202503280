let seaweeds = [];
let seaweedColors = ['#F08080', '#F4978E', '#F8AD9D', '#FBC4AB', '#FFDAB9']; // 指定顏色
let iframe;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布

  // 創建 iframe
  iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.bilibili.com/video/BV1gT4y1e7Nd/'); // 修改為 Bilibili 網址
  iframe.style('border', 'none');
  iframe.size(windowWidth * 0.8, windowHeight * 0.8); // 設定寬高為視窗的 80%
  iframe.position(windowWidth * 0.1, windowHeight * 0.1); // 置中顯示

  for (let i = 0; i < 100; i++) { // 增加海草數量到 100
    seaweeds.push(new Seaweed(random(width), height - 10, random(50, 150)));
  }
}

function draw() {
  background(220);

  // 畫底部的線
  stroke(0);
  strokeWeight(2);
  line(0, height - 10, width, height - 10);

  // 畫海草
  for (let seaweed of seaweeds) {
    seaweed.display();
    seaweed.swing();
  }
}

class Seaweed {
  constructor(x, y, height) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = 5; // 固定寬度為 5
    this.angle = random(TWO_PI); // 初始角度
    this.angleSpeed = random(0.01, 0.05); // 搖擺速度
    this.color = color(red(random(seaweedColors)), green(random(seaweedColors)), blue(random(seaweedColors)), 128); // 設定透明度為 50%
  }

  display() {
    push();
    translate(this.x, this.y);
    stroke(this.color);
    strokeWeight(35); // 設定線條粗細為 35
    noFill();
    beginShape();
    for (let i = 0; i <= 10; i++) {
      let offsetX = sin(this.angle + i * 0.5) * this.width; // 左右搖擺
      let offsetY = -this.height * (i / 10);
      vertex(offsetX, offsetY);
    }
    endShape();
    pop();
  }

  swing() {
    this.angle += this.angleSpeed; // 更新角度
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 畫布隨視窗大小調整

  // 調整 iframe 的大小和位置
  iframe.size(windowWidth * 0.8, windowHeight * 0.8);
  iframe.position(windowWidth * 0.1, windowHeight * 0.1);
}