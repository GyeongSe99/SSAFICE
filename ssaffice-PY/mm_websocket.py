import elasticsearch_index
import websocket
import json
import ssl
from mmapi import *
from setup import config
from mm_service import *
from get_datas import *
from set_datas import *

# 웹소켓은 관리자가 전체 채널에서 메시지를 가져오는 용도로 사용한다.
# 지금의 경우에는 '재현'의 계정이 관리자라고 가정한다.

mm_websocket_url = config.MM_WEBSOCKET_URL
websocket_url = mm_websocket_url
token = TokenManager.get_token()


# 웹소켓 이벤트 핸들러 함수
def on_message(ws, message):
    data = json.loads(message)

    # 1. 팀 생성 이벤트가 발생하면 해당 팀 정보를 DB에 저장
    if data["event"] == "team_created":
        team_id = data["data"]["team_id"]
        team_display_name = data["data"]["team"]["team_display_name"]
        team = make_mm_team_entity_by_team_id(team_id, team_display_name)
        insert_mm_team(team)

    # 2. event중에 글이 게시되고 해당 게시글이 올라온 채널의 이름이 공지를 포함하면 실행
    if is_notice(data):
        if is_ssafice_notice(data):
            return

        # 채널 정보를 DB에 저장
        channel_id = json.loads(data["data"]["post"])["channel_id"]
        channel_info = get_channel_info_by_channel_id(token, channel_id)
        channel = make_channel_entity(channel_id, channel_info)
        insert_channel(channel)

        # 일정인지 아닌지 분석하는 함수
        output_message = analyze_message(data)
        for notice in output_message["list"]:
            # 일정인 경우에는 일정 등록
            if notice["isTodo"] == "o":
                # db에 저장할 notice entity 만들기
                notice_entity = make_notice_entity(data, notice)
                notice_source_type = find_channel_type(data)
                notice_entity.notice_type_cd = notice_source_type

                # notice를 DB에 저장
                notice_db_id = insert_notice(notice_entity)

                # notice를 ES에 indexing
                elasticsearch_index.index_data(notice_entity)

                # 파일 업로드 하면서 동시에 db에 파일 정보 삽입
                metadatas = get_file_metadata_from_data(data)
                if metadatas != None:
                    order_idx = 0
                    for metadata in metadatas:
                        response = get_file_by_file_id(token, metadata["id"])
                        upload_file_to_s3(response)
                        file = make_file_entity(
                            notice_db_id, response, metadata, order_idx
                        )
                        file.created_by = notice_entity.created_by
                        file.updated_by = notice_entity.created_by
                        insert_file(file)
                        order_idx += 1

                # 해당 채널에 속한 user정보를 받아와서 일정에 넣어줌(유저가 새로고침 눌러야 반영됨)
                user_ids = get_user_id_list_by_channel_id(channel_id)

                for user_id in user_ids:
                    # user별로 DB에 넣을 schedule entity 생성
                    schedule = make_schedule_entity(notice_db_id)
                    memo = notice["content"]
                    schedule.memo = memo
                    source_type = find_channel_type(data)
                    schedule.schedule_source_type_cd = source_type                   
                    schedule.user_id = user_id
                    # schedule를 DB에 저장
                    schedule_id = insert_schedule(schedule)
                    # 필수 공지(= 필수 일정)인 경우에만 remind를 생성
                    if schedule.essential_yn == True:
                        remind = make_remind_entity(schedule_id)
                        remind_id = insert_remind(remind)

            else:
                print("일정이 아닙니다.")

    # event중에 글이 삭제 되면 해당 게시글의 아이디를 출력
    elif data["event"] == "post_deleted":
        json_data = json.loads(data["data"]["post"])
        print("메시지가 삭제됨 :", json_data["id"])


def on_error(ws, error):
    print("웹소켓 오류:", error)


def on_close(ws, close_status_code, close_msg):
    print("웹소켓 연결이 닫혔습니다.")


def on_open(ws):
    token = TokenManager.get_token()
    print("웹소켓 연결이 열렸습니다.")

    # Mattermost 인증 토큰 전송
    ws.send(
        json.dumps(
            {"seq": 1, "action": "authentication_challenge", "data": {"token": token}}
        )
    )


# 웹소켓 연결 설정
def connect_websocket():
    ws = websocket.WebSocketApp(
        websocket_url,
        on_open=on_open,
        on_message=on_message,
        on_error=on_error,
        on_close=on_close,
    )
    ws.run_forever(sslopt={"cert_reqs": ssl.CERT_NONE})


connect_websocket()
