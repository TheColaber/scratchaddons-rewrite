export default class SharedObserver {
  inactive: boolean;
  pending: Set<any>;
  observer: MutationObserver;
  constructor() {
    this.inactive = true;
    this.pending = new Set();
    this.observer = new MutationObserver((mutation, observer) => {
      for (const item of this.pending) {
        if (item.condition && !item.condition()) continue;
        for (const match of document.querySelectorAll(item.query)) {
          if (item.seen?.has(match)) continue;
          if (item.elementCondition && !item.elementCondition(match)) continue;
          item.seen?.add(match);
          this.pending.delete(item);
          item.resolve(match);
          break;
        }
      }
      if (this.pending.size === 0) {
        this.inactive = true;
        this.observer.disconnect();
      }
    });
  }

  /**
   * Watches an element.
   * @param {object} opts - options
   * @param {string} opts.query - query.
   * @param {WeakSet=} opts.seen - a WeakSet that tracks whether an element has already been seen.
   * @param {function=} opts.condition - a function that returns whether to resolve the selector or not.
   * @param {function=} opts.elementCondition - A function that returns whether to resolve the selector or not, given an element.
   * @returns {Promise<Node>} Promise that is resolved with modified element.
   */
  watch(opts: any): Promise<Element> {
    if (this.inactive) {
      this.inactive = false;
      this.observer.observe(document.documentElement, {
        subtree: true,
        childList: true,
      });
    }
    return new Promise((resolve) =>
      this.pending.add({
        resolve,
        ...opts,
      })
    );
  }
}
