from models import *
from setup import config, get_db


def get_user_id_by_user_mm_id(user_mm_id):
    with get_db() as db:
        user = db.query(User).filter(User.mattermost_user_id == user_mm_id).first()
        return user.user_id if user else None

def get_notice_by_notice_id(notice_id):
    with get_db() as db:
        notice = db.query(Notice).filter(Notice.notice_id == notice_id).first()
        return notice
    
def get_schedule_by_schedule_id(schedule_id):
    with get_db() as db:
        schedule = db.query(Schedule).filter(Schedule.schedule_id == schedule_id).first()
        return schedule
    
def get_all_notice():
    with get_db() as db:
        notices = db.query(Notice).all()
        return notices
    
def get_user_by_user_id(user_id):
    with get_db() as db:
        user = db.query(User).filter(User.user_id == user_id).first()
        return user
    
def get_channel_by_channel_id(channel_id):
    with get_db() as db:
        channel = db.query(Channel).filter(Channel.channel_id == channel_id).first()
        return channel
    
def get_mm_team_by_mm_team_id(mm_team_id):
    with get_db() as db:
        team = db.query(MM_Team).filter(MM_Team.mm_team_id == mm_team_id).first()
        return team
    
def get_user_id_list_by_channel_id(channel_id):
    with get_db() as db:
        user_id_list = db.query(UserChannel.user_id).filter(UserChannel.channel_id == channel_id).all()
        return [user_id[0] for user_id in user_id_list]