import {
  BaseFilter,
  Candidate,
  Context,
  DdcOptions,
  FilterOptions,
  SourceOptions,
} from "./deps.ts";
import { Denops } from "./deps.ts";
import { editDistance } from "./editDistance.ts";

// type Params = {
//   limit: number;
// };
type item = {
  candidate: Candidate;
  ed: number;
};

export class Filter extends BaseFilter {
  filter(
    _denops: Denops,
    _context: Context,
    _options: DdcOptions,
    _sourceOptions: SourceOptions,
    _filterOptions: FilterOptions,
    _filterParams: Record<string, unknown>,
    completeStr: string,
    candidates: Candidate[],
  ): Promise<Candidate[]> {
    if (!completeStr) {
      return Promise.resolve(candidates);
    }
    let items: item[] = candidates.map((c) => {
      return { candidate: c, ed: editDistance(c.word, completeStr) };
    });
    items.sort((a, b) => a.ed - b.ed);
    return Promise.resolve(items.map((i) => {
      i.candidate.abbr = i.candidate.word + i.ed.toString();
      return i.candidate;
    }));
  }

  // params(): Record<string, unknown> {
  //   const params: Params = {
  //     limit: 5,
  //   };
  //   return params as unknown as Record<string, unknown>;
  // }
}
