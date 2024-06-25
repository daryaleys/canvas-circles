const canvas = document.querySelector("canvas");
let winHeight = window.innerHeight;
canvas.height = winHeight;
let winWidth = document.documentElement.clientWidth;
canvas.width = winWidth;

window.addEventListener("resize", () => {
	winHeight = window.innerHeight;
	canvas.height = winHeight;

	winWidth = document.documentElement.clientWidth;
	canvas.width = winWidth;

	init();
});

const c = canvas.getContext("2d");

const maxRadius = 80;
// minRadius is the initial radius of each individual circle

const colorArray = ["rgba(255, 255, 255,0.9)", "rgba(183,242,184,0.9)", "rgba(180,255,237,0.9)", "rgba(182,205,255,0.9)", "rgba(204,180,255,0.9)", "rgba(255,179,242,0.9)"];
let circleArray = [];

const mouse = {
	x: undefined,
	y: undefined,
};

canvas.addEventListener("mousemove", (event) => {
	mouse.x = event.x;
	mouse.y = event.y;
});

class Circle {
	constructor(x, y, dx, dy, radius) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.minRadius = radius;
		this.radius = radius;
		this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
	}

	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}

	update() {
		if (this.x + this.radius > winWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}

		if (this.y + this.radius > winHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		if (mouse.x - this.x < 80 && mouse.x - this.x > -80 && mouse.y - this.y < 80 && mouse.y - this.y > -80) {
			if (this.radius < maxRadius) this.radius += 1;
		} else {
			if (this.radius > this.minRadius) this.radius -= 1;
		}

		this.draw();
	}
}

function init() {
	circleArray = [];

	for (let i = 0; i < 500; i++) {
		let radius = Math.random() * 20 + 10,
			x = Math.random() * (winWidth - radius * 2) + radius,
			y = Math.random() * (winHeight - radius * 2) + radius,
			dx = (Math.random() - 0.5) * 4,
			dy = (Math.random() - 0.5) * 4;

		circleArray.push(new Circle(x, y, dx, dy, radius));
	}
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, winWidth, winHeight);

	for (let i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}

init();
animate();
