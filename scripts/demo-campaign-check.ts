import assert from "node:assert/strict";
import { getDemoCampaign } from "../client/src/lib/demoCampaign";

// Product-page links must keep their campaign identity when registered.
for (const source of ["takeoff-software", "construction-estimating-software"]) {
  for (const placement of ["hero", "bottom"]) {
    assert.deepEqual(getDemoCampaign(`?utm_source=${source}&utm_medium=website&utm_campaign=always_on&utm_content=${placement}`), {
      utm_source: source, utm_campaign: "always_on", utm_content: placement,
    });
  }
}
// Unrelated query data must not enter the registration record.
assert.deepEqual(getDemoCampaign("?email=private%40example.com&token=secret&redirect=https%3A%2F%2Fexample.com"), {});
assert.deepEqual(getDemoCampaign("?utm_source=%20%20&utm_campaign=&utm_content=%20quote%20comparison%20"), { utm_content: "quote comparison" });
assert.equal(getDemoCampaign(`?utm_source=${"x".repeat(500)}`).utm_source.length, 128);
assert.deepEqual(getDemoCampaign(""), {});
console.log("Demo campaign checks passed: four product CTAs, query allowlist, blanks, encoding and size bound.");
