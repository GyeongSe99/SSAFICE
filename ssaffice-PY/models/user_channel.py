from sqlalchemy import Column, Integer, ForeignKey, String, BigInteger
from sqlalchemy.orm import relationship
from .base import Base


class UserChannel(Base):
    __tablename__ = "user_channel"

    user_channel_id = Column(BigInteger, primary_key=True, index=True)
    user_id = Column(BigInteger, ForeignKey("user.user_id"))
    channel_id = Column(String(255), ForeignKey("channel.channel_id"))    

    user = relationship("User")
    channel_by_channel_id = relationship("Channel")
