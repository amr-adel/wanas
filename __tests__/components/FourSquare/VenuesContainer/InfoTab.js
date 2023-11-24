import { render, act } from "../../../../test-utils/test-utils";
import InfoTab from "../../../../components/FourSquare/VenuesContainer/InfoTab";
import { useStore } from "../../../../hooks/useStore";

const initialStoreState = useStore.getState();
const set = useStore.getState().set;

describe("VenueCard", () => {
  afterEach(() => {
    act(() => {
      useStore.setState(initialStoreState, true);
    });
  });

  it("should render 'start' message if total doesn't exist.", () => {
    const { getByText } = render(<InfoTab />);

    const infoMsg = getByText(/Start by selecting/i);

    expect(infoMsg).toBeVisible();
  });

  it("should render 'zero' message if total venues is '0'.", () => {
    const { getByText } = render(<InfoTab total={0} />);

    const infoMsg = getByText(/No place match/i);

    expect(infoMsg).toBeVisible();
  });

  it("should render 'total' when total prop >= 1.", () => {
    const total = 20;
    const { getByText } = render(<InfoTab total={total} />);

    const infoMsg = getByText(total);
    const unit = getByText(/Venue/i);

    expect(infoMsg).toBeVisible();
    expect(unit).toBeVisible();
  });

  it("should render 'nearLabel' only when a city/region is selected.", () => {
    const total = 20;
    const { queryByText, getByText } = render(<InfoTab total={total} />);

    let near = queryByText(/near/i);
    expect(near).toBe(null);

    act(() => {
      set((state) => {
        state.fourSquare.nearLabels = { en: "Cairo" };
      });
    });

    near = getByText(/near/i);
    const label = getByText(/cairo/i);

    expect(near).toBeVisible();
    expect(label).toBeVisible();
  });

  it("should fallback to 'near' when label doesn't exist in the current locale.", () => {
    const total = 20;

    set((state) => {
      state.fourSquare.reqParams.near = "Cairo, eg";
    });

    const { getByText } = render(<InfoTab total={total} />);

    const near = getByText(/cairo/i);

    expect(near).toBeVisible();
  });

  it("should render 'section' only when it isn't 'all'.", () => {
    const total = 20;
    const { queryByText, getByText } = render(<InfoTab total={total} />);

    let section = queryByText(/all/i);
    expect(section).toBe(null);

    act(() => {
      set((state) => {
        state.fourSquare.reqParams.section = "arts";
      });
    });

    section = getByText(/arts/i);
    const ctx = getByText(/related/i);

    expect(section).toBeVisible();
    expect(ctx).toBeVisible();
  });
});
