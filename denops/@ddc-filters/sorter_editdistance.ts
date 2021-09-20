import {
  BaseFilter,
  Candidate,
} from "../@editdistance/deps.ts";
import { editDistance } from "../@editdistance//editDistance.ts";

type item = {
  candidate: Candidate;
  ed: number;
};

export class Filter extends BaseFilter {
  filter(args: {
    completeStr: string;
    candidates: Candidate[];
  }): Promise<Candidate[]> {
    if (!args.completeStr) {
      return Promise.resolve(args.candidates);
    }
    let items: item[] = args.candidates.map((c) => {
      return { candidate: c, ed: editDistance(c.word, args.completeStr) };
    });
    items.sort((a, b) => a.ed - b.ed);
    return Promise.resolve(items.map((i) => i.candidate));
  }
}
