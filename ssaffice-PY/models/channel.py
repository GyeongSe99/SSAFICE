from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base


class Channel(Base):
    __tablename__ = "channel"

    channel_id = Column(String(255), primary_key=True, index=True)
    mm_team_id = Column(String(255), ForeignKey("mm_team.mm_team_id"))
    channel_name = Column(String(255))

    mm_team = relationship("MM_Team")