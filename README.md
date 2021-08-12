# ddc-filter_editdistance
Ddc.vim filter which uses edit distance for matching and sorting candidates.

## Required

### denops.vim
https://github.com/vim-denops/denops.vim

### ddc.vim
https://github.com/Shougo/ddc.vim

## filters
### matcher_editdistance
It removes candidates which has greater edit distance than threshold. This also sorts candidates by editdistance.
### sorter_editdistance
It only sort candidates by edit distance. I recommend using only matcher_editdistance.

## Configuration
### params of matcher_editdistance
- limit: (number) Candidates whose edit distance exceed this value are ignored. (default: 3)
- diffLen: (number) If candidates' length is smaller than (users' input + params.diffLen), the candidates are ignored. (default: -1)
- showScore: (boolean) If it is true, edit distance is shown in completion menu. (default: false)

### examples
```vim
call ddc#custom#patch_global('sourceOptions', {
      \ '_': {'matchers': ['matcher_editdistance'], 'sorters': []},
      \ })

call ddc#custom#patch_global('filterParams', {
      \ 'matcher_editdistance': {'showScore': v:true, 'diffLen': 0, 'limit': 2},
      \ })
```
