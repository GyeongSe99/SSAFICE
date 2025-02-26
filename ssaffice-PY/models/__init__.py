from .base import Base, engine
from .user import User
from .notice import Notice
from .mm_team import MM_Team
from .channel import Channel
from .schedule import Schedule, Remind
from .attchment_file import Attachment_File
from .user_channel import UserChannel

# 테이블 생성 (해당 테이블이 없는 경우에만 생성)
Base.metadata.create_all(bind=engine)
