// script.js

// Dados da planilha formatados em JSON
// CORRIGIDO: parcelamento_maximo_meses agora é o texto, parcela_minima_condicao é o número.
const planData = [
  {
    "grupo": "G2",
    "importancia_segurada": 100000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 488.16,
      "parcelamento_maximo_meses": "ATÉ 8X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 525.26,
      "parcelamento_maximo_meses": "ATÉ 8X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 562.36,
      "parcelamento_maximo_meses": "ATÉ 9X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 606.89,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G2",
    "importancia_segurada": 150000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 673.67,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 729.32,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 784.98,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 851.76,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G2",
    "importancia_segurada": 200000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 855.47,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 929.30,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 1003.13,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 1091.73,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G2",
    "importancia_segurada": 250000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 918.54,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 998.68,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 1078.82,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 1174.99,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G2",
    "importancia_segurada": 300000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 977.91,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 1063.98,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 1150.06,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 1253.35,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G2",
    "importancia_segurada": 350000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 1055.82,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 1149.69,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 1243.55,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 1356.20,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G2",
    "importancia_segurada": 400000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 1133.73,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 1235.39,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 1337.05,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 1459.04,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G2",
    "importancia_segurada": 450000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 1200.52,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 1308.85,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 1417.19,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 1547.20,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G2",
    "importancia_segurada": 500000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 1263.59,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 1378.23,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 1492.88,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 1630.45,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G2",
    "importancia_segurada": 600000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 1374.90,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 1500.67,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 1626.45,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 1777.38,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G2",
    "importancia_segurada": 700000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 1467.65,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 1602.70,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 1737.75,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 1899.81,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G2",
    "importancia_segurada": 800000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 1552.98,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 1696.57,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 1840.15,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 2012.45,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G2",
    "importancia_segurada": 900000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 1630.90,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 1782.27,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 1933.65,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 2115.30,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G2",
    "importancia_segurada": 1000000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 1697.68,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 1855.74,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 2013.79,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 2203.45,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G5",
    "importancia_segurada": 100000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 1212.53,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 1322.07,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 1431.61,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 1563.06,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G5",
    "importancia_segurada": 150000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 1760.23,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 1924.53,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 2088.84,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 2286.01,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G5",
    "importancia_segurada": 200000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 2296.97,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 2514.95,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 2732.93,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 2994.51,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G5",
    "importancia_segurada": 250000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 2483.18,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 2719.79,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 2956.39,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 3240.31,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G5",
    "importancia_segurada": 300000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 2658.44,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 2912.57,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 3166.70,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 3471.66,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G5",
    "importancia_segurada": 350000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 2888.48,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 3165.61,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 3442.74,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 3775.30,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G5",
    "importancia_segurada": 400000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 3118.51,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 3418.64,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 3718.78,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 4078.94,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G5",
    "importancia_segurada": 450000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 3315.68,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 3635.53,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 3955.38,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 4339.21,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G5",
    "importancia_segurada": 500000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 3501.89,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 3840.37,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 4178.84,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 4585.01,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G5",
    "importancia_segurada": 600000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 3830.51,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 4201.85,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 4573.18,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 5018.79,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G5",
    "importancia_segurada": 700000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 4104.36,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 4503.08,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 4901.80,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 5380.27,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G5",
    "importancia_segurada": 800000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 4356.30,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 4780.21,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 5204.13,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 5712.83,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G5",
    "importancia_segurada": 900000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 4586.33,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 5033.25,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 5480.17,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 6016.47,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  },
  {
    "grupo": "G5",
    "importancia_segurada": 1000000.00,
    "sem_chefe_sem_diretor_clinico": {
      "premio_total_ano": 4783.50,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_sem_diretor_clinico": {
      "premio_total_ano": 5250.13,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "sem_chefe_com_diretor_clinico": {
      "premio_total_ano": 5716.77,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    },
    "com_chefe_com_diretor_clinico": {
      "premio_total_ano": 6276.73,
      "parcelamento_maximo_meses": "ATÉ 10X SEM JUROS",
      "parcela_minima_condicao": 60.00
    }
  }
];

// Mapeamento para exibir nomes amigáveis para os tipos de equipe
const equipeNames = {
  "sem_chefe_sem_diretor_clinico": "Sem Chefe de Equipe e Sem Diretor Clínico",
  "com_chefe_sem_diretor_clinico": "Com Chefe de Equipe e Sem Diretor Clínico",
  "sem_chefe_com_diretor_clinico": "Sem Chefe de Equipe e Com Diretor Clínico",
  "com_chefe_com_diretor_clinico": "Com Chefe de Equipe e Com Diretor Clínico"
};

// Mapeamento para exibir nomes amigáveis para os grupos/especialidades
const grupoNames = {
  "G2": "G2 (Farmácia sem Estética)",
  "G5": "G5 (Farmácia com Estética)"
};

document.addEventListener('DOMContentLoaded', () => {
  // Referências aos elementos do DOM
  const importanciaSlider = document.getElementById('importancia-slider');
  const importanciaDisplay = document.getElementById('importancia-display');
  const cotarButton = document.getElementById('cotar-button');
  const resultadoDiv = document.getElementById('resultado');
  const messageBox = document.getElementById('message-box');

  // Funções auxiliares para mostrar/esconder mensagens e resultados
  function showMessage(message, type = 'warning') {
    messageBox.textContent = message;
    messageBox.className = `mt-4 p-4 rounded-md ${type === 'error' ? 'bg-red-100 border-red-400 text-red-800' : 'bg-yellow-100 border-yellow-400 text-yellow-800'} block`;
    resultadoDiv.classList.add('hidden'); // Esconde o resultado ao mostrar mensagem
    console.log('Mensagem exibida:', message);
  }

  function hideMessage() {
    messageBox.classList.add('hidden');
  }

  function showResult() {
    resultadoDiv.classList.remove('hidden');
    hideMessage(); // Esconde a mensagem ao mostrar resultado
    console.log('Resultado exibido.');
  }

  function hideResult() {
    resultadoDiv.classList.add('hidden');
  }

  // Configura o slider de Importância Segurada
  function setupImportanciaSlider() {
    // Coleta todos os valores únicos de importancia_segurada
    const importancias = new Set(planData.map(item => item.importancia_segurada));
    const sortedImportancias = Array.from(importancias).sort((a, b) => a - b);

    const minImportancia = sortedImportancias[0];
    const maxImportancia = sortedImportancias[sortedImportancias.length - 1];
    const stepValue = 50000; // Conforme solicitado, pulando de 50.000

    importanciaSlider.min = minImportancia;
    importanciaSlider.max = maxImportancia;
    importanciaSlider.step = stepValue;
    importanciaSlider.value = minImportancia; // Define um valor inicial

    // Atualiza o display do valor do slider
    importanciaDisplay.textContent = parseFloat(importanciaSlider.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // Adiciona um listener para atualizar o display quando o slider for movido
    importanciaSlider.addEventListener('input', () => {
      importanciaDisplay.textContent = parseFloat(importanciaSlider.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    });
    console.log('Slider de importância segurada configurado.');
  }

  // Chama a função para configurar o slider ao carregar a página
  setupImportanciaSlider();

  cotarButton.addEventListener('click', () => {
    console.log('Botão Cotar clicado!');

    hideResult(); // Esconde o resultado anterior
    hideMessage(); // Esconde mensagens anteriores

    // Obtém o valor do radio button selecionado para Grupo
    const selectedGrupoRadio = document.querySelector('input[name="grupo"]:checked');
    const selectedGrupo = selectedGrupoRadio ? selectedGrupoRadio.value : '';

    // Obtém o valor do radio button selecionado para Tipo de Equipe
    const selectedEquipeRadio = document.querySelector('input[name="equipe"]:checked');
    const selectedEquipeKey = selectedEquipeRadio ? selectedEquipeRadio.value : '';

    // Obtém o valor do slider
    const selectedImportancia = parseFloat(importanciaSlider.value);

    console.log('Valores selecionados:', {
      grupo: selectedGrupo,
      importancia: selectedImportancia,
      equipeKey: selectedEquipeKey
    });

    // Validação dos campos
    if (!selectedGrupo || !selectedEquipeKey || isNaN(selectedImportancia)) {
      showMessage('Por favor, selecione o Tipo de Equipe, o Grupo e a Importância Segurada.', 'warning');
      console.log('Validação falhou: campos incompletos ou importância inválida.');
      return;
    }

    // Encontra o item correspondente na planData
    const foundItem = planData.find(item =>
      item.grupo === selectedGrupo &&
      item.importancia_segurada === selectedImportancia
    );

    console.log('Item encontrado na base de dados:', foundItem);

    if (foundItem) {
      const cota = foundItem[selectedEquipeKey];
      console.log('Cota específica para a equipe:', cota);

      if (cota) {
        // Exibe os resultados
        document.getElementById('res-grupo').textContent = grupoNames[selectedGrupo];
        document.getElementById('res-especialidade').textContent = grupoNames[selectedGrupo].split('(')[1].replace(')', '');
        document.getElementById('res-importancia').textContent = selectedImportancia.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        document.getElementById('res-equipe').textContent = equipeNames[selectedEquipeKey];
        document.getElementById('res-premio').textContent = cota.premio_total_ano.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        // CORRIGIDO: Exibição de Parcelamento Máximo (agora é o texto)
        document.getElementById('res-parcelamento').textContent = cota.parcelamento_maximo_meses;
        // CORRIGIDO: Exibição de Condição de Parcela Mínima (agora é o número, formatado como moeda)
        document.getElementById('res-condicao').textContent = cota.parcela_minima_condicao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        showResult();
      } else {
        showMessage('Dados de cotação não encontrados para o tipo de equipe selecionado. Por favor, verifique suas opções.', 'error');
        console.log('Erro: Cota para a equipe específica não encontrada.');
      }
    } else {
      showMessage('Não foi encontrado um plano com as seleções de Grupo e Importância Segurada informadas. Verifique os valores.', 'error');
      console.log('Erro: Item não encontrado para Grupo e Importância Segurada.');
    }
  });
});
