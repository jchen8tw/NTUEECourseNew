import pandas as pd
df = pd.read_excel("./originFile/電機課程地圖105-2.xlsx", sheetname=["選修", "十選二"])
print(df)
