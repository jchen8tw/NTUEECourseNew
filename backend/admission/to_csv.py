import pandas as pd
res = pd.read_json('result.json')[1:12]
res = res.reindex(sorted(res.columns),axis=1)
res.to_csv('result.csv');