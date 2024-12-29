import { getQueryParams, addQueryParams } from "./addQueryParams";

describe("getQueryParams", () => {
  let originalLocationSearch: string;

  beforeEach(() => {
    originalLocationSearch = window.location.search;
  });

  afterEach(() => {
    Object.defineProperty(window, "location", {
      value: {
        search: originalLocationSearch,
      },
      writable: true,
    });
  });

  it("should add query params to an empty location.search", () => {
    Object.defineProperty(window, "location", {
      value: {
        search: "",
      },
      writable: true,
    });

    const result = getQueryParams({ name: "John", age: "30" });
    expect(result).toBe("?name=John&age=30");
  });

  it("should update existing query params in location.search", () => {
    Object.defineProperty(window, "location", {
      value: {
        search: "?name=Jane&city=NY",
      },
      writable: true,
    });

    const result = getQueryParams({ name: "John", city: "LA" });
    expect(result).toBe("?name=John&city=LA");
  });

  it("should ignore undefined query params", () => {
    Object.defineProperty(window, "location", {
      value: {
        search: "",
      },
      writable: true,
    });

    const result = getQueryParams({ name: "John", age: undefined });
    expect(result).toBe("?name=John");
  });
});

describe("addQueryParams", () => {
  let originalLocationSearch: string;
  let pushStateMock: jest.SpyInstance;

  beforeEach(() => {
    originalLocationSearch = window.location.search;

    pushStateMock = jest.spyOn(window.history, "pushState").mockImplementation();
  });

  afterEach(() => {
    pushStateMock.mockRestore();
    Object.defineProperty(window, "location", {
      value: {
        search: originalLocationSearch,
      },
      writable: true,
    });
  });

  it("should push new query params to the history", () => {
    Object.defineProperty(window, "location", {
      value: {
        search: "?name=Jane",
      },
      writable: true,
    });

    addQueryParams({ age: "30", name: "John" });
    expect(pushStateMock).toHaveBeenCalledWith(null, "", "?name=John&age=30");
  });

  it("should push empty params to the history", () => {
    Object.defineProperty(window, "location", {
      value: {
        search: "",
      },
      writable: true,
    });

    addQueryParams({});
    expect(pushStateMock).toHaveBeenCalledWith(null, "", "?");
  });

  it("should ignore undefined params and push valid ones", () => {
    Object.defineProperty(window, "location", {
      value: {
        search: "",
      },
      writable: true,
    });

    addQueryParams({ name: "John", age: undefined });
    expect(pushStateMock).toHaveBeenCalledWith(null, "", "?name=John");
  });
});
