from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean, Enum, BigInteger
from sqlalchemy.dialects.mysql import LONGTEXT
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .base import Base
from .type import *

class Notice(Base):
    __tablename__ = "notice"

    notice_id = Column(BigInteger, primary_key=True, index=True, autoincrement=True)
    created_at = Column(DateTime(timezone=True), default=func.now())
    created_by = Column(BigInteger, ForeignKey("user.user_id"))
    updated_at = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now())
    updated_by = Column(BigInteger, ForeignKey("user.user_id"))
    channel_id = Column(String(255), ForeignKey("channel.channel_id"))
    content = Column(LONGTEXT)
    end_date_time = Column(DateTime)
    essential_yn = Column(BooleanToYN, default="N")
    mm_message_id = Column(String(255))
    notice_type_cd = Column(Enum(NoticeType), nullable=True)
    start_date_time = Column(DateTime)
    title = Column(String(255))
    # original_message = Column(String(1000))

    created_user = relationship("User", back_populates="notices", foreign_keys=[created_by])
