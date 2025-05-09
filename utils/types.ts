export interface TestCase {
    name: string;
    description: string;
    run: () => Promise<void>;
  }