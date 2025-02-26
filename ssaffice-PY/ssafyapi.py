import requests
import json
from langchain.prompts import PromptTemplate
from langchain_community.chat_models import ChatOpenAI
from langchain_openai import ChatOpenAI
from langchain.output_parsers.json import SimpleJsonOutputParser
from setup import config
from mmapi import *

ssafy_api_key = config.SSAFY_API_KEY
ssafy_base_url = config.SSAFY_BASE_URL
ssafy_team_id = config.SSAFY_TEAM_ID
openai_api_key = config.OPENAI_API_KEY
openai_model_name = config.OPENAI_MODEL_NAME


llm = ChatOpenAI(
    model_name=openai_model_name,
    temperature = 0,
    top_p=1.0,
    api_key = openai_api_key,
    model_kwargs = {"response_format": {"type":"json_object"}}
    )

template = PromptTemplate(
    input_variables=["data"],
    template="""
    다음의 메시지 리스트를 보면서 id별로 일정 여부를을 파악하여 JSON형태로 출력하라.    
    일정이란 해당 메시지에 해야할 task가 주어져 있거나 특정 시간이 주어져 있는 모든 메시지를 의미한다.
    '제출 안내'가 포함되어 있는 메시지는 모두 일정으로 분류한다.
    
    해당 id의메시지가 일정일 때는 todo_list안의 배열로 입력.키는 다음과 같다:     
    'id': id,
    'isTodo': 'o',
    'title': '할 일을 1문장으로 작성',
    'content' : 할 일을 하는 방법을 3문장 내외로 작성,
    'schedule_date': 'MM/DD'(공백 없이) or 'today' or 'tomorrow' etc,
    'schedule_start_time': 'HH:mm (알 수 없으면 00:00)'
    'schedule_end_time': 'HH:mm (알 수 없으면 00:00)'

    해당 id의 메시지가 일정이 아닐 때의 non_todo_list안의 배열로 입력. 키는 다음과 같다:        
    'id': id,
    'isTodo': 'x',
    'details': '세부 내용'
    
    그 외의 다른 내용은 일체 출력하지 않는다. 
        
    메시지 리스트 : {data}
    """
)

pipeline = template | llm | SimpleJsonOutputParser()

session = requests.Session()

def get_team_members():
    headers = {        
        'Content-Type': 'application/json'
    }
    
    url = f"{ssafy_base_url}/teams/{ssafy_team_id}/members?apiKey={ssafy_api_key}"    
    
    response = session.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to get team members with status code:", response.status_code)
        return None
    
def get_user_info_by_user_id(user_id):
    headers = {        
        'Content-Type': 'application/json'
    }
    
    url = f"{ssafy_base_url}/users/{user_id}?apiKey={ssafy_api_key}"
    
    response = session.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to get user info with status code:", response.status_code)
        return None


def get_team_info_by_team_id(team_id):
    headers = {        
        'Content-Type': 'application/json'
    }
    
    url = f"{ssafy_base_url}/teams/{team_id}?apiKey={ssafy_api_key}"
    
    response = session.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to get user info with status code:", response.status_code)
        return None

members = get_team_members()
# print(members)

for member in members:
    user_id = member['user_id']
    user_info = get_user_info_by_user_id(user_id)
    # print(user_info)
    
print(get_team_info_by_team_id(ssafy_team_id))

