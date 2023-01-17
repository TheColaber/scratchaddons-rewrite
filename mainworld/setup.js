class SharedObserver {
    constructor() {
        this.inactive = true;
        this.pending = new Set();
        this.observer = new MutationObserver((mutation, observer) => {
            var _a, _b;
            for (const item of this.pending) {
                if (item.condition && !item.condition())
                    continue;
                for (const match of document.querySelectorAll(item.query)) {
                    if ((_a = item.seen) === null || _a === void 0 ? void 0 : _a.has(match))
                        continue;
                    if (item.elementCondition && !item.elementCondition(match))
                        continue;
                    (_b = item.seen) === null || _b === void 0 ? void 0 : _b.add(match);
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
    watch(opts) {
        if (this.inactive) {
            this.inactive = false;
            this.observer.observe(document.documentElement, {
                subtree: true,
                childList: true,
            });
        }
        return new Promise((resolve) => this.pending.add(Object.assign({ resolve }, opts)));
    }
}

window.scratchAddons = {
    console: Object.assign({}, console),
    events: new EventTarget(),
    redux: {},
    sharedObserver: new SharedObserver(),
};
