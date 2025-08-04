import "@testing-library/jest-dom";

// setupTests.ts
class IntersectionObserverMock {
	constructor() {}
	observe() {}
	disconnect() {}
	unobserve() {}
	takeRecords() { return []; }
}

Object.defineProperty(global, "IntersectionObserver", {
	writable: true,
	configurable: true,
	value: IntersectionObserverMock,
});
