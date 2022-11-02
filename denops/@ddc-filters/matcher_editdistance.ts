import { BaseFilter, Item } from "../@editdistance/deps.ts";
import { editDistance } from "../@editdistance/editDistance.ts";

type Params = {
  limit: number;
  showScore: boolean;
  diffLen: number;
};

type item = {
  candidate: Item;
  ed: number;
};

export class Filter extends BaseFilter<Params> {
  filter(args: {
    filterParams: Params;
    completeStr: string;
    items: Item[];
  }): Promise<Item[]> {
    if (!args.completeStr) {
      return Promise.resolve(args.items);
    }
    const params = args.filterParams as Params;
    let items: item[] = args.items.filter((c) =>
      c.word.length >= args.completeStr.length + params.diffLen &&
      c.word.startsWith(args.completeStr[0])
    ).map((c) => ({
      candidate: c,
      ed: editDistance(c.word, args.completeStr),
    }));

    items = items.filter((i) => i.ed <= params.limit)
      .sort((a, b) => a.ed - b.ed);
    return Promise.resolve(items.map((i) => {
      if (params.showScore) {
        i.candidate.menu = i.ed.toString();
      }
      return i.candidate;
    }));
  }

  params(): Params {
    return {
      limit: 3,
      showScore: false,
      diffLen: -1,
    };
  }
}
