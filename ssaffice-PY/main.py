from mmapi import *
from mm_service import *
from set_datas import *

# 로그인 후 메시지 요청
token = TokenManager.get_token()  ## 해당 토큰은 관리자 계정의 토큰이라 가정한다.

# 서버가 실행되면 최초에 관리자가 속해있는 모든 팀 정보를 가져와서 db에 저장한다.
user_teams = get_user_teams(token)
for user_team in user_teams:
    team = make_mm_team_entity(user_team)
    insert_mm_team(team)

# 이후에 token이 존재한다면 websocket연결을 실행한다.
if token:
    from mm_websocket import connect_websocket
else:
    print("로그인 실패로 웹소켓 연결을 진행할 수 없습니다.")
