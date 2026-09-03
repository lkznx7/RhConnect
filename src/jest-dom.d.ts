import type { TestingLibraryMatchers } from "@testing-library/jest-dom/types/matchers";

declare module "expect" {
  interface Matchers<R extends void | Promise<void>>
    extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}
}
