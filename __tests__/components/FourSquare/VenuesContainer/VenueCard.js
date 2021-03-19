import { render } from "../../../../test-utils";
import userEvent from "@testing-library/user-event";

import { useStore } from "../../../../hooks/useStore";
import VenueCard from "../../../../components/FourSquare/VenuesContainer/VenueCard";

const initialStoreState = useStore.getState();

describe("VenueCard", () => {
  let expectedProps;

  beforeEach(() => {
    expectedProps = {
      venue: venueProp,
      clearRecent: jest.fn(),
    };

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

// Dummy venue prop
const venueProp = {
  venue: {
    id: "4acf1528f964a52063d220e3",
    name: "Pavilion Cafe",
    location: {
      lat: 51.5334213383445,
      lng: -0.04288361806302629,
      formattedAddress: [
        "Victoria Park (Crown Gate W)",
        "Bow",
        "Greater London",
        "E9 7DE",
        "United Kingdom",
      ],
    },
    categories: [
      {
        id: "4bf58dd8d48988d16d941735",
        name: "Café",
        pluralName: "Cafés",
        shortName: "Café",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/food/cafe_",
          suffix: ".png",
        },
        primary: true,
      },
    ],
  },
};
