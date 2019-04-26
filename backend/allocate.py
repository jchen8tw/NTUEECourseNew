import pandas as pd
import numpy as np

df = pd.read_csv('data.csv')

mean = [-12, -4, 3, 6]  # 大一, 大二, 大三, 大四
std = [7, 5, 3, 1]  # 大一, 大二, 大三, 大四
capacity = {'李琳山': 100, '王鈺強': 100, '李枝宏': 100}


def gaussian(grade):
    s = np.random.normal(mean[grade - 1], std[grade - 1], 1)
    return s


def calc_rank(grade):
    return gaussian(grade)[0]


rank = np.vectorize(calc_rank)
grade = df['年級'].values
grade[grade > 4] = 4  # 超過大四算大四
df = df.assign(rank=rank(grade))
df = df.sort_values(by='rank', ascending=False)

df.to_csv('result.csv', index=False)
