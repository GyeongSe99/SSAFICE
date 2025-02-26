from elasticsearch import Elasticsearch, helpers
from get_datas import *
from setup import config
from mmapi import *

es_host = config.ES_HOST
es_id = config.ES_ID
es_pw = config.ES_PW
es_fingerprint = config.ES_FINGERPRINT

# Elasticsearch 연결 설정
es = Elasticsearch(
    [es_host],
    basic_auth=(es_id, es_pw),
    verify_certs=True,
    ssl_assert_fingerprint=es_fingerprint,
)

# 인덱스 이름 및 매핑 정의
INDEX_NAME = "notice"

mapping = {
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 2,
        "refresh_interval": "5s",
        "max_ngram_diff": 19,
        "codec": "best_compression",
        "analysis": {
            "filter": {
                "my_ngram_filter": {"type": "ngram", "min_gram": 2, "max_gram": 6},
            },
            "tokenizer": {
                "my_nori_tokenizer": {
                    "type": "nori_tokenizer",
                    "decompound_mode": "mixed",
                },
            },
            "analyzer": {
                "notice_content_analyzer": {
                    "type": "custom",
                    "tokenizer": "my_nori_tokenizer",
                },
                "notice_title_analyzer": {
                    "type": "custom",
                    "tokenizer": "my_nori_tokenizer",
                    "filter": ["my_ngram_filter"],
                },
            },
        },
    },
    "mappings": {
        "properties": {
            "noticeId": {"type": "keyword"},
            "title": {"type": "text", "analyzer": "notice_title_analyzer"},
            "content": {"type": "text", "analyzer": "notice_content_analyzer"},
            "createdAt": {
                "type": "date",
                "format": "yyyy-MM-dd'T'HH:mm:ss||epoch_millis",
            },
            "startDateTime": {
                "type": "date",
                "format": "yyyy-MM-dd'T'HH:mm:ss||epoch_millis",
            },
            "endDateTime": {
                "type": "date",
                "format": "yyyy-MM-dd'T'HH:mm:ss||epoch_millis",
            },
            "isEssentialYn": {"type": "keyword"},
            "noticeTypeCd": {"type": "keyword"},
            "createUserId": {"type": "keyword"},
            "createUserEmail": {"type": "keyword"},
            "createUserProfileImgUrl": {"type": "keyword"},
            "createUserName": {"type": "text", "analyzer": "notice_title_analyzer"},
            "channelId": {"type": "keyword"},
            "channelName": {"type": "keyword"},
            "mmTeamId": {"type": "keyword"},
            "mmTeamName": {"type": "keyword"},
        }
    },
}


def create_index_if_not_exists(es_client, index_name, mapping):
    if es_client.indices.exists(index=index_name):
        print(f"인덱스 '{index_name}'가 존재합니다.")
    else:
        es_client.indices.create(index=index_name, body=mapping)
        print(f"인덱스 '{index_name}'가 생성되었습니다.")

# 시간 date를 es의 mapper에 맞게 변환하는 함수
def format_datetime(value):
    return value.strftime("%Y-%m-%dT%H:%M:%S") if value else None

# 값이 없는 경우 None으로 반환하고, formatter가 있는 경우 formatter를 적용한 값을 반환하는 함수
def get_value(attribute, formatter=None):
    if attribute is None:
        return None
    return formatter(attribute) if formatter else attribute

# 단일 데이터를 indexing하는 함수
def index_data(notice):

    user = get_user_by_user_id(notice.created_by)
    if not user:
        print(f"User with ID {notice.created_by} not found.")
        return

    channel = get_channel_by_channel_id(notice.channel_id)
    if not channel:
        print(f"Channel with ID {notice.channel_id} not found.")
        return

    team = get_mm_team_by_mm_team_id(channel.mm_team_id)
    if not team:
        print(f"Team with ID {channel.mm_team_id} not found.")
        return

    document = {
        "noticeId": get_value(notice.notice_id, str),
        "title": get_value(notice.title),
        "content": get_value(notice.content),
        "createdAt": get_value(notice.created_at, format_datetime),
        "startDateTime": get_value(notice.start_date_time, format_datetime),
        "endDateTime": get_value(notice.end_date_time, format_datetime),
        "isEssentialYn": "true" if notice.essential_yn == "Y" else "false",
        "noticeTypeCd": get_value(notice.notice_type_cd, lambda x: x.value),
        "createUserId": get_value(notice.created_by, str),
        "createUserEmail": get_value(user.email),
        "createUserProfileImgUrl": get_value(user.profile_img_url),
        "createUserName": get_value(user.name),
        "channelId": get_value(notice.channel_id, str),
        "channelName": get_value(channel.channel_name),
        "mmTeamId": get_value(channel.mm_team_id, str),
        "mmTeamName": get_value(team.mm_team_name),
    }

    try:
        es.index(index=INDEX_NAME, id=str(notice.notice_id), document=document)
        print("1개의 문서가 인덱싱되었습니다.")
    except Exception as e:
        print("Indexing error: ", e)


# 여러 개의 데이터를 한번에 indexing하는 함수
def index_bulk_data(notices):
    actions = []
    for notice in notices:
        user = get_user_by_user_id(notice.created_by)
        if not user:
            print(f"User with ID {notice.created_by} not found.")
            continue

        channel = get_channel_by_channel_id(notice.channel_id)
        if not channel:
            print(f"Channel with ID {notice.channel_id} not found.")
            continue

        team = get_mm_team_by_mm_team_id(channel.mm_team_id)
        if not team:
            print(f"Team with ID {channel.mm_team_id} not found.")
            continue

        document = {
            "noticeId": get_value(notice.notice_id, str),
            "title": get_value(notice.title),
            "content": get_value(notice.content),
            "createdAt": get_value(notice.created_at, format_datetime),
            "startDateTime": get_value(notice.start_date_time, format_datetime),
            "endDateTime": get_value(notice.end_date_time, format_datetime),
            "isEssentialYn": "true" if notice.essential_yn == "Y" else "false",
            "noticeTypeCd": get_value(notice.notice_type_cd, lambda x: x.value),
            "createUserId": get_value(notice.created_by, str),
            "createUserEmail": get_value(user.email),
            "createUserProfileImgUrl": get_value(user.profile_img_url),
            "createUserName": get_value(user.name),
            "channelId": get_value(notice.channel_id, str),
            "channelName": get_value(channel.channel_name),
            "mmTeamId": get_value(channel.mm_team_id, str),
            "mmTeamName": get_value(team.mm_team_name),
        }

        action = {
            "_index": INDEX_NAME,
            "_id": str(notice.notice_id),
            "_source": document,
        }
        actions.append(action)

    if actions:
        try:
            helpers.bulk(es, actions)
            print(f"{len(actions)}개의 문서가 일괄 인덱싱되었습니다.")
        except Exception as e:
            print("Bulk indexing error: ", e)


# db의 전체 데이터를 가져오는 함수
def fetch_data():
    notice = get_all_notice()
    return notice


def main():
    # 인덱스 생성 또는 존재 여부 확인
    create_index_if_not_exists(es, INDEX_NAME, mapping)

    # 모든 데이터를 가져옵니다.
    rows = fetch_data()
    if rows:
        index_bulk_data(rows)
    else:
        print("데이터가 없습니다.")


if __name__ == "__main__":
    main()
