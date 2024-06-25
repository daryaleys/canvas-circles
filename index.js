const canvas = document.querySelector("canvas");
const winHeight = window.innerHeight;
const winWidth = document.documentElement.clientWidth;

canvas.height = winHeight;
canvas.width = winWidth;

const c = canvas.getContext("2d");

class Circle {
	constructor(x, y, dx, dy, radius) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = radius;
	}

	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.strokeStyle = "red";
		c.fillStyle = "rgba(255, 0, 0, 0.3)";
		c.fill();
		c.stroke();
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

		this.draw();
	}
}

let circleArray = [];

for (let i = 0; i < 100; i++) {
	let radius = 30,
		x = Math.random() * (winWidth - radius * 2) + radius,
		y = Math.random() * (winHeight - radius * 2) + radius,
		dx = (Math.random() - 0.5) * 4,
		dy = (Math.random() - 0.5) * 4;

	circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, winWidth, winHeight);

	for (let i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}

animate();
