let s:name = fnamemodify(expand('<sfile>'), ':t:r')

if exists('g:loaded_ddc_' . s:name)
  finish
endif
let g:loaded_ddc_{s:name} = 1

silent! call ddc#register_filter({
      \ 'name': 'matcher_editdistance',
      \ 'path': printf('%s/denops/ddc/filters/%s.ts',
      \                fnamemodify(expand('<sfile>'), ':h:h:h'), 'matcher_editdistance'),
      \ })

silent! call ddc#register_filter({
      \ 'name': 'sorter_editdistance',
      \ 'path': printf('%s/denops/ddc/filters/%s.ts',
      \                fnamemodify(expand('<sfile>'), ':h:h:h'), 'sorter_editdistance'),
      \ })
