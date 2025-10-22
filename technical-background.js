/* filepath: i:\kisuna\js\technical-background.js */
/* Technical Background Renderer - Enhanced Robotics & Circuit Components */

class TechnicalBackground {
  constructor(canvasId) {
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
    this.robotParts = [];
    
    this.initElements();
    this.animate();
    
    window.addEventListener('resize', () => this.resizeCanvas());
    console.log("Technical background initialized with enhanced components");
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  initElements() {
    // Create more realistic gears with better mechanical details
    const gearSizes = [
      { radius: 100, teeth: 24, speed: 0.001, detail: 'high' },
      { radius: 85, teeth: 20, speed: -0.0015, detail: 'high' },
      { radius: 65, teeth: 16, speed: 0.002, detail: 'medium' },
      { radius: 50, teeth: 14, speed: -0.0025, detail: 'medium' },
      { radius: 40, teeth: 12, speed: 0.003, detail: 'low' },
      { radius: 30, teeth: 10, speed: -0.0035, detail: 'low' }
    ];
    
    // Distribute gears across the screen in a more mechanical arrangement
    const centerX = this.canvas.width * 0.3;
    const centerY = this.canvas.height * 0.4;
    
    gearSizes.forEach((size, i) => {
      // Position gears in a more mechanical arrangement
      let x, y;
      
      if (i % 3 === 0) {
        // Main gear positions
        x = centerX + Math.cos(i * Math.PI / 3) * (size.radius * 2.5);
        y = centerY + Math.sin(i * Math.PI / 3) * (size.radius * 2.5);
      } else {
        // Secondary gear positions that mesh with the main gears
        const prevGear = this.gears[i-1];
        if (prevGear) {
          const angle = Math.atan2(prevGear.y - centerY, prevGear.x - centerX);
          const distance = prevGear.radius + size.radius + 5;
          x = prevGear.x + Math.cos(angle + Math.PI) * distance;
          y = prevGear.y + Math.sin(angle + Math.PI) * distance;
        } else {
          x = centerX + (Math.random() - 0.5) * this.canvas.width * 0.5;
          y = centerY + (Math.random() - 0.5) * this.canvas.height * 0.5;
        }
      }
      
      // Add a second cluster of gears at the bottom right
      if (i >= 3) {
        const altX = this.canvas.width * 0.7;
        const altY = this.canvas.height * 0.7;
        
        if (Math.random() > 0.5) {
          x = altX + (Math.random() - 0.5) * size.radius * 3;
          y = altY + (Math.random() - 0.5) * size.radius * 3;
        }
      }
      
      this.gears.push({
        x,
        y,
        radius: size.radius,
        teeth: size.teeth,
        rotation: Math.random() * Math.PI * 2,
        speed: size.speed,
        opacity: 0.4 + Math.random() * 0.2,
        detail: size.detail,
        innerHoles: Math.floor(Math.random() * 5) + 3,
        holeSize: size.radius * 0.15
      });
    });
    
    // Create enhanced circuit traces with more electronic path features
    for (let i = 0; i < 30; i++) {
      const startX = Math.random() * this.canvas.width;
      const startY = Math.random() * this.canvas.height;
      const segments = Math.floor(Math.random() * 5) + 3;
      const isMainPath = Math.random() > 0.7;
      
      const points = [{ x: startX, y: startY }];
      let currentX = startX;
      let currentY = startY;
      
      // Create more realistic circuit paths (90-degree turns)
      for (let j = 0; j < segments; j++) {
        const horizontal = j % 2 === 0;
        const length = (Math.random() * 100) + 50;
        
        if (horizontal) {
          currentX += (Math.random() > 0.5 ? 1 : -1) * length;
        } else {
          currentY += (Math.random() > 0.5 ? 1 : -1) * length;
        }
        
        points.push({ x: currentX, y: currentY });
        
        // Add junction nodes at some corners (T-junctions)
        if (Math.random() > 0.7) {
          const branchLength = (Math.random() * 50) + 30;
          const branchX = horizontal ? currentX : currentX + (Math.random() > 0.5 ? 1 : -1) * branchLength;
          const branchY = horizontal ? currentY + (Math.random() > 0.5 ? 1 : -1) * branchLength : currentY;
          
          points.push({ x: branchX, y: branchY, isJunction: true });
          points.push({ x: currentX, y: currentY });
        }
      }
      
      this.circuits.push({
        points,
        opacity: isMainPath ? 0.6 : 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        width: isMainPath ? 2.5 : 1.5,
        color: isMainPath ? '#0a5' : '#073',
        isMainPath
      });
    }
    
    // Create enhanced electronic components
    const componentTypes = ['chip', 'resistor', 'capacitor', 'inductor', 'diode', 'transistor'];
    for (let i = 0; i < 20; i++) {
      const type = componentTypes[Math.floor(Math.random() * componentTypes.length)];
      const scale = 0.6 + Math.random() * 0.8;
      
      this.components.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        type,
        rotation: Math.random() * Math.PI * 2,
        opacity: 0.4 + Math.random() * 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        scale,
        showLabel: Math.random() > 0.7
      });
    }
    
    // Add robotic components
    const robotPartTypes = ['joint', 'servo', 'sensor', 'arm'];
    for (let i = 0; i < 10; i++) {
      const type = robotPartTypes[Math.floor(Math.random() * robotPartTypes.length)];
      
      this.robotParts.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        type,
        rotation: Math.random() * Math.PI * 2,
        opacity: 0.5 + Math.random() * 0.3,
        scale: 0.7 + Math.random() * 0.6,
        animationPhase: Math.random() * Math.PI * 2
      });
    }
  }
  
  drawGear(gear) {
    this.ctx.save();
    this.ctx.translate(gear.x, gear.y);
    this.ctx.rotate(gear.rotation);
    this.ctx.globalAlpha = gear.opacity;
    this.ctx.strokeStyle = '#555';
    this.ctx.fillStyle = '#999';
    this.ctx.lineWidth = 1.5;
    
    // Draw improved gear teeth with more mechanical detail
    this.ctx.beginPath();
    const teethDepth = gear.radius * 0.15;
    const toothWidth = (Math.PI * 2 * gear.radius) / (gear.teeth * 2);
    
    for (let i = 0; i < gear.teeth; i++) {
      const angle = (Math.PI * 2 / gear.teeth) * i;
      const nextAngle = (Math.PI * 2 / gear.teeth) * (i + 0.5);
      const innerRadius = gear.radius - teethDepth;
      
      // Inner point
      const innerX1 = Math.cos(angle) * innerRadius;
      const innerY1 = Math.sin(angle) * innerRadius;
      
      // Outer point
      const outerX = Math.cos(angle + (Math.PI / gear.teeth)) * (gear.radius + teethDepth * 0.5);
      const outerY = Math.sin(angle + (Math.PI / gear.teeth)) * (gear.radius + teethDepth * 0.5);
      
      // Next inner point
      const innerX2 = Math.cos(nextAngle) * innerRadius;
      const innerY2 = Math.sin(nextAngle) * innerRadius;
      
      // Draw the tooth profile with a curve
      if (i === 0) {
        this.ctx.moveTo(innerX1, innerY1);
      } else {
        this.ctx.lineTo(innerX1, innerY1);
      }
      
      this.ctx.lineTo(outerX, outerY);
      this.ctx.lineTo(innerX2, innerY2);
    }
    
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
    
    // Draw inner gear details based on detail level
    if (gear.detail === 'high' || gear.detail === 'medium') {
      // Draw multiple concentric circles
      const circles = gear.detail === 'high' ? 4 : 2;
      for (let i = 1; i <= circles; i++) {
        const radius = (gear.radius - teethDepth) * (0.9 - i * 0.15);
        this.ctx.beginPath();
        this.ctx.arc(0, 0, radius, 0, Math.PI * 2);
        this.ctx.stroke();
      }
      
      // Draw mounting holes
      for (let i = 0; i < gear.innerHoles; i++) {
        const holeAngle = (Math.PI * 2 / gear.innerHoles) * i;
        const holeDistance = gear.radius * 0.5;
        const holeX = Math.cos(holeAngle) * holeDistance;
        const holeY = Math.sin(holeAngle) * holeDistance;
        
        this.ctx.beginPath();
        this.ctx.arc(holeX, holeY, gear.holeSize, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Draw inner hole detail
        if (gear.detail === 'high') {
          this.ctx.beginPath();
          this.ctx.arc(holeX, holeY, gear.holeSize * 0.5, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
    }
    
    // Draw center hub
    this.ctx.beginPath();
    this.ctx.arc(0, 0, gear.radius * 0.2, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();
    
    // Draw center hole
    this.ctx.beginPath();
    this.ctx.arc(0, 0, gear.radius * 0.1, 0, Math.PI * 2);
    this.ctx.stroke();
    
    // Draw keyway for high-detail gears
    if (gear.detail === 'high') {
      this.ctx.beginPath();
      this.ctx.moveTo(gear.radius * 0.05, 0);
      this.ctx.lineTo(gear.radius * 0.15, 0);
      this.ctx.lineTo(gear.radius * 0.15, gear.radius * 0.05);
      this.ctx.lineTo(gear.radius * 0.05, gear.radius * 0.05);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();
    }
    
    this.ctx.restore();
  }
  
  drawCircuit(circuit) {
    const pulseIntensity = 0.15 * (circuit.isMainPath ? 1.5 : 1);
    const opacity = circuit.opacity + Math.sin(circuit.pulsePhase) * pulseIntensity;
    this.ctx.globalAlpha = opacity;
    
    // Draw enhanced circuit trace with width and color
    this.ctx.strokeStyle = circuit.color;
    this.ctx.lineWidth = circuit.width;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    
    // Draw the main circuit path
    this.ctx.beginPath();
    circuit.points.forEach((point, i) => {
      if (i === 0 || point.isJunction) {
        this.ctx.moveTo(point.x, point.y);
      } else {
        this.ctx.lineTo(point.x, point.y);
      }
    });
    this.ctx.stroke();
    
    // Draw connection nodes and junction points
    circuit.points.forEach((point, i) => {
      if (i === 0 || i === circuit.points.length - 1 || point.isJunction) {
        // Draw larger connection point
        this.ctx.fillStyle = circuit.isMainPath ? '#0d8' : '#095';
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, circuit.width * 2, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw outer ring for connection points
        this.ctx.strokeStyle = '#0c6';
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, circuit.width * 3, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Add glow effect for main paths
        if (circuit.isMainPath) {
          this.ctx.globalAlpha = 0.2;
          this.ctx.beginPath();
          this.ctx.arc(point.x, point.y, circuit.width * 5, 0, Math.PI * 2);
          this.ctx.fillStyle = '#0f9';
          this.ctx.fill();
          this.ctx.globalAlpha = opacity;
        }
      } else if (i % 2 === 0) {
        // Small nodes along the path
        this.ctx.fillStyle = circuit.color;
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, circuit.width, 0, Math.PI * 2);
        this.ctx.fill();
      }
    });
    
    circuit.pulsePhase += circuit.pulseSpeed;
  }
  
  drawComponent(component) {
    this.ctx.save();
    this.ctx.translate(component.x, component.y);
    this.ctx.rotate(component.rotation);
    this.ctx.scale(component.scale, component.scale);
    this.ctx.globalAlpha = component.opacity;
    this.ctx.strokeStyle = '#555';
    this.ctx.fillStyle = '#999';
    this.ctx.lineWidth = 1.5;
    
    switch (component.type) {
      case 'chip':
        // Draw IC chip with pins and markings
        const width = 40;
        const height = 30;
        
        // Main body
        this.ctx.fillRect(-width/2, -height/2, width, height);
        this.ctx.strokeRect(-width/2, -height/2, width, height);
        
        // Pins on both sides
        const pinCount = 6;
        const pinSpacing = height / (pinCount + 1);
        
        for (let i = 0; i < pinCount; i++) {
          // Left side pins
          this.ctx.fillRect(-width/2 - 5, -height/2 + pinSpacing + i * pinSpacing, 7, 2);
          this.ctx.strokeRect(-width/2 - 5, -height/2 + pinSpacing + i * pinSpacing, 7, 2);
          
          // Right side pins
          this.ctx.fillRect(width/2 - 2, -height/2 + pinSpacing + i * pinSpacing, 7, 2);
          this.ctx.strokeRect(width/2 - 2, -height/2 + pinSpacing + i * pinSpacing, 7, 2);
        }
        
        // Notch indicator
        this.ctx.beginPath();
        this.ctx.arc(-width/2 + 10, -height/2, 3, 0, Math.PI * 2);
        this.ctx.fillStyle = '#555';
        this.ctx.fill();
        
        // Text markings
        if (component.showLabel) {
          this.ctx.fillStyle = '#555';
          this.ctx.font = '6px Arial';
          this.ctx.textAlign = 'center';
          this.ctx.fillText('IC-' + Math.floor(Math.random() * 1000), 0, 0);
        }
        break;
        
      case 'resistor':
        // Draw resistor with striped color bands
        this.ctx.beginPath();
        this.ctx.moveTo(-25, 0);
        this.ctx.lineTo(-15, 0);
        this.ctx.lineTo(-15, -8);
        this.ctx.lineTo(15, -8);
        this.ctx.lineTo(15, 0);
        this.ctx.lineTo(25, 0);
        this.ctx.moveTo(-15, 8);
        this.ctx.lineTo(15, 8);
        this.ctx.moveTo(-15, -8);
        this.ctx.lineTo(-15, 8);
        this.ctx.moveTo(15, -8);
        this.ctx.lineTo(15, 8);
        this.ctx.stroke();
        
        // Color bands
        const bandColors = ['#f00', '#a50', '#0a5', '#00f'];
        for (let i = 0; i < 4; i++) {
          this.ctx.fillStyle = bandColors[i];
          this.ctx.fillRect(-10 + i * 7, -8, 3, 16);
        }
        break;
        
      case 'capacitor':
        // Electrolytic capacitor
        // Draw the body
        this.ctx.beginPath();
        this.ctx.moveTo(-12, -12);
        this.ctx.lineTo(12, -12);
        this.ctx.arc(12, 0, 12, -Math.PI/2, Math.PI/2);
        this.ctx.lineTo(-12, 12);
        this.ctx.arc(-12, 0, 12, Math.PI/2, -Math.PI/2);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
        
        // Lead wires
        this.ctx.beginPath();
        this.ctx.moveTo(-25, 0);
        this.ctx.lineTo(-12, 0);
        this.ctx.moveTo(12, 0);
        this.ctx.lineTo(25, 0);
        this.ctx.stroke();
        
        // Polarity markings
        this.ctx.fillStyle = '#555';
        this.ctx.beginPath();
        this.ctx.arc(-4, 0, 2, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(4, 0, 2, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Plus/minus symbols
        this.ctx.beginPath();
        this.ctx.moveTo(3, -5);
        this.ctx.lineTo(5, -5);
        this.ctx.lineTo(5, -3);
        this.ctx.moveTo(4, -6);
        this.ctx.lineTo(4, -2);
        this.ctx.stroke();
        break;
        
      case 'inductor':
        // Draw coil/inductor
        this.ctx.beginPath();
        this.ctx.moveTo(-25, 0);
        this.ctx.lineTo(-15, 0);
        
        const coilSegments = 5;
        const coilWidth = 30;
        const segmentWidth = coilWidth / coilSegments;
        
        for (let i = 0; i < coilSegments; i++) {
          const startX = -15 + i * segmentWidth;
          this.ctx.bezierCurveTo(
            startX + segmentWidth * 0.3, -8,
            startX + segmentWidth * 0.7, -8,
            startX + segmentWidth, 0
          );
        }
        
        this.ctx.lineTo(25, 0);
        this.ctx.stroke();
        
        // Core line
        this.ctx.setLineDash([2, 2]);
        this.ctx.beginPath();
        this.ctx.moveTo(-15, 5);
        this.ctx.lineTo(15, 5);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
        break;
        
      case 'diode':
        // Draw semiconductor diode with arrow
        this.ctx.beginPath();
        this.ctx.moveTo(-25, 0);
        this.ctx.lineTo(-10, 0);
        this.ctx.lineTo(-10, -8);
        this.ctx.lineTo(10, 0);
        this.ctx.lineTo(-10, 8);
        this.ctx.lineTo(-10, 0);
        this.ctx.moveTo(10, -8);
        this.ctx.lineTo(10, 8);
        this.ctx.moveTo(10, 0);
        this.ctx.lineTo(25, 0);
        this.ctx.stroke();
        break;
        
      case 'transistor':
        // Draw transistor
        // Base circle
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 10, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        
        // Leads
        this.ctx.beginPath();
        // Collector (top)
        this.ctx.moveTo(0, -10);
        this.ctx.lineTo(0, -20);
        // Base (left)
        this.ctx.moveTo(-10, 0);
        this.ctx.lineTo(-25, 0);
        // Emitter (bottom)
        this.ctx.moveTo(0, 10);
        this.ctx.lineTo(0, 20);
        this.ctx.stroke();
        
        // Transistor symbol inside
        this.ctx.strokeStyle = '#333';
        this.ctx.beginPath();
        this.ctx.moveTo(-5, -5);
        this.ctx.lineTo(5, 5);
        this.ctx.moveTo(-5, 5);
        this.ctx.lineTo(5, -5);
        this.ctx.stroke();
        break;
    }
    
    this.ctx.restore();
  }
  
  drawRoboticPart(part) {
    this.ctx.save();
    this.ctx.translate(part.x, part.y);
    this.ctx.rotate(part.rotation);
    this.ctx.scale(part.scale, part.scale);
    this.ctx.globalAlpha = part.opacity;
    this.ctx.strokeStyle = '#555';
    this.ctx.fillStyle = '#888';
    this.ctx.lineWidth = 2;
    
    switch (part.type) {
      case 'joint':
        // Robotic joint with moving parts
        const jointAngle = Math.sin(part.animationPhase) * 0.2;
        
        // Base housing
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 15, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        
        // Inner mechanism
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 10, 0, Math.PI * 2);
        this.ctx.fillStyle = '#666';
        this.ctx.fill();
        this.ctx.stroke();
        
        // Joint arm
        this.ctx.save();
        this.ctx.rotate(jointAngle);
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(30, 0);
        this.ctx.lineTo(30, 5);
        this.ctx.lineTo(0, 5);
        this.ctx.closePath();
        this.ctx.fillStyle = '#999';
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.restore();
        
        // Mounting bolts
        for (let i = 0; i < 4; i++) {
          const boltAngle = (Math.PI / 2) * i;
          const boltX = Math.cos(boltAngle) * 12;
          const boltY = Math.sin(boltAngle) * 12;
          
          this.ctx.beginPath();
          this.ctx.arc(boltX, boltY, 2, 0, Math.PI * 2);
          this.ctx.fillStyle = '#444';
          this.ctx.fill();
        }
        break;
        
      case 'servo':
        // Servo motor with housing
        this.ctx.fillRect(-15, -10, 30, 20);
        this.ctx.strokeRect(-15, -10, 30, 20);
        
        // Servo horn - rotating based on animation
        this.ctx.save();
        this.ctx.rotate(Math.sin(part.animationPhase) * 0.5);
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        for (let i = 0; i < 5; i++) {
          const hornAngle = (Math.PI * 2 / 5) * i;
          this.ctx.lineTo(Math.cos(hornAngle) * 8, Math.sin(hornAngle) * 8);
          this.ctx.lineTo(Math.cos(hornAngle + 0.2) * 15, Math.sin(hornAngle + 0.2) * 15);
          this.ctx.lineTo(Math.cos(hornAngle + 0.4) * 8, Math.sin(hornAngle + 0.4) * 8);
        }
        this.ctx.closePath();
        this.ctx.fillStyle = '#aaa';
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.restore();
        
        // Mounting holes
        this.ctx.fillStyle = '#333';
        this.ctx.beginPath();
        this.ctx.arc(-10, -6, 1.5, 0, Math.PI * 2);
        this.ctx.arc(10, -6, 1.5, 0, Math.PI * 2);
        this.ctx.arc(-10, 6, 1.5, 0, Math.PI * 2);
        this.ctx.arc(10, 6, 1.5, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Wires
        this.ctx.beginPath();
        this.ctx.moveTo(-15, 5);
        this.ctx.lineTo(-25, 5);
        this.ctx.strokeStyle = '#f00';
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.moveTo(-15, 0);
        this.ctx.lineTo(-25, 0);
        this.ctx.strokeStyle = '#000';
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.moveTo(-15, -5);
        this.ctx.lineTo(-25, -5);
        this.ctx.strokeStyle = '#ff0';
        this.ctx.stroke();
        break;
        
      case 'sensor':
        // Ultrasonic or IR sensor housing
        this.ctx.fillRect(-20, -10, 40, 20);
        this.ctx.strokeRect(-20, -10, 40, 20);
        
        // Sensor "eyes"
        this.ctx.fillStyle = '#333';
        this.ctx.beginPath();
        this.ctx.arc(-10, 0, 6, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(10, 0, 6, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Sensor lenses with glow effect
        this.ctx.fillStyle = '#0a5';
        this.ctx.globalAlpha = 0.3 + Math.sin(part.animationPhase) * 0.2;
        this.ctx.beginPath();
        this.ctx.arc(-10, 0, 4, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(10, 0, 4, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.globalAlpha = part.opacity;
        
        // Connector pins
        this.ctx.fillStyle = '#aaa';
        for (let i = 0; i < 4; i++) {
          this.ctx.fillRect(-15 + i * 10, 10, 2, 5);
        }
        break;
        
      case 'arm':
        // Robotic arm segment with articulation point
        this.ctx.beginPath();
        this.ctx.moveTo(-25, -8);
        this.ctx.lineTo(25, -8);
        this.ctx.lineTo(25, 8);
        this.ctx.lineTo(-25, 8);
        this.ctx.closePath();
        this.ctx.fillStyle = '#999';
        this.ctx.fill();
        this.ctx.stroke();
        
        // Articulation/joint at one end
        this.ctx.beginPath();
        this.ctx.arc(-25, 0, 10, 0, Math.PI * 2);
        this.ctx.fillStyle = '#777';
        this.ctx.fill();
        this.ctx.stroke();
        
        // Inner pivot
        this.ctx.beginPath();
        this.ctx.arc(-25, 0, 5, 0, Math.PI * 2);
        this.ctx.fillStyle = '#555';
        this.ctx.fill();
        
        // Linear actuator
        const actuatorExtension = Math.sin(part.animationPhase) * 5;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -4);
        this.ctx.lineTo(20 + actuatorExtension, -4);
        this.ctx.lineTo(20 + actuatorExtension, 4);
        this.ctx.lineTo(0, 4);
        this.ctx.closePath();
        this.ctx.fillStyle = '#666';
        this.ctx.fill();
        this.ctx.stroke();
        break;
    }
    
    part.animationPhase += 0.02;
    this.ctx.restore();
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw circuits first (background layer)
    this.circuits.forEach(circuit => {
      this.drawCircuit(circuit);
    });
    
    // Draw components on top of circuits
    this.components.forEach(component => {
      this.drawComponent(component);
    });
    
    // Draw robotic parts
    this.robotParts.forEach(part => {
      this.drawRoboticPart(part);
    });
    
    // Draw gears last (foreground layer)
    this.gears.forEach(gear => {
      gear.rotation += gear.speed;
      this.drawGear(gear);
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log("Initializing enhanced technical background");
  new TechnicalBackground('technical-canvas');
});

// Also try immediate initialization if DOM is already loaded
if (document.readyState !== 'loading') {
  console.log("DOM already ready, initializing immediately");
  new TechnicalBackground('technical-canvas');
}