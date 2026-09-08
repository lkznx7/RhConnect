import { cn } from "@/lib/utils";

describe("cn utility", () => {
  it("merges class names", () => {
    const result = cn("text-red-500", "text-blue-500");
    expect(result).toBe("text-blue-500");
  });

  it("handles conditional classes", () => {
    const result = cn("base", false && "hidden", "extra");
    expect(result).toContain("base");
    expect(result).not.toContain("hidden");
    expect(result).toContain("extra");
  });

  it("returns empty string for no args", () => {
    expect(cn()).toBe("");
  });
});
