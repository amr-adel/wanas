import { render } from "../../../../test-utils/test-utils";
import { venueProp } from "../../../../test-utils/data_foursquare_response";
import userEvent from "@testing-library/user-event";
import VenueCard from "../../../../components/FourSquare/VenuesContainer/VenueCard";
import { useStore } from "../../../../hooks/useStore";

const initialStoreState = useStore.getState();

describe("VenueCard", () => {
  let expectedProps;

  beforeEach(() => {
    expectedProps = {
      venue: venueProp,
      clearRecent: jest.fn(),
    };
  });

  afterEach(() => {
    useStore.setState(initialStoreState, true);
  });

  it("Should render name, category, address, delete button.", () => {
    const { getByText, queryByRole } = render(<VenueCard {...expectedProps} />);

    const {
      name,
      categories,
      location: { formattedAddress },
    } = expectedProps.venue.venue;

    const venueName = getByText(name);
    const category = getByText(categories[0].name);
    const address1st = getByText(formattedAddress[0]);
    const address2nd = getByText(formattedAddress[0]);
    const clear = queryByRole("button");

    expect(venueName).toBeVisible();
    expect(category).toBeVisible();
    expect(address1st).toBeVisible();
    expect(address2nd).toBeVisible();
    expect(clear).toBeVisible();
  });

  it("Should NOT render category if venue doesn't have one.", () => {
    expectedProps.venue.venue.categories = [];

    const { queryByText } = render(<VenueCard {...expectedProps} />);
    const venueCategory = queryByText("Café");

    expect(venueCategory).not.toBeInTheDocument();
  });

  it("Should NOT render delete button if 'clearRecent' prop doesn't exist.", () => {
    expectedProps.clearRecent = null;

    const { queryByRole } = render(<VenueCard {...expectedProps} />);
    const deleteButton = queryByRole("button");

    expect(deleteButton).not.toBeInTheDocument();
  });

  it("Should call clearRecent() with venue id on delete button click.", () => {
    const { getByText } = render(<VenueCard {...expectedProps} />);

    const deleteButton = getByText("Delete");

    userEvent.click(deleteButton);

    expect(expectedProps.clearRecent).toBeCalledWith(
      expectedProps.venue.venue.id
    );
  });

  it("Should update store 'popUp' with card id, name, and coords onMouseEnter.", () => {
    const card = render(<VenueCard {...expectedProps} />).getByTestId(
      "VenueCard"
    );

    const {
      id,
      name,
      location: { lat, lng },
    } = expectedProps.venue.venue;

    // Should be initially "null"
    expect(useStore.getState().mapBox.popUp).toBe(null);

    userEvent.hover(card);
    expect(useStore.getState().mapBox.popUp).toStrictEqual({
      id,
      name,
      lat,
      lng,
    });
  });
});
