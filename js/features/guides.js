// ===============================
// RULER + GUIDE SYSTEM
// ===============================

window.showGuides = true;

const guideLines = [];

// vertical center guide
guideLines.push(
    new fabric.Line([400, 0, 400, 2000], {
        stroke: "rgba(0,150,255,0.5)",
        selectable: false,
        evented: false
    })
);

// horizontal center guide
guideLines.push(
    new fabric.Line([0, 250, 2000, 250], {
        stroke: "rgba(0,150,255,0.5)",
        selectable: false,
        evented: false
    })
);

guideLines.forEach(line => canvas.add(line));
