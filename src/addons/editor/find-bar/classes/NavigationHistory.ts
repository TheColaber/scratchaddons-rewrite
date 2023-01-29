// Make these global so that every addon uses the same arrays.
type pos = { left: number; top: number };
let views: pos[] = [];
let forward: pos[] = [];

export default class NavigationHistory {
  Blockly: any;
  constructor(Blockly: any) {
    this.Blockly = Blockly;
  }
  /**
   * Keep a record of the scroll and zoom position
   */
  storeView(next: pos, dist: number) {
    forward = [];
    const workspace = this.Blockly.getMainWorkspace();
    const metrics = workspace.getMetrics();

    let pos = { left: metrics.viewLeft, top: metrics.viewTop };
    if (!next || this.distance(pos, next) > dist) {
      views.push(pos);
    }
  }

  distance(pos: pos, next: pos) {
    return Math.sqrt(
      Math.pow(pos.left - next.left, 2) + Math.pow(pos.top - next.top, 2)
    );
  }

  peek() {
    return views.length > 0 ? views[views.length - 1] : null;
  }

  goBack() {
    const workspace = this.Blockly.getMainWorkspace(),
      s = workspace.getMetrics();

    let pos = { left: s.viewLeft, top: s.viewTop };
    let view = this.peek();
    if (!view) {
      return;
    }
    if (this.distance(pos, view) < 64) {
      // Go back to current if we are already far away from it
      if (views.length > 1) {
        views.pop();
        forward.push(view);
      }
    }

    view = this.peek();
    if (!view) {
      return;
    }

    let sx = view.left - s.contentLeft,
      sy = view.top - s.contentTop;

    // transform.setTranslate(-600,0);

    workspace.scrollbar.set(sx, sy);

    /*
              let blocklySvg = document.getElementsByClassName('blocklySvg')[0];
              let blocklyBlockCanvas = blocklySvg.getElementsByClassName('blocklyBlockCanvas')[0];
              let transform = blocklyBlockCanvas.transform.baseVal.getItem(0);
              let scale = blocklyBlockCanvas.transform.baseVal.getItem(1);
              let transformMatrix = transform.matrix;
              let scaleMatrix = scale.matrix;
              console.log('Transform - getMetrics', s);
              console.log('sx, sy: ', sx, sy);
              console.log('left, top: ', view.left, view.top);
              console.log('contentLeft, right:', s.contentLeft, s.contentTop);
              console.log('transform, scale matrix: ', transformMatrix, scaleMatrix);
  */
  }

  goForward() {
    let view = forward.pop();
    if (!view) {
      return;
    }
    views.push(view);

    let workspace = this.Blockly.getMainWorkspace();
    const metrics = workspace.getMetrics();

    let sx = view.left - metrics.contentLeft,
      sy = view.top - metrics.contentTop;

    workspace.scrollbar.set(sx, sy);
  }
}
