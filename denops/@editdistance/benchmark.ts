import { Item } from "./deps.ts";
import { filterWrapper } from "./test.ts";

function gatherCandidates(
  dicts: string[],
): Item[] {
  return dicts.map((dict) => Deno.readTextFileSync(dict).split("\n"))
    .flatMap((texts) => texts)
    .map((word) => ({ word }));
}

const candidates = gatherCandidates(["/usr/share/dict/words"]);
console.log(`number of candidates: ${candidates.length}`);
Deno.bench({
  name: "filterLargeCandidates",
  // runs: 10,
  fn: () => {
    filterWrapper("e", candidates, 2);
  },
});
