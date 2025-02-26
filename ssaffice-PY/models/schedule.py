from sqlalchemy import (
    Column,
    String,
    Integer,
    ForeignKey,
    Boolean,
    Enum,
    DateTime,
    BigInteger,
)
from sqlalchemy.orm import relationship, backref
from sqlalchemy.sql import func
from .type import *
from .base import Base


class Schedule(Base):
    __tablename__ = "schedule"

    schedule_id = Column(BigInteger, primary_key=True, autoincrement=True)
    created_at = Column(DateTime(timezone=True), default=func.now())
    created_by = Column(BigInteger, ForeignKey("user.user_id"))
    updated_at = Column(
        DateTime(timezone=True), default=func.now(), onupdate=func.now()
    )
    updated_by = Column(BigInteger, ForeignKey("user.user_id"))
    end_date_time = Column(DateTime(timezone=True))
    enroll_yn = Column(BooleanToYN, default="N")
    essential_yn = Column(BooleanToYN, default="N")
    memo = Column(String(255))
    notice_id = Column(BigInteger, ForeignKey("notice.notice_id"), nullable=True)
    schedule_source_type_cd = Column(Enum(ScheduleSourceType), nullable=True)
    schedule_status_type_cd = Column(
        Enum(ScheduleStatusType), default=ScheduleStatusType.TODO, nullable=True
    )
    start_date_time = Column(DateTime(timezone=True))
    title = Column(String(255))
    user_id = Column(BigInteger, ForeignKey("user.user_id"), nullable=True)


class Remind(Base):
    __tablename__ = "remind"

    remind_id = Column(BigInteger, primary_key=True, autoincrement=True)
    created_at = Column(DateTime(timezone=True), default=func.now())
    created_by = Column(BigInteger, ForeignKey("user.user_id"))
    updated_at = Column(
        DateTime(timezone=True), default=func.now(), onupdate=func.now()
    )
    updated_by = Column(BigInteger, ForeignKey("user.user_id"))
    created_by = Column(BigInteger, ForeignKey("user.user_id"))
    essential_yn = Column(BooleanToYN, default="N")
    remind_date_time = Column(DateTime(timezone=True))
    remind_type_cd = Column(Enum(RemindType), nullable=True)
    schedule_id = Column(BigInteger, ForeignKey("schedule.schedule_id"), nullable=False)
