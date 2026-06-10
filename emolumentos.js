/* ============================================================================
   TABELA DE EMOLUMENTOS E ITBI — Calculadora A&Z Assessoria
   ----------------------------------------------------------------------------
   COMO ATUALIZAR A CADA ANO (o TJMA reajusta em janeiro):
   1) Pegue a nova "Tabela XVI – item 16.3" do TJMA (Registro de Imóveis).
   2) Substitua os números das listas "faixas" (limites de cada faixa) e
      "totais" (valor TOTAL a cobrar em cada faixa). A última faixa é Infinity.
   3) Atualize "prenotacao", "teto", "ano" e "fonte".
   4) Salve e suba este arquivo no GitHub — a Vercel republica sozinha.
   (As alíquotas de ITBI são municipais de São Luís e mudam raramente.)
   ============================================================================ */
window.EMOL = {
  ano: 2026,
  fonte: "TJMA — Resolução-GP nº 143/2025 (Lei Estadual nº 9.109/2009)",

  // Limites SUPERIORES de cada faixa do item 16.3 (R$). A última é Infinity.
  faixas: [5917.36,7692.57,9615.72,12019.65,15024.56,18780.69,23475.86,29344.81,36681.02,45851.29,57314.07,71642.58,89553.26,111941.56,139926.94,174908.66,218635.83,273294.81,341618.50,427023.14,533778.91,667223.64,834029.56,1042536.94,1303171.21,1563805.44,1876566.51,2251879.82,2702255.82,3242706.98,3891248.37,4669498.05,5603397.67,6724077.19,8068892.63,Infinity],

  // Valor TOTAL a cobrar em cada faixa (R$). Deve ter a MESMA quantidade de itens de "faixas".
  totais: [111.11,140.01,158.55,196.77,244.66,306.77,384.85,481.65,599.84,750.69,939.28,1173.09,1466.33,1832.33,2289.78,2862.74,3578.55,4474.29,5590.81,6989.72,8736.26,10920.44,13651.34,16209.99,17299.63,17818.55,18353.16,18903.80,19470.93,20055.05,20656.61,21276.39,21914.57,22572.09,23249.22,23946.65],

  // Prenotação (item 16.1) — valor padrão sugerido no formulário (R$).
  prenotacao: 43.37,

  // Teto geral de emolumentos (art. 37) — apenas informativo.
  teto: 23946.65,

  // ITBI de São Luís/MA (alíquotas municipais).
  itbi: {
    reduzida: 0.005,      // 0,5% sobre a parcela financiada (SFH)
    padrao: 0.02,         // 2% sobre recursos próprios / à vista / excedente
    tetoFinanciado: 500000 // limite da parcela financiada com alíquota reduzida (R$)
  }
};
