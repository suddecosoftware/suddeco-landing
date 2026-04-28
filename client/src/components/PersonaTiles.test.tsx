import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import PersonaTiles from "./PersonaTiles";
import { setAudience } from "@/lib/audience-cookie";
import { trackPersonaChosen } from "@/lib/persona-analytics";

vi.mock("@/lib/audience-cookie", () => ({
  setAudience: vi.fn(),
}));

vi.mock("@/lib/persona-analytics", () => ({
  trackPersonaChosen: vi.fn(),
}));

const mockedSetAudience = vi.mocked(setAudience);
const mockedTrackPersonaChosen = vi.mocked(trackPersonaChosen);

describe("PersonaTiles", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders both audience choices", () => {
    render(<PersonaTiles navigate={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Choose homeowner or property developer path" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Choose contractor or professional path" })).toBeInTheDocument();
    expect(screen.getByText("I'm planning a home project")).toBeInTheDocument();
    expect(screen.getByText("I'm a professional")).toBeInTheDocument();
  });

  it("sets homeowner audience and navigates to the marketplace", async () => {
    const user = userEvent.setup();
    const navigate = vi.fn();
    render(<PersonaTiles navigate={navigate} />);

    await user.click(screen.getByRole("button", { name: "Choose homeowner or property developer path" }));

    expect(mockedSetAudience).toHaveBeenCalledWith("homeowner");
    expect(mockedTrackPersonaChosen).toHaveBeenCalledWith("homeowner");
    expect(navigate).toHaveBeenCalledWith("https://suddecohomes.com/?source=landing&audience=homeowner");
  });

  it("sets contractor audience and navigates to registration", async () => {
    const user = userEvent.setup();
    const navigate = vi.fn();
    render(<PersonaTiles navigate={navigate} />);

    await user.click(screen.getByRole("button", { name: "Choose contractor or professional path" }));

    expect(mockedSetAudience).toHaveBeenCalledWith("contractor");
    expect(mockedTrackPersonaChosen).toHaveBeenCalledWith("contractor");
    expect(navigate).toHaveBeenCalledWith("https://my.suddeco.com/register?audience=contractor&source=landing");
  });

  it("supports keyboard activation on focused tiles", async () => {
    const user = userEvent.setup();
    const navigate = vi.fn();
    render(<PersonaTiles navigate={navigate} />);

    const contractorTile = screen.getByRole("button", { name: "Choose contractor or professional path" });
    contractorTile.focus();
    await user.keyboard("{Enter}");

    expect(mockedSetAudience).toHaveBeenCalledWith("contractor");
    expect(navigate).toHaveBeenCalledWith("https://my.suddeco.com/register?audience=contractor&source=landing");
  });
});
