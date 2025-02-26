from mmapi import *
from setup import config, get_db
from models import Notice, Schedule, Attachment_File, attchment_file as f
from get_datas import *
from set_datas import *
from datetime import datetime, timedelta
import json
import boto3

s3_access_key = config.S3_ACCESS_KEY
s3_secret_key = config.S3_SECRET_KEY
s3_prefix = config.S3_PREFIX
s3_bucket_name = config.S3_BUCKET_NAME
mm_global_notice_channel_id = config.MM_GLOBAL_NOTICE_CHANNEL_ID


# 해당 채널이 분석 대상 메시지 확인하는 함수
def is_notice(data):
    if data["event"] == "posted" and "공지사항" in data["data"]["channel_display_name"]:
        return True
    return False


# 메시지가 일정인지 분석하는 함수.
def analyze_message(data):
    json_data = json.loads(data["data"]["post"])
    message_id = json_data["id"]
    message_content = json_data["message"]
    message = {"id": message_id, "message": message_content}

    today = datetime.now().date()
    try:
        return pipeline.invoke({"data": message, "today_date": today})
    except Exception as e:
        print("Error : ", e)


# 메시지의 중요도를 확인하는 함수
def essential_test(data):
    if "priority" in data["metadata"]:
        if data["metadata"]["priority"]["priority"] == "important":
            return True
    return False


def make_notice_entity(data, notice):
    json_data = json.loads(data["data"]["post"])
    essential = essential_test(json_data)
    mm_user_id = json_data["user_id"]
    user_id = get_user_id_by_user_mm_id(mm_user_id)
    original_message = json_data["message"]
    channel_id = json_data["channel_id"]

    response_notice = Notice(
        created_by=user_id,
        updated_by=user_id,
        channel_id=channel_id,
        content=original_message,
        end_date_time=notice["schedule_end_time"],
        essential_yn=essential,
        mm_message_id=notice["id"],
        start_date_time=notice["schedule_start_time"],
        title=notice["title"],
    )

    return response_notice


def get_file_metadata_from_data(data):
    json_data = json.loads(data["data"]["post"])
    file_ids = (
        [file["id"] for file in json_data["metadata"]["files"]]
        if "files" in json_data["metadata"]
        else None
    )
    if file_ids is not None:
        return json_data["metadata"]["files"]
    return None


# s3로 파일 업로드
def upload_file_to_s3(response):
    hash = f.generate_hash(response.content)
    dir = hash[:2]
    file_path = hash[2:]
    s3 = boto3.client(
        "s3", aws_access_key_id=s3_access_key, aws_secret_access_key=s3_secret_key
    )

    try:
        s3.put_object(
            Bucket=s3_bucket_name,
            Key=f"{s3_prefix}\{dir}\{file_path}",
            Body=response.content,
        )
    except Exception as e:
        print(f"Error : {e}")


def find_channel_type(data):
    json_data = json.loads(data["data"]["post"])
    channel_id = json_data["channel_id"]
    channel_type = data["data"]["channel_type"]
    if channel_id == mm_global_notice_channel_id:  # 11기 공지사항 채널id임
        return "GLOBAL"
    elif (
        channel_type == "O" or channel_type == "P"
    ):  # O는 public 채널, P는 private 채널
        return "TEAM"
    else:
        return "PERSONAL"  # mm 에서 받아오는 경우에는 PERSONAL이 쓰이는 경우는 없음


def make_schedule_entity(notice_id):
    notice = get_notice_by_notice_id(notice_id)
    response_schedule = Schedule(
        created_by=notice.created_by,
        updated_by=notice.updated_by,
        end_date_time=notice.end_date_time,
        enroll_yn=notice.essential_yn,
        essential_yn=notice.essential_yn,
        notice_id=notice_id,
        start_date_time=notice.start_date_time,
        title=notice.title,
        # enroll의 기본값은 essential을 따라감.
    )
    return response_schedule


def find_user_id_by_channel_id(token, channel_id, page_num):
    response = get_channel_members_by_channel_id(token, channel_id, page_num)
    user_ids = [member["user_id"] for member in response]
    return user_ids


def make_remind_entity(schedule_id):
    schedule = get_schedule_by_schedule_id(schedule_id)
    schedule_date_time = schedule.end_date_time
    if schedule.end_date_time == None:
        schedule_date_time = schedule.start_date_time

    response_remind = Remind(
        created_at=schedule.created_at,
        created_by=schedule.created_by,
        updated_at=schedule.updated_at,
        updated_by=schedule.updated_by,
        essential_yn=schedule.essential_yn,
        remind_date_time=schedule_date_time - timedelta(hours=1),
        remind_type_cd="ONCE",
        schedule_id=schedule_id,
    )
    return response_remind


def make_file_entity(notice_id, response, metadata, order_idx):
    file = response.content
    hash = f.generate_hash(file)
    response_file = Attachment_File(
        file_type="notice",
        file_name=metadata["name"],
        file_size=metadata["size"],
        ref_id=notice_id,
        hash=hash,
        mime_type=metadata["extension"],
        order_idx=order_idx,
    )
    return response_file


def make_mm_team_entity(team):
    response_team = MM_Team(mm_team_id=team["id"], mm_team_name=team["display_name"])
    return response_team


def make_mm_team_entity_by_team_id(team_id, team_name):
    response_team = MM_Team(team_id=team_id, team_name=team_name)
    return response_team


def make_channel_entity(channel_id, channel_info):
    team_id = channel_info["team_id"]
    channel_name = channel_info["display_name"]
    response_channel = Channel(
        channel_id = channel_id,
        channel_name = channel_name,
        mm_team_id = team_id
    )
    return response_channel

def is_ssafice_notice(data):
    if json.loads(data["data"]["post"])["message"][:9] == "(SSAFICE)":
        return True
    return False
