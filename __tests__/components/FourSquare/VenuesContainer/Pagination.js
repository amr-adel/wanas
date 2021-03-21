import { render, act } from "../../../../test-utils/test-utils";
import userEvent from "@testing-library/user-event";
import Pagination from "../../../../components/FourSquare/VenuesContainer/Pagination";
import { useStore } from "../../../../hooks/useStore";

// Initial store values
// limit = 15
// offset = 0
const initialStoreState = useStore.getState();
const set = useStore.getState().set;

describe("<Pagination />", () => {
  let total;

  beforeEach(() => {
    total = 25;
  });

  afterEach(() => {
    useStore.setState(initialStoreState, true);
  });

  it('should be rendered only if total results are more than venues/page "limit".', () => {
    const { rerender, queryByText, getByText } = render(
      <Pagination total={total} />
    );
    expect(getByText(total)).toBeVisible(total);

    act(() => {
      total = 10;
    });

    expect(queryByText(total)).toBeNull();
  });

  it('should render "next" button and be disabled if "offset" + "limit" >= "total".', () => {
    const { getAllByRole } = render(<Pagination total={total} />);

    const nextButton = getAllByRole("button").filter(
      (btn) => btn.id === "next"
    )[0];

    expect(nextButton).toBeVisible();

    act(() =>
      set((state) => {
        state.fourSquare.reqParams.offset = 15;
      })
    );

    // "offset" + "limit" > "total"
    expect(nextButton).toBeDisabled();

    act(() =>
      set((state) => {
        state.fourSquare.reqParams.offset = 10;
      })
    );

    // "offset" + "limit" = "total"
    expect(nextButton).toBeDisabled();
  });

  it('should render "prev" button and be disabled if "offset" = 0.', () => {
    const { getAllByRole } = render(<Pagination total={total} />);

    const prevButton = getAllByRole("button").filter(
      (btn) => btn.id === "prev"
    )[0];

    expect(prevButton).toBeVisible();

    // "offset" is initially "0"
    expect(prevButton).toBeDisabled();

    act(() =>
      set((state) => {
        state.fourSquare.reqParams.offset = 15;
      })
    );

    expect(prevButton).not.toBeDisabled();
  });

  it('should increment "offset" by "limit" at store on "next" button click.', () => {
    const { getAllByRole } = render(<Pagination total={total} />);

    const nextButton = getAllByRole("button").filter(
      (btn) => btn.id === "next"
    )[0];

    userEvent.click(nextButton);

    const { offset, limit } = useStore.getState().fourSquare.reqParams;

    expect(offset).toBe(limit);
  });

  it('should decrement "offset" by "limit" at store on "prev" button click.', () => {
    const startOffset = 15;

    set((state) => {
      state.fourSquare.reqParams.offset = startOffset;
    });

    const { getAllByRole } = render(<Pagination total={total} />);

    const prevButton = getAllByRole("button").filter(
      (btn) => btn.id === "prev"
    )[0];

    userEvent.click(prevButton);

    const { offset, limit } = useStore.getState().fourSquare.reqParams;

    expect(offset).toBe(startOffset - limit);
  });
});
