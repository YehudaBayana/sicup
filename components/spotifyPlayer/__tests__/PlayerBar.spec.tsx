import { render } from "@testing-library/react";
import { useSpotifyPlayer } from "../../../lib/spotify-player-context";
import PlayerBar from "../PlayerBar";

jest.mock("../../../lib/spotify-player-context");

describe("PlayerBar", () => {
  const mockContext = {
    currentTrack: { name: "Test Track", artists: [{ name: "Test Artist" }] },
    isPaused: true,
    position: 30,
    duration: 120,
    handleResume: jest.fn(),
    handlePause: jest.fn(),
    handleNext: jest.fn(),
    handlePrevious: jest.fn(),
    handleSliderChange: jest.fn(),
    handlePlay: jest.fn(),
  };

  beforeEach(() => {
    (useSpotifyPlayer as jest.Mock).mockReturnValue(mockContext);
  });

  it("renders PlayerBar with all components", () => {
    const { getByText } = render(<PlayerBar />);
    expect(getByText("Test Track")).toBeInTheDocument();
    expect(getByText("Test Artist")).toBeInTheDocument();
  });

  it("passes correct props to TimeSlider", () => {
    const { getByRole } = render(<PlayerBar />);
    const slider = getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuenow", "30");
    expect(slider).toHaveAttribute("aria-valuemax", "120");
  });

  it("calls handleNext when next button is clicked", () => {
    const { getByRole } = render(<PlayerBar />);
    const nextButton = getByRole("button", { name: /skip next/i });
    nextButton.click();
    expect(mockContext.handleNext).toHaveBeenCalled();
  });
});
