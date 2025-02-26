from sqlalchemy import Column, Integer, String, Boolean, BigInteger
from sqlalchemy.orm import relationship
from .base import Base
from .notice import Notice


class User(Base):
    __tablename__ = "user"

    user_id = Column(BigInteger, primary_key=True, index=True)
    mattermost_user_id = Column(String(255), index=True)
    mattermost_token = Column(String(255))
    email = Column(String(255), index=True)
    password = Column(String(255))
    name = Column(String(255), index=True)
    disabled_yn = Column(Boolean)
    profile_img_url = Column(String(255))

    notices = relationship("Notice", back_populates="created_user", foreign_keys=[Notice.created_by])
