import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

describe("Card components", () => {
  it("renders Card with content", () => {
    render(
      <Card data-testid="card">
        <CardContent>Dados</CardContent>
      </Card>,
    );
    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByText("Dados")).toBeInTheDocument();
  });

  it("renders CardHeader with title and description", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Resumo</CardTitle>
          <CardDescription>Descricao do card</CardDescription>
        </CardHeader>
      </Card>,
    );
    expect(screen.getByText("Resumo")).toBeInTheDocument();
    expect(screen.getByText("Descricao do card")).toBeInTheDocument();
  });

  it("renders CardFooter", () => {
    render(
      <Card>
        <CardFooter>Acoes</CardFooter>
      </Card>,
    );
    expect(screen.getByText("Acoes")).toBeInTheDocument();
  });
});
