import pandas as pd
# 105-2
dfs = pd.read_excel("./originFile/電機課程地圖105-2.xlsx", index_col=None, header=2, skiprows=[3],
                    sheet_name=["選修", "十選二", "專題"])
for index, (key, df) in enumerate(dfs.items()):
    df.to_csv('./105_2_{}.csv'.format(key), index=False)
# 106-1
dfs = pd.read_excel("./originFile/電機課程地圖106-1.xlsx", index_col=None, header=2, skiprows=[3],
                    sheet_name=["選修", "十選二", "專題", "必修"])
for index, (key, df) in enumerate(dfs.items()):
    df.to_csv('./106_1_{}.csv'.format(key), index=False)
# 106-2
dfs = pd.read_excel("./originFile/電機課程地圖106-2.xlsx", index_col=None, header=1, skiprows=[2],
                    sheet_name=["選修", "十選二", "專題", "必修"])
for index, (key, df) in enumerate(dfs.items()):
    df.to_csv('./106_2_{}.csv'.format(key), index=False)
