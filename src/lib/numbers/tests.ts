import { calculateDigitalCode } from "../../services/calculationService";

export function runBaselineTests() {
  const fixtures = [
    {
      date: "1989-02-01",
      expected: { soul: 1, path: 3, direction: 4, result: 8 }
    },
    {
      date: "2005-02-11",
      expected: { soul: 2, path: 2, direction: 4, result: 8 }
    },
    {
      date: "1989-12-18",
      expected: { soul: 9, path: 3, direction: 3, result: 6 }
    }
  ];

  let allPassed = true;
  console.log("--- RUNNING BASELINE V1 TESTS ---");

  fixtures.forEach((fixture, index) => {
    const report = calculateDigitalCode({ dateOfBirth: fixture.date });
    const { soul, path, direction, result } = report.numbers;

    const passed = 
      soul.reduced === fixture.expected.soul &&
      path.reduced === fixture.expected.path &&
      direction.reduced === fixture.expected.direction &&
      result.reduced === fixture.expected.result;

    if (!passed) {
      console.error(`[FAIL] Test ${index + 1} for ${fixture.date}`);
      console.error(`  Expected:`, fixture.expected);
      console.error(`  Got:`, { soul: soul.reduced, path: path.reduced, direction: direction.reduced, result: result.reduced });
      allPassed = false;
    } else {
      console.log(`[PASS] Test ${index + 1} for ${fixture.date} -> ${soul.reduced} / ${path.reduced} / ${direction.reduced} / ${result.reduced}`);
    }
  });

  console.log("---------------------------------");
  if (allPassed) {
    console.log("✅ All baseline fixtures passed.");
  } else {
    console.error("❌ Some baseline fixtures failed.");
  }

  return allPassed;
}

// Auto-run if executed directly via tsx
if (typeof require !== 'undefined' && require.main === module) {
  const success = runBaselineTests();
  process.exit(success ? 0 : 1);
}
