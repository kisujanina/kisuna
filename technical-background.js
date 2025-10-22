/* filepath: i:\kisuna\js\technical-background.js */
/* Technical Background Renderer - Gears, Circuits, and Electronic Components */

class TechnicalBackground {
  constructor(canvasId) {
    console.log("Initializing Technical Background");
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.error("Canvas element not found:", canvasId);
      return;
    }
    
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    
    this.gears = [];
    this.circuits = [];
    this.components = [];
    
    this.initElements();
    this.animate();
    
    window.addEventListener('resize', () => this.resizeCanvas());
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  initElements() {
    // Create gears of various sizes
    const gearSizes = [
      { radius: 100, teeth: 20, speed: 0.002 },
      { radius: 90, teeth: 18, speed: -0.0015 },
      { radius: 70, teeth: 16, speed: 0.0025 },
      { radius: 65, teeth: 14, speed: -0.003 },
      { radius: 50, teeth: 12, speed: 0.0018 },
      { radius: 45, teeth: 10, speed: -0.002 },
      { radius: 40, teeth: 10, speed: 0.0022 },
      { radius: 35, teeth: 8, speed: -0.0028 },
      { radius: 30, teeth: 8, speed: 0.0032 }
    ];
    
    gearSizes.forEach((size, i) => {
      this.gears.push({
        x: (this.canvas.width / (gearSizes.length + 1)) * (i + 1),
        y: Math.random() * this.canvas.height,
        radius: size.radius,
        teeth: size.teeth,
        rotation: Math.random() * Math.PI * 2,
        speed: size.speed,
        opacity: 0.3 + Math.random() * 0.2
      });
    });
    
    // Create circuit traces
    for (let i = 0; i < 20; i++) {
      const startX = Math.random() * this.canvas.width;
      const startY = Math.random() * this.canvas.height;
      const segments = Math.floor(Math.random() * 3) + 2;
      
      const points = [{ x: startX, y: startY }];
      let currentX = startX;
      let currentY = startY;
      
      for (let j = 0; j < segments; j++) {
        const horizontal = Math.random() > 0.5;
        if (horizontal) {
          currentX += (Math.random() - 0.5) * 200;
        } else {
          currentY += (Math.random() - 0.5) * 200;
        }
        points.push({ x: currentX, y: currentY });
      }
      
      this.circuits.push({
        points,
        opacity: 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03
      });
    }
    
    // Create electronic components
    for (let i = 0; i < 15; i++) {
      const type = ['chip', 'resistor', 'capacitor'][Math.floor(Math.random() * 3)];
      this.components.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        type,
        rotation: Math.random() * Math.PI * 2,
        opacity: 0.3 + Math.random() * 0.2,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
  }
  
  drawGear(gear) {
    this.ctx.save();
    this.ctx.translate(gear.x, gear.y);
    this.ctx.rotate(gear.rotation);
    this.ctx.globalAlpha = gear.opacity * 0.6; // Reduce opacity for better contrast
    this.ctx.strokeStyle = '#444'; // Darker stroke color
    this.ctx.fillStyle = '#888'; // Darker fill color
    this.ctx.lineWidth = 2;
    
    // Draw gear teeth
    this.ctx.beginPath();
    for (let i = 0; i < gear.teeth; i++) {
      const angle = (Math.PI * 2 / gear.teeth) * i;
      const innerRadius = gear.radius * 0.9;
      const outerRadius = gear.radius * 1.1;
      
      const x1 = Math.cos(angle) * innerRadius;
      const y1 = Math.sin(angle) * innerRadius;
      const x2 = Math.cos(angle) * outerRadius;
      const y2 = Math.sin(angle) * outerRadius;
      
      if (i === 0) this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      
      const nextAngle = (Math.PI * 2 / gear.teeth) * (i + 1);
      const x3 = Math.cos(nextAngle) * outerRadius;
      const y3 = Math.sin(nextAngle) * outerRadius;
      const x4 = Math.cos(nextAngle) * innerRadius;
      const y4 = Math.sin(nextAngle) * innerRadius;
      
      this.ctx.lineTo(x3, y3);
      this.ctx.lineTo(x4, y4);
      this.ctx.lineTo(x1, y1);
    }
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
    
    // Draw concentric circles
    this.ctx.beginPath();
    this.ctx.arc(0, 0, gear.radius * 0.7, 0, Math.PI * 2);
    this.ctx.stroke();
    
    this.ctx.beginPath();
    this.ctx.arc(0, 0, gear.radius * 0.5, 0, Math.PI * 2);
    this.ctx.stroke();
    
    // Draw center hub
    this.ctx.beginPath();
    this.ctx.arc(0, 0, gear.radius * 0.2, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();
    
    this.ctx.restore();
  }
  
  drawCircuit(circuit) {
    const opacity = 0.2 + Math.sin(circuit.pulsePhase) * 0.15; // Reduced opacity
    this.ctx.globalAlpha = opacity;
    this.ctx.strokeStyle = '#555'; // Darker stroke color
    this.ctx.lineWidth = 2;
    
    // Draw circuit traces
    this.ctx.beginPath();
    circuit.points.forEach((point, i) => {
      if (i === 0) {
        this.ctx.moveTo(point.x, point.y);
      } else {
        this.ctx.lineTo(point.x, point.y);
      }
    });
    this.ctx.stroke();
    
    // Draw connection nodes
    this.ctx.fillStyle = '#666';
    circuit.points.forEach(point => {
      this.ctx.beginPath();
      this.ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
      this.ctx.fill();
    });
    
    circuit.pulsePhase += circuit.pulseSpeed;
  }
  
  drawComponent(component) {
    this.ctx.save();
    this.ctx.translate(component.x, component.y);
    this.ctx.rotate(component.rotation);
    this.ctx.globalAlpha = component.opacity;
    this.ctx.strokeStyle = '#777';
    this.ctx.fillStyle = '#aaa';
    this.ctx.lineWidth = 1.5;
    
    if (component.type === 'chip') {
      // Draw IC chip
      const width = 40;
      const height = 30;
      this.ctx.fillRect(-width/2, -height/2, width, height);
      this.ctx.strokeRect(-width/2, -height/2, width, height);
      
      // Draw pins
      for (let i = 0; i < 4; i++) {
        this.ctx.fillRect(-width/2 - 5, -height/2 + 7 + i * 6, 5, 3);
        this.ctx.fillRect(width/2, -height/2 + 7 + i * 6, 5, 3);
      }
    } else if (component.type === 'resistor') {
      // Draw resistor
      this.ctx.beginPath();
      this.ctx.moveTo(-25, 0);
      this.ctx.lineTo(-15, 0);
      this.ctx.lineTo(-12, -5);
      this.ctx.lineTo(-8, 5);
      this.ctx.lineTo(-4, -5);
      this.ctx.lineTo(0, 5);
      this.ctx.lineTo(4, -5);
      this.ctx.lineTo(8, 5);
      this.ctx.lineTo(12, -5);
      this.ctx.lineTo(15, 0);
      this.ctx.lineTo(25, 0);
      this.ctx.stroke();
    } else if (component.type === 'capacitor') {
      // Draw capacitor
      this.ctx.beginPath();
      this.ctx.moveTo(-25, 0);
      this.ctx.lineTo(-5, 0);
      this.ctx.moveTo(-5, -10);
      this.ctx.lineTo(-5, 10);
      this.ctx.moveTo(5, -10);
      this.ctx.lineTo(5, 10);
      this.ctx.moveTo(5, 0);
      this.ctx.lineTo(25, 0);
      this.ctx.stroke();
    }
    
    this.ctx.restore();
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw gears
    this.gears.forEach(gear => {
      gear.rotation += gear.speed;
      this.drawGear(gear);
    });
    
    // Draw circuits
    this.circuits.forEach(circuit => {
      this.drawCircuit(circuit);
    });
    
    // Draw components
    this.components.forEach(component => {
      this.drawComponent(component);
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM loaded, initializing technical background");
  new TechnicalBackground('technical-canvas');
});

// Also try immediate initialization
console.log("Attempting immediate initialization");
if (document.getElementById('technical-canvas')) {
  new TechnicalBackground('technical-canvas');
} else {
  console.warn("Canvas element 'technical-canvas' not found on immediate load");
}