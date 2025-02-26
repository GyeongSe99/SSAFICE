import requests
from langchain.prompts import PromptTemplate
from langchain_community.chat_models import ChatOpenAI
from langchain_openai import ChatOpenAI
from langchain.output_parsers.json import SimpleJsonOutputParser
from token_manager import TokenManager
from setup import config

openai_api_key = config.OPENAI_API_KEY
openai_model_name = config.OPENAI_MODEL_NAME
mm_id = config.MM_ID
mm_pw = config.MM_PW
mm_baseurl = config.MM_BASEURL

llm = ChatOpenAI(
    model_name=openai_model_name,
    temperature=0,
    top_p=1.0,
    api_key=openai_api_key,
    max_tokens=1000,
    model_kwargs={"response_format": {"type": "json_object"}},
)

template = PromptTemplate(
    input_variables=["data"],
    template="""
    다음의 메시지 리스트를 보면서 일정 여부를을 파악하여 JSON형태로 출력하라.
    일정이란 해당 메시지에 해야할 task가 주어져 있는 모든 메시지를 의미한다.    

    오늘 날짜는 {today_date} 라는 것을 고려하여 schedule 의 시작시간과 마감시간을 파악해라.
    한 주의 시작은 일요일이다. 
    오늘 요일을 파악해서 이번주, 다음주 등에 해당하는 날짜를 문맥상으로 잘 파악해라.
    
    특히 마감시간은 거의 모든 경우에 있으므로 마감시간은 신중하게 파악하라.
    
    JSON 형태는 list라는 배열안에 넣어서 출력한다.
    해당 메시지가 일정이라고 판단되는 경우:
    'id': id,
    'isTodo': 'o',
    'title': '할 일을 1문장으로 작성',
    'content' : 할 일을 하는 방법을 3문장 내외로 작성,
    'schedule_start_time': 할 일의 시작 시간을 'YYYY-MM-DD HH:mm' 형식으로 작성. 시작 date를 알 수 없으면 날짜는 {today_date}, 시작 time을 알 수 없으면 시간은 00:00.
    'schedule_end_time': 할 일의 마감 시간을 'YYYY-MM-DD HH:mm' 형식으로 end date를 알 수 없으면 null. end time을 알 수 없으면 시간은 00:00.

    해당 메시지가 일정이 아니라고 판단되는 경우:
    'id': id,
    'isTodo': 'x'    
    
    그 외의 다른 내용은 일체 출력하지 않는다.
        
    메시지 리스트 : {data}
    """,
)

pipeline = template | llm | SimpleJsonOutputParser()

session = requests.Session()

def get_headers(token):
    token = TokenManager.get_token()
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
    return headers


# 로그인한 정보를 바탕으로 사용자 정보를 가져오는 API 호출 함수
def get_user_info(token):
    headers = get_headers(token)
    response = session.get(f"{mm_baseurl}/users/me", headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to get user info with status code:", response.status_code)
        return None


# 로그인한 정보를 바탕으로 사용자 정보를 가져오는 API 호출 함수
def get_user_info_by_user_id(token, user_id):
    headers = get_headers(token)
    response = session.get(f"{mm_baseurl}/users/{user_id}", headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to get user info with status code:", response.status_code)
        return None


def get_user_profile_image(token):
    headers = get_headers(token)
    response = session.get(f"{mm_baseurl}/users/me/image", headers=headers)

    # with open('image.jpg', 'wb') as f:
    #     f.write(response.content)

    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to get user image with status code:", response.status_code)
        return None


# user_id를 통해 해당 유저가 속해있는 채널 리스트를 가져오기
def get_channel_list_by_user_id(token):
    headers = get_headers(token)
    user_info = get_user_info(token)
    if not user_info:
        return None

    user_id = user_info["id"]
    response = session.get(f"{mm_baseurl}/users/{user_id}/channels", headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to get user channels with status code:", response.status_code)
        return None


# 내가 속한 팀 정보리스트를 가져오기
def get_user_teams(token):
    headers = get_headers(token)
    response = session.get(f"{mm_baseurl}/users/me/teams", headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to get user teams with status code:", response.status_code)
        return None


# channel_id에 해당하는 채널의 메시지리스트를 가져오기
def get_channel_message_list_by_channel_id(token, channel_id):
    headers = get_headers(token)
    response = session.get(f"{mm_baseurl}/channels/{channel_id}/posts", headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to get channel messages with status code:", response.status_code)
        return None


# post_id에 해당하는 특정 post를 가져오기
def get_post_by_post_id(token, post_id):
    headers = get_headers(token)
    response = session.get(f"{mm_baseurl}/posts/{post_id}", headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to get message by id with status code:", response.status_code)
        return None


# channel_id에 해당하는 특정 채널의 정보를 가져오기
def get_channel_info_by_channel_id(token, channel_id):
    headers = get_headers(token)
    response = session.get(f"{mm_baseurl}/channels/{channel_id}", headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to get channel info with status code:", response.status_code)
        return None


# channel_id를 통해 해당 channel에 속한 모든 member의 정보를 가져오는 함수.
def get_channel_members_by_channel_id(token, channel_id, page_num):
    headers = get_headers(token)
    response = session.get(
        f"{mm_baseurl}/channels/{channel_id}/members?page={page_num}&per_page=200", headers=headers
    )

    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to get members with status code:", response.status_code)
        return None


# 해당 user가 속한 모든 channel 정보를 가져오는 함수.
def get_channels_by_user_id(token, user_id):
    headers = get_headers(token)
    response = session.get(f"{mm_baseurl}/users/{user_id}/channels", headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to get channels with status code:", response.status_code)
        return None


# 일반 유저들의 token을 받기 위한 메서드 > 이 token을 가지고 get요청을 통해 user_mm_id확인
def login(mm_id, mm_pw):
    login_url = mm_baseurl + "/users/login"
    credentials = {"login_id": mm_id, "password": mm_pw}
    response = session.post(login_url, json=credentials)
    if response.status_code == 200:
        return response.headers.get("Token")
    else:
        print("Failed to get channels with status code:", response.status_code)
        return None  # 로그인 실패 시 None 반환


def get_team_members_by_team_id(token, team_id):
    headers = get_headers(token)
    response = session.get(f"{mm_baseurl}/teams/{team_id}/members", headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to get channels with status code:", response.status_code)
        return None

def get_file_by_file_id(token, file_id):
    headers = get_headers(token)
    response = session.get(f"{mm_baseurl}/files/{file_id}", headers=headers)

    if response.status_code == 200:
        return response
    else:
        print("Failed to get file with status code:", response.status_code)
        return None

def get_file_info_by_file_id(token, file_id):
    headers = get_headers(token)
    response = session.get(f"{mm_baseurl}/files/{file_id}/info", headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to get file with status code:", response.status_code)
        return None

def get_channel_members_count(token, channel_id):
    headers = get_headers(token)
    response = session.get(f"{mm_baseurl}/channels/{channel_id}/stats", headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to get channel members with status code:", response.status_code)
        return None
