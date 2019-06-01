import pandas as pd
import numpy as np

grade_distribution = [100, 100, 100, 100]  # Grade 1, 2, 3, 4
grade = np.concatenate(
    (np.full(grade_distribution[0], 1),
     np.full(grade_distribution[1], 2),
     np.full(grade_distribution[2], 3),
     np.full(grade_distribution[3], 4))
)
df = pd.DataFrame(data=grade, columns=['年級'])
df.to_csv('grades.csv')
