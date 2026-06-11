// ===============================
// HISTORY ENGINE (PRO)
// ===============================

window.historyStack = [];
window.redoStack = [];

function saveHistory() {

    if (!canvas) return;

    const json = canvas.toJSON();

    historyStack.push(json);

    // limit memory
    if (historyStack.length > 30) {
        historyStack.shift();
    }

    // clear redo on new action
    redoStack = [];
}

window.undo = function () {

    if (historyStack.length === 0) return;

    const current = canvas.toJSON();
    redoStack.push(current);

    const prev = historyStack.pop();

    canvas.loadFromJSON(prev, function () {
        canvas.renderAll();
    });
};

window.redo = function () {

    if (redoStack.length === 0) return;

    const state = redoStack.pop();

    historyStack.push(canvas.toJSON());

    canvas.loadFromJSON(state, function () {
        canvas.renderAll();
    });
};
