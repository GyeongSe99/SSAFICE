import requests
from setup import config

mm_id = config.MM_ID
mm_pw = config.MM_PW
mm_baseurl = config.MM_BASEURL

class TokenManager:
    _token = None
    
    # 로그인 API 호출 함수, 관리자 로그인 토큰을 발급받기 위함 (return : token을 반환)
    def _fetch_token():
        session = requests.Session()
        login_url = mm_baseurl + "/users/login"
        credentials = {"login_id": mm_id, "password": mm_pw}
        response = session.post(login_url, json=credentials)
        if response.status_code == 200:
            print("Login successful")
            TokenManager._token = response.headers.get("Token")
            return TokenManager._token
        else:
            print("Login failed")
            print("Response:", response.json())
            return None  # 로그인 실패 시 None 반환

    @staticmethod
    def get_token():
        # 토큰이 없는 경우 새로 발급받습니다.
        if TokenManager._token is None:
            TokenManager._fetch_token()
        return TokenManager._token
