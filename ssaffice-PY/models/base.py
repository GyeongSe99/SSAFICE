from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
import os
import sys
# Project3의 경로를 root_dir로 설정하기 위함
current_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.join(current_dir, "..")
sys.path.append(root_dir)

# root 디렉토리로 설정해서 setup을 import할 수 있음
from setup import config


Base = declarative_base()
engine = create_engine(
    "mysql+pymysql://"
    + config.DB_USERNAME
    + ":"
    + config.DB_PASSWORD
    + "@"
    + config.DB_HOST
    + ":"
    + config.DB_PORT
    + "/"
    + config.DB_NAME
)
