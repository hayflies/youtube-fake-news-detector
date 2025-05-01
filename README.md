# youtube-fake-news-detector

chrome-extension은 크롬 확장 프로그램
fastapi-llm은 ai
node-server은 서버

- **Node.js (Express)**
- **Python 3**
- **OpenAI Whisper (Local 설치)**
- **youtube-dl (or yt-dlp)** → 영상 음원 다운로드
- **supertest / jest** → API 테스트

## 🔧 설치 방법

### 📌 1. Node.js 패키지 설치

```bash
cd node-server
npm install
.env로 경로 등 각자 절대경로로 관리(push할 필요 없음.)

파이썬 가상환경
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

requirements.txt (없다면 아래 패키지 설치)
git+https://github.com/openai/whisper.git
torch

추가 설치:
pip install yt-dlp

📌 3. Whisper 모델 다운로드 (처음 1회 실행 시 자동 다운로드)
Python 코드 실행 시 자동으로 ~/.cache/whisper 경로에 다운로드

📌 4. 의존성 정리
Node 의존성

express

supertest

jest

Python 의존성

whisper

torch

yt-dlp

🚀 실행 방법
bash
복사
편집
cd node-server
npm start
```
