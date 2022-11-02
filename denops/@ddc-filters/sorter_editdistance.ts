import { BaseFilter, Item } from "../@editdistance/deps.ts";
import { editDistance } from "../@editdistance//editDistance.ts";

type item = {
  candidate: Item;
  ed: number;
};

export class Filter extends BaseFilter<Record<never, never>> {
  filter(args: {
    completeStr: string;
    items: Item[];
  }): Promise<Item[]> {
    if (!args.completeStr) {
      return Promise.resolve(args.items);
    }
    const items: item[] = args.items.map((c) => {
      return { candidate: c, ed: editDistance(c.word, args.completeStr) };
    });
    items.sort((a, b) => a.ed - b.ed);
    return Promise.resolve(items.map((i) => i.candidate));
  }
  params() {
    return {};
  }
}
