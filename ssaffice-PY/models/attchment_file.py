from sqlalchemy import Column, BigInteger, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from .base import Base
from .type import *
from io import BytesIO
import hashlib
import base64
import uuid


class Attachment_File(Base):
    __tablename__ = "attachment_file"

    file_id = Column(String(255), primary_key=True, default=lambda: str(uuid.uuid4()), nullable=False)
    created_at = Column(DateTime(timezone=True), default=func.now())
    created_by = Column(BigInteger, ForeignKey("user.user_id"))
    updated_at = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now())
    updated_by = Column(BigInteger, ForeignKey("user.user_id"))
    file_name = Column(String(255))
    file_size = Column(BigInteger)
    file_type = Column(String(255))
    hash = Column(String(255))
    deleted_yn = Column(BooleanToYN, default=False)
    mime_type = Column(String(255))
    order_idx = Column(Integer)
    ref_id = Column(BigInteger)


def generate_hash(file):
    file = BytesIO(file)
    digest = hashlib.sha256()
    buffer_size = 8192
    while chunk := file.read(buffer_size):
        digest.update(chunk)
    hash_bytes = digest.digest()
    return base64.urlsafe_b64encode(hash_bytes).rstrip(b"=").decode("utf-8")
