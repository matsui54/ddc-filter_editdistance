let L: number[][] = new Array(200 + 1);
for (let i = 0; i <= 200; i++) {
  L[i] = new Array(200 + 1);
  L[i][0] = i;
}
for (let i = 0; i <= 200; i++) {
  L[0][i] = i;
}
export function editDistance(str1: string, str2: string): number {
  const l1 = str1.length, l2 = str2.length;

  for (let i = 1; i <= l1; i++) {
    for (let j = 1; j <= l2; j++) {
      if (str1[i - 1] == str2[j - 1]) {
        L[i][j] = L[i - 1][j - 1];
      } else {
        L[i][j] = Math.min(L[i - 1][j - 1], L[i - 1][j], L[i][j - 1]) + 1;
      }
    }
  }
  return L[l1][l2];
}
