import {
  BaseFilter,
  Candidate,
  Context,
  DdcOptions,
  FilterOptions,
  SourceOptions,
  Denops,
} from "./deps.ts";
import { editDistance } from "./editDistance.ts";

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
  filter(
    _denops: Denops,
    _context: Context,
    _options: DdcOptions,
    _sourceOptions: SourceOptions,
    _filterOptions: FilterOptions,
    filterParams: Record<string, unknown>,
    completeStr: string,
    candidates: Candidate[],
  ): Promise<Candidate[]> {
    if (!completeStr) {
      return Promise.resolve(candidates);
    }
    const params = filterParams as Params;
    let items: item[] = candidates.filter((c) =>
      c.word.length >= completeStr.length + params.diffLen &&
      c.word.startsWith(completeStr[0])
    ).map((c) => ({ candidate: c, ed: editDistance(c.word, completeStr) }));

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
