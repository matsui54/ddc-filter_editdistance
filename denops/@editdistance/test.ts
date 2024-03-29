import { assertEquals, Item } from "./deps.ts";
import { Filter } from "../@ddc-filters/matcher_editdistance.ts";
import { editDistance } from "./editDistance.ts";

export function filterWrapper(
  complete_str: string,
  candidates: Item[],
  limit: number,
  diffLen = -1,
): Promise<Item[]> {
  const filter = new Filter();
  return filter.filter({
    filterParams: { "limit": limit, "showScore": true, "diffLen": diffLen },
    completeStr: complete_str,
    items: candidates,
  });
}

Deno.test("calculate edit distance", () => {
  assertEquals(editDistance("b", "a"), 1);
  assertEquals(editDistance("a", "a"), 0);
  assertEquals(
    editDistance("lvqdyoqykfdbxnqdquhy", "djaeebzqmtblcabwgmscr"),
    20,
  );
  assertEquals(
    editDistance(
      "tqibygdzcxkujvwghwbmjjmbpksnzkgz",
      "giluiggpkzwhaetclrcyxcsixsutjmrmvqlybs",
    ),
    34,
  );
});

Deno.test("filter", async () => {
  const testCandidates = [
    { "word": "foobar" },
    { "word": "fooBar" },
    { "word": "Foobar" },
    { "word": "FooBar" },
  ];
  assertEquals(await filterWrapper("Fiobsr", testCandidates, 3), [{
    word: "Foobar",
    menu: "2",
  }, { word: "FooBar", menu: "3" }]);
});
