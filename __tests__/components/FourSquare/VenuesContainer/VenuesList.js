import { render } from "../../../../test-utils/test-utils";
import { venuesProp } from "../../../../test-utils/data_foursquare_response";
import VenuesList from "../../../../components/FourSquare/VenuesContainer/VenuesList";
import Pagination from "../../../../components/FourSquare/VenuesContainer/Pagination";
import VenueCard from "../../../../components/FourSquare/VenuesContainer/VenueCard";
import { useStore } from "../../../../hooks/useStore";

const initialStoreState = useStore.getState();

// https://prog.world/checking-children-passed-to-a-mock-react-component/
jest.mock(
  "../../../../components/FourSquare/VenuesContainer/Pagination",
  () => {
    return jest.fn(() => <div />);
  }
);

jest.mock("../../../../components/FourSquare/VenuesContainer/VenueCard", () => {
  return jest.fn(({ venue }) => <div venue={venue} />);
});

describe("<VenuesList />", () => {
  let expectedProps;

  beforeEach(() => {
    expectedProps = {
      venues: venuesProp,
      total: null,
      clearRecent: null,
    };
  });

  afterEach(() => {
    useStore.setState(initialStoreState, true);
    jest.clearAllMocks();
  });

  it("Should render FourSquare attribution", () => {
    const { getByText } = render(<VenuesList {...expectedProps} />);

    const attr = getByText(/data by/i);
    expect(attr).toBeVisible();
  });

  it("Should pass updated 'total' to <Pagination />", () => {
    const { rerender } = render(<VenuesList {...expectedProps} />);

    expect(Pagination).lastCalledWith({ total: expectedProps.total }, {});

    expectedProps.total = 8;
    rerender(<VenuesList {...expectedProps} />);

    expect(Pagination).lastCalledWith({ total: 8 }, {});
  });

  it("Should NOT render <VenueCard /> if venues prop is an empty array.", () => {
    expectedProps.venues = [];
    render(<VenuesList {...expectedProps} />);

    expect(VenueCard).toHaveBeenCalledTimes(0);
  });

  it("Should render 'venues' into a list of <VenueCard />", () => {
    render(<VenuesList {...expectedProps} />);

    // venuesProp in DATA_FOR_TESTING is an arrary with '2' objects
    expect(VenueCard).toHaveBeenCalledTimes(2);
  });

  it("Should render <VenueCard /> with the venue prop", () => {
    render(<VenuesList {...expectedProps} />);

    expect(VenueCard).lastCalledWith(
      expect.objectContaining({ venue: venuesProp[1] }),
      {}
    );
  });

  it("Should update 'markers' on store", () => {
    // Should be initially []
    let markers = useStore.getState().mapBox.markers;
    expect(markers.length).toBe(0);

    render(<VenuesList {...expectedProps} />);

    markers = useStore.getState().mapBox.markers;
    expect(markers.length).toBe(2);

    const {
      id,
      name,
      location: { lat, lng },
    } = venuesProp[0].venue;

    expect(markers[0]).toStrictEqual({
      id,
      name,
      lat,
      lng,
    });
  });
});
