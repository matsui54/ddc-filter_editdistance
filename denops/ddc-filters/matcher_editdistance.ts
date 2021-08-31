import { BaseFilter, Candidate } from "../editdistance/deps.ts";
import { editDistance } from "../editdistance/editDistance.ts";

type Params = {
  limit: number;
  showScore: boolean;
  diffLen: number;
};

type item = {
  candidate: Candidate;
  ed: number;
};

export class Filter extends BaseFilter {
  filter(args: {
    filterParams: Record<string, unknown>;
    completeStr: string;
    candidates: Candidate[];
  }): Promise<Candidate[]> {
    if (!args.completeStr) {
      return Promise.resolve(args.candidates);
    }
    const params = args.filterParams as Params;
    let items: item[] = args.candidates.filter((c) =>
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

  params(): Record<string, unknown> {
    const params: Params = {
      limit: 3,
      showScore: false,
      diffLen: -1,
    };
    return params as unknown as Record<string, unknown>;
  }
}
