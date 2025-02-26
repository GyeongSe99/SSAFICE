import enum
from sqlalchemy import String
from sqlalchemy.types import TypeDecorator


# Enum 클래스 정의
class NoticeType(enum.Enum):
    GLOBAL = "GLOBAL"
    TEAM = "TEAM"


class ScheduleSourceType(enum.Enum):
    GLOBAL= "GLOBAL"
    TEAM = "TEAM"
    ASSIGNED = "ASSIGNED"
    PERSONAL = "PERSONAL"


class ScheduleStatusType(enum.Enum):
    TODO = "TODO"
    IN_PROGRESS = "IN_PROGRESS"
    DONE = "DONE"


class RemindType(enum.Enum):
    DAILY = "DAILY"
    ONCE = "ONCE"


# Boolean to Y/N 변환기
class BooleanToYN(TypeDecorator):
    impl = String(1)

    def process_bind_param(self, value, dialect):
        return "Y" if value else "N"

    def process_result_value(self, value, dialect):
        return value == "Y"
