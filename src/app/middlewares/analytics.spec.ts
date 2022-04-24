import { analytics } from "./analytics";

const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };
  const next = jest.fn();

  const invoke = (action: any) => analytics(store)(next)(action);

  return { store, next, invoke };
};

describe("analytics middleware", () => {
  it("should call next middleware", () => {
    const { next, invoke } = create();
    const action = { type: "TEST" };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it("should call next if action meta does not have analytics", () => {
    const { next, invoke } = create();
    const action = { type: "TEST", meta: {} };
    invoke(action);
    expect(next).toHaveBeenCalled();
  });

  it("should dispatch an analytics event when action meta has analytics", () => {
    const { store, invoke } = create();
    const action = {
      type: "TEST",
      meta: { analytics: { category: "TEST" } },
    };
    invoke(action);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "A-EVENT",
      payload: { category: "TEST", action: "TEST" },
    });
  });
});
