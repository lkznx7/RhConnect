import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button component", () => {
  it("renders children text", () => {
    render(<Button>Salvar</Button>);
    expect(screen.getByRole("button", { name: /salvar/i })).toBeInTheDocument();
  });

  it("applies default variant class", () => {
    render(<Button>Teste</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-slot", "button");
  });

  it("is disabled when disabled prop is set", () => {
    render(<Button disabled>Bloqueado</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls onClick handler", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clique</Button>);
    screen.getByRole("button").click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
