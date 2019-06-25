import pandas as pd


def storeJSON(year, header_num, skiprows_num, sheetList):
    dfs = pd.read_excel("./originFile/電機課程地圖{}.xlsx".format(year), index_col=None, header=header_num, skiprows=[skiprows_num],
                        sheet_name=sheetList)
    for _, (key, df) in enumerate(dfs.items()):
        with open('./{}_{}.json'.format(year, key), 'w', encoding='utf-8'):
            df.to_json('./JSONFiles/{}_{}.json'.format(year, key),
                       force_ascii=False, orient='records')


storeJSON("105-2", 2,
          3, ["選修", "十選二", "專題"],)
storeJSON("106-1", 2,
          3, ["選修", "十選二", "專題", "必修"],)
storeJSON("106-2", 1,
          2, ["選修", "十選二", "專題", "必修"],)
storeJSON("107-1", 1,
          2, ["選修", "十選二", "專題", "必修"],)
storeJSON("107-2", 1,
          2, ["選修", "十選二", "專題", "必修"],)
