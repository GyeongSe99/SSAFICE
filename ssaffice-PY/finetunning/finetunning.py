import os
import Path
from openai import OpenAI
from dotenv import load_dotenv
from setup import config

env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(
  dotenv_path = env_path
)
openai_api_key = os.getenv("OPENAI_API_KEY") 

client = OpenAI(    
    api_key = openai_api_key    
)

# finetunning에 사용한 jsonl모델은 따로 저장해두었음
res = client.files.create(
  file=open("finetunning_data.jsonl", "rb"),
  purpose="fine-tune",
)

resId = res.id
print(f"trained file id : {resId}")

## 파인튜닝 진행
response = client.fine_tuning.jobs.create(
  training_file=resId,
  model="gpt-4o-2024-08-06",
  hyperparameters={
    "n_epochs": 3,
    "batch_size": 1,
  }
)

print(response)